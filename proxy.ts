import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { JwtService } from './app/[locale]/shared/services/JwtServices';
import { TokenExpiredError } from 'jsonwebtoken';
import createConn from './app/[locale]/config/connectDb';
import { PublicResponseType } from './app/[locale]/shared/types/publicResponseType';
const publicRoutes = ['/login', '/register'];
const privateRoutes = ['/dashboard', '/v1/user'];

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get('accessToken')?.value;

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

    if (isPublicRoute && accessToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    if (isPrivateRoute && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
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
                    return NextResponse.redirect(new URL('/login', request.url));
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

                    return NextResponse.redirect(new URL('/login', request.url));
                } catch (error) {
                    return NextResponse.json<PublicResponseType<string>>({
                        httpCode: 500,
                        status: "Error",
                        code: "INTERNAL_ERROR",
                        message: `${error}`
                    })
                }
            }

            // ✅ Handle other errors
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/',
        '/(ar|en)/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}