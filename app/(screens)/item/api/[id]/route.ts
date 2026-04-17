import createConn from "@/app/config/connectDb";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const conn = await createConn();
        const { id } = await params;
        const sql = `SELECT * FROM products WHERE product_id = ?`;
        const [results] = await conn.query(sql, [id]);
        // const data 

    } catch (error) {

    }
}