import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResult } from '../contracts/api-result';

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Error Desconocido';
    let error: string = 'Error Desconocido';

    if (exception instanceof HttpException) {
      const exResponse: any = exception.getResponse();
      status = exception.getStatus();
      message =
        typeof exResponse === 'string'
          ? exResponse
          : exResponse?.message ?? exResponse;

      if (message && typeof message === 'object' && !Array.isArray(message)) {
        message = JSON.stringify(message);
      }
      error =
        exResponse && typeof exResponse === 'object'
          ? exResponse.error ?? exception.name
          : exception.name;

    } else if (exception instanceof Error) {
      message = exception.message || message;
      error = exception.name || error;
    }

    message = JSON.stringify(message);

    const body: ApiResult<null> = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      message,
      error,
      data: null,
      path: request.url,
    };

    response.status(status).json(body);
  }
}