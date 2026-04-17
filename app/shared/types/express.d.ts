import "express";

declare global {
  namespace Express {
    interface Request {
      metaData?: {
        token?: string;
        deviceId?: string | string[];
        userAgent?: string;
      }
      user?: {
        userId: number;
        deviceId?: string | string[];
      };
    }
  }
}