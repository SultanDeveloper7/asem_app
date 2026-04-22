import jwt from "jsonwebtoken";
import { Connection } from "mysql2/promise";
import { NewTokenResultType } from "../types/newTokenResultType";
import { JwtTokenReturn } from "../types/jwtTokenReturn";

export interface JwtPayloadData {
    userId: number;
    email: string;
    refreshToken?: string | undefined;
    roleId: number,
    // permissions: string[]
}

export class JwtService {
    private readonly secret = process.env.JWT_SECRET!;
    private readonly expiresIn = "10s";

    public async createNewToken(token: string, userAgent: string | undefined, refreshToken: string, conn: Connection): Promise<NewTokenResultType> {
        const payload = this.getPayloadDetails(token);
        console.log(payload)
        const data = await this.checkRefreshToken(payload, refreshToken, conn);
        if (!data.status) {
            return data;
        }
        const newPayload: JwtPayloadData = {
            ...payload,
            refreshToken
        }
        const newRefreshToken = crypto.randomUUID();


        const result = await this.generateAccessToken(newPayload, newRefreshToken, userAgent, conn);
        return {
            status: true,
            result
        };
    }

    private async checkRefreshToken(payload: JwtPayloadData, refreshToken: string, conn: Connection): Promise<NewTokenResultType> {
        const sql = "SELECT * FROM refresh_token WHERE refresh_token = ? AND user_id = ?";
        const [results] = await conn.query(sql, [refreshToken, payload.userId]);
        const data = results as RefreshTokenType[];
        if (data.length === 0) {
            return {
                status: false,
                code: "INVALID_REFRESH_TOKEN",
                message: "The refresh token is invalid, please login again",
                httpCode: 401
            };
        } else {
            if (data[0].expires_at.getTime() < Date.now()) {
                return {
                    status: false,
                    code: "EXPIRED_REFRESH_TOKEN",
                    message: "The refresh token is expired, please login again",
                    httpCode: 401
                };
            } else {
                return {
                    status: true
                };
            }
        }
    }

    public getPayloadDetails(token: string): JwtPayloadData {
        const decoded = jwt.decode(token) as JwtPayloadData;
        return {
            userId: decoded.userId,
            email: decoded.email,
            roleId: decoded.roleId,
            // permissions: decoded.permissions
        };
    }

    public async generateAccessToken(payload: JwtPayloadData, newRefreshToken: string, userAgent: string | undefined, conn: Connection): Promise<JwtTokenReturn> {
        const checkToken = await this.checkToken(payload, conn);
        // const refreshToken = crypto.randomUUID();
        if (!checkToken) {
            await this.insertToken(newRefreshToken, payload, userAgent, conn);
        } else {
            await this.updateToken(newRefreshToken, payload, conn);
        }
        const token = jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
        });
        return {
            token,
            refreshToken: newRefreshToken
        }
    }

    public verifyAccessToken(token: string): JwtPayloadData {
        try {
            const payload = jwt.verify(token, this.secret) as JwtPayloadData;
            return payload;
        } catch (error) {
            throw error;
        }
    }

    private async checkToken(payload: JwtPayloadData, conn: Connection): Promise<boolean> {
        const sql = "SELECT * FROM refresh_token WHERE refresh_token = ?";
        const [results] = await conn.query(sql, [payload.refreshToken]);
        const data = results as RefreshTokenType[];

        if (data.length === 0) {
            return false;
        } else {
            const checkSql = "SELECT * FROM refresh_token WHERE user_id = ? AND refresh_token = ?";
            const [checkResults] = await conn.query(checkSql, [payload.userId, payload.refreshToken]);
            const checkData = checkResults as RefreshTokenType[];
            if (checkData.length === 0) {
                await this.deleteToken(payload, conn);
                return false;
            } else {
                return true;
            }

        }
    }

    private async deleteToken(payload: JwtPayloadData, conn: Connection) {

        const sql = "DELETE FROM refresh_token WHERE refresh_token = ?";
        await conn.query(sql, [payload.refreshToken]);

    }

    private async insertToken(refreshToken: string, payload: JwtPayloadData, userAgent: string | undefined, conn: Connection) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const sql = "INSERT INTO refresh_token (refresh_token, user_agent, expires_at, user_id) VALUES (?, ?, ?, ?)";
        await conn.query(sql, [refreshToken, userAgent, expiresAt, payload.userId]);
    }

    private async updateToken(refreshToken: string, payload: JwtPayloadData, conn: Connection) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const sql = "UPDATE refresh_token SET refresh_token = ?, expires_at = ? WHERE refresh_token = ? AND user_id = ?";
        await conn.query(sql, [refreshToken, expiresAt, payload.refreshToken, payload.userId]);
    }
}