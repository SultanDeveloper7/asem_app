export class AppErrorType extends Error {
    public status: number;
    public code?: string;

    constructor(message: string, status = 500, code?: string) {
        super(message);
        this.status = status;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}