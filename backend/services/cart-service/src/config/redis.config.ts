/**
 * @fileoverview Redis configuration for Cart Service
 * Configures Redis connection and cache settings
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class RedisConfig {
  static getCacheConfig(configService: ConfigService): CacheModuleOptions {
    return {
      store: redisStore,
      host: configService.get<string>('REDIS_HOST', 'localhost'),
      port: configService.get<number>('REDIS_PORT', 6379),
      password: configService.get<string>('REDIS_PASSWORD'),
      db: configService.get<number>('REDIS_DB', 0),
      ttl: configService.get<number>('REDIS_TTL', 3600), // 1 hour default
      max: configService.get<number>('REDIS_MAX_ITEMS', 1000),
      isGlobal: true,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      family: 4,
      connectTimeout: 10000,
      commandTimeout: 5000,
      keyPrefix: configService.get<string>('REDIS_KEY_PREFIX', 'cart:'),
    };
  }

  static getRedisConnectionConfig(configService: ConfigService) {
    return {
      host: configService.get<string>('REDIS_HOST', 'localhost'),
      port: configService.get<number>('REDIS_PORT', 6379),
      password: configService.get<string>('REDIS_PASSWORD'),
      db: configService.get<number>('REDIS_DB', 0),
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      family: 4,
      connectTimeout: 10000,
      commandTimeout: 5000,
    };
  }

  static getClusterConfig(configService: ConfigService) {
    const nodes = configService.get<string>('REDIS_CLUSTER_NODES', 'localhost:7000,localhost:7001,localhost:7002')
      .split(',')
      .map(node => {
        const [host, port] = node.split(':');
        return { host, port: parseInt(port, 10) };
      });

    return {
      nodes,
      redisOptions: {
        password: configService.get<string>('REDIS_PASSWORD'),
        retryStrategy: (times: number) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        enableReadyCheck: true,
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        keepAlive: 30000,
        family: 4,
        connectTimeout: 10000,
        commandTimeout: 5000,
      },
      clusterRetryStrategy: (times: number) => {
        const delay = Math.min(times * 100, 3000);
        return delay;
      },
      enableOfflineQueue: false,
      enableReadyCheck: true,
      maxRedirections: 16,
      retryDelayOnFailover: 100,
      retryDelayOnClusterDown: 300,
      retryDelayOnTryAgain: 100,
    };
  }

  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      const redisHost = configService.get<string>('REDIS_HOST', 'localhost');
      const redisPort = configService.get<number>('REDIS_PORT', 6379);
      
      return {
        status: 'healthy',
        message: `Redis connection configured for ${redisHost}:${redisPort}`,
        details: {
          host: redisHost,
          port: redisPort,
          db: configService.get<number>('REDIS_DB', 0),
          keyPrefix: configService.get<string>('REDIS_KEY_PREFIX', 'cart:'),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Redis configuration error',
        details: error.message,
      };
    }
  }

  static getCacheKeys() {
    return {
      CART: (userId: string) => `cart:${userId}`,
      CART_ITEMS: (cartId: string) => `cart:items:${cartId}`,
      USER_CART: (userId: string) => `user:cart:${userId}`,
      CART_LOCK: (cartId: string) => `cart:lock:${cartId}`,
      CART_EXPIRY: (cartId: string) => `cart:expiry:${cartId}`,
    };
  }

  static getTTLValues() {
    return {
      CART: 3600, // 1 hour
      CART_ITEMS: 1800, // 30 minutes
      USER_CART: 7200, // 2 hours
      CART_LOCK: 300, // 5 minutes
      CART_EXPIRY: 86400, // 24 hours
    };
  }
}
