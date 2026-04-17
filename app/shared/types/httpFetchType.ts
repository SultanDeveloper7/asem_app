import { PublicResponseType } from "./publicResponseType";

export type HttpFetchType<T> = {
    status: boolean,
    data?: PublicResponseType<T> | undefined,
}