import {
    JsonWebTokenError,
    TokenExpiredError,
    NotBeforeError,
} from "jsonwebtoken";
import { AppErrorType } from "../types/AppErrorType";

export function handleJwtError(error: unknown, ignoreExpire: boolean = false): never {
    if (!ignoreExpire) {
        if (error instanceof TokenExpiredError) {
            throw new AppErrorType(
                "Access token expired",
                401,
                "ACCESS_TOKEN_EXPIRED"
            );
        }
    }

    if (error instanceof NotBeforeError) {
        throw new AppErrorType(
            "Token not active yet",
            401,
            "TOKEN_NOT_ACTIVE"
        );
    }

    if (error instanceof JsonWebTokenError) {
        throw new AppErrorType(
            "Invalid token",
            401,
            "INVALID_JWT"
        );
    }

    throw error;
}