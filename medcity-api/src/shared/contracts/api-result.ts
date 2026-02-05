export interface ApiResult<T> {
    timestamp?: string;
    statusCode: number;
    message: string | string [];
    error: string | null;
    data: T | null;
    path?: string;

}