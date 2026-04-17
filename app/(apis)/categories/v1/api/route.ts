import createConn from "@/app/config/connectDb";
import { AppErrorType } from "@/app/shared/types/AppErrorType";
import { PublicResponseType } from "@/app/shared/types/publicResponseType";
import { QueryResult } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const conn = await createConn();
        const sql = "SELECT * FROM categories";
        const [result] = await conn.query(sql);

        return NextResponse.json<PublicResponseType<QueryResult>>({
            httpCode: 200,
            status: "Accepted",
            data: result
        })

    } catch (error) {
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
    }
}