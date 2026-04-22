export type NewTokenResultType = {
    status: boolean,
    code?: string,
    message?: string,
    httpCode?: number,
    result?: {
        token: string;
        refreshToken: string
    }
}