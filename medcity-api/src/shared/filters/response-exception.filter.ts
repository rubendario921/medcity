import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResult } from '../contracts/api-result';

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Error unknown';
    let error: string = 'Error unknown';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exResponse = exception.getResponse();

      if (typeof exResponse === 'string') {
        message = exResponse;
      } else if (typeof exResponse === 'object' && exResponse !== null) {
        const body = exResponse as Record<string, unknown>;
        message =
          (body.message as string | string[]) ?? JSON.stringify(exResponse);
        error = (body.error as string) ?? exception.name;
      }
    } else if (exception instanceof Error) {
      message = exception.message || message;
      error = exception.name || error;
    }

    const body: ApiResult<null> = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      message,
      error,
      data: null,
    };

    response.status(status).json(body);
  }
}
