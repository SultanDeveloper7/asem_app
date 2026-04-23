import createConn from "@/app/[locale]/config/connectDb";
import { AppErrorType } from "@/app/[locale]/shared/types/AppErrorType";
import { ProductType } from "@/app/[locale]/shared/types/dbTablesTypes/productType";
import { PublicResponseType } from "@/app/[locale]/shared/types/publicResponseType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // const { searchParams } = new URL(req.url);
        // const lang = searchParams.get("lang");
        // if(lang === "ar") {

        // }

        const conn = await createConn();
        const { id } = await params;
        const sql = `
SELECT p.*, c.currency_code, sc.sub_category_name, sc.sub_category_name_ar, sc.sub_category_name_code, cat.* FROM products as p
LEFT JOIN sc_t_p_relationship as sc_t_p
ON sc_t_p.product_id = p.product_id
LEFT JOIN sc_t_relationship as sc_t
ON sc_t_p.sc_t_id = sc_t.sc_t_id
LEFT JOIN sub_categories as sc
ON sc_t.sub_category_id = sc.sub_category_id
LEFT JOIN categories as cat
ON cat.category_id = sc.category_id
LEFT JOIN tags as t
ON sc_t.tag_id = t.tag_id
LEFT JOIN currency as c
ON p.currency_id = c.currency_id
WHERE p.product_id = ?
        `;
        const [results] = await conn.query(sql, [id]);
        const data = results as ProductType[];
        if (data.length === 0) {
            throw new AppErrorType("No results found", 404, "NOT_FOUND");
        }

        return NextResponse.json<PublicResponseType<ProductType>>({
            httpCode: 200,
            status: "Accepted",
            data: data[0]
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