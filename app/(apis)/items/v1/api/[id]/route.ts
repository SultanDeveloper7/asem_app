import createConn from "@/app/config/connectDb";
import { AppErrorType } from "@/app/shared/types/AppErrorType";
import { ProductsType } from "@/app/shared/types/dbTablesTypes/productsType";
import { PublicResponseType } from "@/app/shared/types/publicResponseType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const conn = await createConn();
        const { id } = await params;
        const sql = `SELECT p.*, c.currency_code, sc.sub_category_name, sc.sub_category_name_ar FROM products as p
LEFT JOIN currency as c
ON c.currency_id = p.currency_id
LEFT JOIN sub_categories as sc
ON sc.sub_category_id = p.sub_category_id WHERE p.sub_category_id = ?`;
        const [results] = await conn.query(sql, [id]);
        const data = results as ProductsType[];
        if (data.length === 0) {
            throw new AppErrorType("No results found", 404, "NOT_FOUND");
        }

        return NextResponse.json<PublicResponseType<ProductsType[]>>({
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