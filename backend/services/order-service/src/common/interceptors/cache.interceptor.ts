import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url, params, query, user } = request;

    // Only cache GET requests
    if (method !== 'GET') {
      return next.handle();
    }

    // Generate cache key
    const cacheKey = this.generateCacheKey(url, params, query, user);
    
    // Try to get cached response
    const cachedResponse = await this.cacheManager.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    // If no cache, proceed with request and cache the response
    return next.handle().pipe(
      tap(async (response) => {
        // Cache the response for 5 minutes by default
        const ttl = this.getCacheTTL(url);
        await this.cacheManager.set(cacheKey, response, ttl);
      }),
    );
  }

  private generateCacheKey(
    url: string,
    params: any,
    query: any,
    user: any,
  ): string {
    const userPrefix = user ? `user:${user.id}:` : 'guest:';
    const paramsStr = JSON.stringify(params);
    const queryStr = JSON.stringify(query);
    
    return `cache:${userPrefix}${url}:${paramsStr}:${queryStr}`;
  }

  private getCacheTTL(url: string): number {
    // Different TTL for different endpoints
    if (url.includes('/orders')) {
      return 300; // 5 minutes for orders
    }
    if (url.includes('/shipping')) {
      return 600; // 10 minutes for shipping
    }
    if (url.includes('/tracking')) {
      return 180; // 3 minutes for tracking
    }
    
    return 300; // Default 5 minutes
  }
}
