import createConn from "@/app/config/connectDb";
import { JwtService } from "@/app/shared/services/JwtServices";
import { UserType } from "@/app/shared/types/dbTablesTypes/userType";
import { PublicResponseType } from "@/app/shared/types/publicResponseType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;
    const jwtServices = new JwtService();
    const payload = jwtServices.verifyAccessToken(accessToken!);
    const conn = await createConn();

    const userId = payload?.userId;
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    const [results] = await conn.query(sql, [userId]);
    const [userData] = results as UserType[];
    return NextResponse.json<PublicResponseType<UserType>>({ httpCode: 200, status: "Accepted", data: userData,  });
}