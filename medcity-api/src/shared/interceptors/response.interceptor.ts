import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiPayload } from '../contracts/api-payload';
import { ApiResult } from '../contracts/api-result';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  ApiPayload<T>,
  ApiResult<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiPayload<T>>,
  ): Observable<ApiResult<T>> {
    const http = context.switchToHttp();
    const res = http.getResponse<Response>();

    return next.handle().pipe(
      map((payload) => {
        const isPayload =
          payload &&
          typeof payload === 'object' &&
          ('message' in (payload as any) || 'data' in (payload as any));

        const message = isPayload ? (payload.message ?? 'Success') : 'Success';

        const data = isPayload
          ? (payload.data ?? null)
          : ((payload as T) ?? null);

        return {
          statusCode: res.statusCode,
          message,
          error: '',
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
