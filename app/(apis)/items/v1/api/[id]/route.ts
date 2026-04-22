import createConn from "@/app/[locale]/config/connectDb";
import { AppErrorType } from "@/app/[locale]/shared/types/AppErrorType";
import { ProductsType } from "@/app/[locale]/shared/types/dbTablesTypes/productsType";
import { TagsAndProductsType } from "@/app/[locale]/shared/types/dbTablesTypes/tagsAndProductsType";
import { TagsType } from "@/app/[locale]/shared/types/dbTablesTypes/tagsType";
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
        SELECT t.* FROM tags as t
LEFT JOIN sc_t_relationship as sc_t
ON sc_t.tag_id = t.tag_id
LEFT JOIN sub_categories as sc
ON sc_t.sub_category_id = sc.sub_category_id
WHERE sc.sub_category_id = ?
        `;
        const [results] = await conn.query(sql, [id]);
        const data = results as TagsType[];
        if (data.length === 0) {
            throw new AppErrorType("No results found", 404, "NOT_FOUND");
        }

        const productsData: TagsAndProductsType[] = await Promise.all(
            data.map(async (tag) => {
                const sql = `SELECT p.*, c.currency_code, sc.sub_category_name, sc.sub_category_name_ar FROM products as p
LEFT JOIN sc_t_p_relationship as sc_t_p
ON sc_t_p.product_id = p.product_id
LEFT JOIN sc_t_relationship as sc_t
ON sc_t_p.sc_t_id = sc_t.sc_t_id
LEFT JOIN sub_categories as sc
ON sc_t.sub_category_id = sc.sub_category_id
LEFT JOIN tags as t
ON sc_t.tag_id = t.tag_id
LEFT JOIN currency as c
ON p.currency_id = c.currency_id
WHERE sc_t.tag_id = ?`;
                const [results] = await conn.query(sql, [tag.tag_id]);

                return {
                    tag,
                    products: results as ProductsType[]
                };
            })
        );

        //         const sql = `SELECT p.*, c.currency_code, sc.sub_category_name, sc.sub_category_name_ar FROM products as p
        // LEFT JOIN currency as c
        // ON c.currency_id = p.currency_id
        // LEFT JOIN sub_categories as sc
        // ON sc.sub_category_id = p.sub_category_id WHERE p.sub_category_id = ?`;
        //         const [results] = await conn.query(sql, [id]);
        //         const data = results as ProductsType[];
        //         if (data.length === 0) {
        //             throw new AppErrorType("No results found", 404, "NOT_FOUND");
        //         }

        return NextResponse.json<PublicResponseType<TagsAndProductsType[]>>({
            httpCode: 200,
            status: "Accepted",
            data: productsData
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