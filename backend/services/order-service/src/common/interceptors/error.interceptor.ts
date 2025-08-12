import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  requestId: string;
  details?: any;
}

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['x-request-id'] || this.generateRequestId();

    return next.handle().pipe(
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        
        // Log the error
        this.logger.error(
          `Error occurred: ${error.message}`,
          error.stack,
          `${context.getClass().name} - ${context.getHandler().name}`,
        );

        // Create standardized error response
        const errorResponse: ErrorResponse = {
          statusCode: error.status || 500,
          message: error.message || 'Internal server error',
          error: error.error || 'Internal Server Error',
          timestamp: new Date().toISOString(),
          path: request.url,
          requestId,
        };

        // Add validation errors if available
        if (error.response && Array.isArray(error.response.message)) {
          errorResponse.details = error.response.message;
        }

        // Add additional error details in development
        if (process.env.NODE_ENV === 'development') {
          errorResponse.details = {
            stack: error.stack,
            name: error.name,
            code: error.code,
          };
        }

        // Set response status
        response.status(errorResponse.statusCode);

        return throwError(() => errorResponse);
      }),
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
