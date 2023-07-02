import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An error occurred';

    if (exception instanceof QueryFailedError) {
      const queryFailedError = exception as QueryFailedError;
      statusCode = HttpStatus.BAD_REQUEST;
      message = queryFailedError.message;
    } else if (exception instanceof NotFoundException) {
      statusCode = 404;
      message = exception?.message || 'Not Found';
    } else if (
      exception?.cause?.response &&
      exception?.cause?.response?.statusCode
    ) {
      statusCode = exception.cause.response.statusCode;
      message = exception.cause.response.message || 'An error occurred';
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
