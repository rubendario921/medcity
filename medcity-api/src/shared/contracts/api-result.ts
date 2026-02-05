export interface ApiResult<T> {
    timestamp?: string;
    statusCode: number;
    message: string;
    error: string | null;
    data: T | null;
    path?: string;

}