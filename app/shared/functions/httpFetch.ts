import { HttpFetchType } from "../types/httpFetchType";
import { PublicResponseType } from "../types/publicResponseType";

export class HttpFetch {
    public async getRequest<T>(url: string, headers?: HeadersInit | undefined): Promise<HttpFetchType<T>> {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers,
            });
            const result: PublicResponseType<T> = await response.json();
            if (!response.ok) {
                console.log('Success:', result);
                return {
                    status: false,
                    data: result
                };
            } else {
                return {
                    status: true,
                    data: result
                };
            }
        } catch (error) {
            return {
                status: false,
                data: {
                    httpCode: 500,
                    status: "Error",
                    message: `${error}`
                }
            }
        }
    }

    public async postRequest<T>(url: string, body?: Object, headers?: HeadersInit | undefined): Promise<HttpFetchType<T>> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });
            const result: PublicResponseType<T> = await response.json();
            if (!response.ok) {
                console.log('Success:', result);
                return {
                    status: false,
                    data: result
                };
            } else {
                return {
                    status: true,
                    data: result
                };
            }
        } catch (error) {
            return {
                status: false,
                data: {
                    httpCode: 500,
                    status: "Error",
                    message: `${error}`
                }
            }
        }

    }
}