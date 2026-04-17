import createConn from "@/app/config/connectDb";
import { AppErrorType } from "@/app/shared/types/AppErrorType";
import { SubCategoryType } from "@/app/shared/types/dbTablesTypes/subCategoryType";
import { PublicResponseType } from "@/app/shared/types/publicResponseType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const conn = await createConn();
        const { id } = await params;

        const sql = `SELECT sc.* FROM sub_categories as sc
LEFT JOIN categories as c
ON sc.category_id = c.category_id
WHERE c.category_id = ?`;
        const [result] = await conn.query(sql, [id]);
        const data = result as SubCategoryType[];

        if (data.length === 0) {
            throw new AppErrorType("No results found", 404, "NOT_FOUND");
        }

        return NextResponse.json<PublicResponseType<SubCategoryType[]>>({
            httpCode: 200,
            status: "Accepted",
            data
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