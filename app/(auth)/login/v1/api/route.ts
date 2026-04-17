import createConn from "@/app/config/connectDb";
import { JwtService } from "@/app/shared/services/JwtServices";
import { AppErrorType } from "@/app/shared/types/AppErrorType";
import { UserType } from "@/app/shared/types/dbTablesTypes/userType";
import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PublicResponseType } from "@/app/shared/types/publicResponseType";
import { JwtTokenReturn } from "@/app/shared/types/jwtTokenReturn";
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    let conn;
    const jwtService = new JwtService();
    // const permissionService = new PermissionServices();

    try {
        conn = await createConn();
        await conn.beginTransaction();
        const { email, password } = await req.json();
        const headers = req.headers;
        // const deviceId = headers.get('x-device-id');
        const userAgent = headers.get('user-agent');
        if (!email || !password || !userAgent) {
            throw new AppErrorType("Invalid fields", 400, "INVALID_FIELDS");
        }
        const sql = "SELECT * FROM users WHERE user_email = ?";
        const [results] = await conn.query(sql, [email]);
        const userData = results as UserType[];

        if (userData.length === 0) {
            throw new AppErrorType("Invalid credentials", 400, "INVALID_CREDENTIALS");
        }

        const hashedInputPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (hashedInputPassword !== userData[0].user_password) {
            throw new AppErrorType("Invalid credentials", 400, "INVALID_CREDENTIALS");
        }
        // const permissions = await permissionService.getUserPermissions(userData[0].user_id, conn);
        const refreshToken = crypto.randomUUID();
        const tokenData = await jwtService.generateAccessToken({
            userId: userData[0].user_id,
            email: userData[0].user_email,
            roleId: userData[0].role_id,
            refreshToken
        }, refreshToken, userAgent, conn);

        await conn.commit();
        const cookieStore = await cookies();
        cookieStore.set('accessToken', tokenData.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        cookieStore.set('refreshToken', tokenData.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return NextResponse.json<PublicResponseType<JwtTokenReturn>>({ httpCode: 200, status: "Accepted", message: "Valid user", data: tokenData }, { status: 200 });
    } catch (error) {
        console.log(`Error: ${error}`)
        if (conn) {
            await conn.rollback();
        }

        if (error instanceof AppErrorType) {
            return NextResponse.json<PublicResponseType<string>>(
                {
                    httpCode: error.status,
                    status: "Error",
                    message: error.message,
                    code: error.code
                },
                { status: error.status }
            );
        }
        return NextResponse.json<PublicResponseType<string>>(
            {
                httpCode: 500,
                status: "Error",
                message: "Internal server error"
            },
            { status: 500 }
        );
    } finally {
        if (conn) await conn.end();
    }
}