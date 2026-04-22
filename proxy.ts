import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

import { JwtService } from './app/[locale]/shared/services/JwtServices';
import { TokenExpiredError } from 'jsonwebtoken';
import createConn from './app/[locale]/config/connectDb';
import { PublicResponseType } from './app/[locale]/shared/types/publicResponseType';

const intlMiddleware = createMiddleware(routing);

const publicRoutes = ['/login', '/register'];
const privateRoutes = ['/dashboard', '/v1/user'];

export default async function middleware(request: NextRequest) {
    const intlResponse = intlMiddleware(request);
    if (intlResponse && intlResponse.headers.get('location')) {
        return intlResponse;
    }

    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('accessToken')?.value;

    const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
    console.log(`The pathnamewithout locale: ${pathnameWithoutLocale}`);
    const isPublicRoute = publicRoutes.some(route =>
        pathnameWithoutLocale.startsWith(route)
    );

    const isPrivateRoute = privateRoutes.some(route =>
        pathnameWithoutLocale.startsWith(route)
    );

    if (isPublicRoute && accessToken) {
        return NextResponse.redirect(new URL('/en', request.url));
    }

    if (isPrivateRoute && !accessToken) {
        return NextResponse.redirect(new URL('/en/login', request.url));
    }

    if (accessToken) {
        const jwtService = new JwtService();
        try {
            jwtService.verifyAccessToken(accessToken);
            return NextResponse.next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                const refreshToken = request.cookies.get('refreshToken')?.value;
                const userAgent = request.headers.get('user-agent');

                if (!refreshToken || !userAgent) {
                    return NextResponse.redirect(new URL('/en/login', request.url));
                }

                try {
                    const conn = await createConn();
                    const result = await jwtService.createNewToken(
                        accessToken,
                        userAgent,
                        refreshToken,
                        conn
                    );

                    if (result.status) {
                        const response = NextResponse.next();

                        response.cookies.set('accessToken', result.result?.token!, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 60 * 60 * 24 * 7,
                            path: '/',
                        });

                        response.cookies.set('refreshToken', result.result?.refreshToken!, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 60 * 60 * 24 * 7,
                            path: '/',
                        });

                        return response;
                    }

                    return NextResponse.redirect(new URL('/en/login', request.url));
                } catch (error) {
                    return NextResponse.json<PublicResponseType<string>>({
                        httpCode: 500,
                        status: "Error",
                        code: "INTERNAL_ERROR",
                        message: `${error}`
                    });
                }
            }

            return NextResponse.redirect(new URL('/en/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};