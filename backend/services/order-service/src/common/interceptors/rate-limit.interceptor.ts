import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  private readonly rateLimitStore = new Map<string, { count: number; resetTime: number }>();
  private readonly defaultConfig: RateLimitConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    skipSuccessfulRequests: false,
    skipFailedRequests: true,
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const clientId = this.getClientIdentifier(request);
    const config = this.getRateLimitConfig(request);

    // Check rate limit
    if (!this.checkRateLimit(clientId, config)) {
      return throwError(
        () =>
          new HttpException(
            {
              statusCode: HttpStatus.TOO_MANY_REQUESTS,
              message: 'Rate limit exceeded. Please try again later.',
              error: 'Too Many Requests',
            },
            HttpStatus.TOO_MANY_REQUESTS,
          ),
      );
    }

    // Increment request count
    this.incrementRequestCount(clientId, config);

    return next.handle().pipe(
      catchError((error) => {
        // If request failed and we should skip failed requests, decrement count
        if (config.skipFailedRequests) {
          this.decrementRequestCount(clientId);
        }
        throw error;
      }),
    );
  }

  private getClientIdentifier(request: Request): string {
    // Use IP address as primary identifier
    const ip = request.ip || request.connection.remoteAddress;
    
    // If user is authenticated, include user ID
    const userId = (request as any).user?.id;
    
    // If API key is provided, include it
    const apiKey = request.headers['x-api-key'] as string;
    
    return `${ip}:${userId || 'anonymous'}:${apiKey || 'no-key'}`;
  }

  private getRateLimitConfig(request: Request): RateLimitConfig {
    // Different rate limits for different endpoints
    const url = request.url;
    
    if (url.includes('/orders/create')) {
      return { ...this.defaultConfig, maxRequests: 10, windowMs: 60 * 1000 }; // 10 requests per minute
    }
    
    if (url.includes('/shipping/calculate')) {
      return { ...this.defaultConfig, maxRequests: 50, windowMs: 60 * 1000 }; // 50 requests per minute
    }
    
    if (url.includes('/tracking')) {
      return { ...this.defaultConfig, maxRequests: 200, windowMs: 60 * 1000 }; // 200 requests per minute
    }
    
    return this.defaultConfig;
  }

  private checkRateLimit(clientId: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const clientData = this.rateLimitStore.get(clientId);

    if (!clientData) {
      return true;
    }

    // Reset if window has passed
    if (now > clientData.resetTime) {
      this.rateLimitStore.delete(clientId);
      return true;
    }

    return clientData.count < config.maxRequests;
  }

  private incrementRequestCount(clientId: string, config: RateLimitConfig): void {
    const now = Date.now();
    const clientData = this.rateLimitStore.get(clientId);

    if (!clientData) {
      this.rateLimitStore.set(clientId, {
        count: 1,
        resetTime: now + config.windowMs,
      });
    } else {
      clientData.count++;
    }

    // Clean up expired entries
    this.cleanupExpiredEntries();
  }

  private decrementRequestCount(clientId: string): void {
    const clientData = this.rateLimitStore.get(clientId);
    if (clientData && clientData.count > 0) {
      clientData.count--;
    }
  }

  private cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [key, value] of this.rateLimitStore.entries()) {
      if (now > value.resetTime) {
        this.rateLimitStore.delete(key);
      }
    }
  }
}
