export type PublicResponseType<T> = {
    httpCode: number,
    status: "Accepted" | "Denied" | "Invalid" | "Error",
    code?: string,
    message?: string | undefined,
    data?: T | undefined
}