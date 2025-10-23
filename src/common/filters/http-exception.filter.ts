import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EmptyBalanceError } from '../../domain/errors/empty-balance.error';
import { InsufficientBalanceError } from '../../domain/errors/insufficient-balance.error';
import { UserNotFoundError } from '../../domain/errors/user-not-found.error';

export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Ocorreu um erro interno no servidor.';
    let errorType = 'InternalServerError';

    if (
      exception instanceof EmptyBalanceError ||
      exception instanceof InsufficientBalanceError
    ) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
      errorType = exception.name;
    }

    if (exception instanceof UserNotFoundError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      errorType = exception.name;
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const resp = exception.getResponse();

      // Lida com erros do class-validator/pipes que são capturados como HttpException
      if (typeof resp === 'object' && 'message' in resp) {
        message = Array.isArray(resp.message)
          ? resp.message.join('.')
          : (resp.message as string);
      } else {
        message = exception.message;
      }
      errorType = exception.constructor.name;
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      errorType: errorType,
      message: message,
    });
  }
}
