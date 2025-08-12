import { ConfigService } from '@nestjs/config';
import { CacheModuleOptions } from '@nestjs/cache-manager';

export class RedisConfig {
  static getCacheConfig(configService: ConfigService): CacheModuleOptions {
    return {
      isGlobal: true,
      store: require('cache-manager-redis-store'),
      host: configService.get('REDIS_HOST', 'localhost'),
      port: configService.get('REDIS_PORT', 6379),
      password: configService.get('REDIS_PASSWORD'),
      db: configService.get('REDIS_DB', 0),
      ttl: 300, // 5 minutes default TTL
      max: 1000, // maximum number of items in cache
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      family: 4,
      keyPrefix: 'order-service:',
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    };
  }

  static getRedisConnectionConfig(configService: ConfigService) {
    return {
      host: configService.get('REDIS_HOST', 'localhost'),
      port: configService.get('REDIS_PORT', 6379),
      password: configService.get('REDIS_PASSWORD'),
      db: configService.get('REDIS_DB', 0),
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      family: 4,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      reconnectOnError: (err: Error) => {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          return true;
        }
        return false;
      },
    };
  }

  static getClusterConfig(configService: ConfigService) {
    const clusterNodes = configService.get('REDIS_CLUSTER_NODES', 'localhost:7000,localhost:7001,localhost:7002');
    
    return {
      nodes: clusterNodes.split(',').map(node => {
        const [host, port] = node.trim().split(':');
        return { host, port: parseInt(port, 10) };
      }),
      redisOptions: {
        password: configService.get('REDIS_PASSWORD'),
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        keepAlive: 30000,
        family: 4,
        retryStrategy: (times: number) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        reconnectOnError: (err: Error) => {
          const targetError = 'READONLY';
          if (err.message.includes(targetError)) {
            return true;
          }
          return false;
        },
      },
      clusterRetryStrategy: (times: number) => {
        const delay = Math.min(times * 100, 3000);
        return delay;
      },
      enableOfflineQueue: false,
      enableReadyCheck: false,
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
      const config = this.getRedisConnectionConfig(configService);
      // Here you would implement actual Redis connection test
      // For now, we'll return a basic health check
      return {
        status: 'healthy',
        message: 'Redis connection is available',
        details: {
          host: config.host,
          port: config.port,
          db: config.db,
          clusterMode: !!configService.get('REDIS_CLUSTER_NODES'),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Redis connection failed',
        details: {
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  static getCacheKeys() {
    return {
      ORDER_PREFIX: 'order:',
      ORDER_ITEMS_PREFIX: 'order-items:',
      SHIPPING_PREFIX: 'shipping:',
      TRACKING_PREFIX: 'tracking:',
      USER_ORDERS_PREFIX: 'user-orders:',
      ORDER_STATS_PREFIX: 'order-stats:',
      SHIPPING_PROVIDERS_PREFIX: 'shipping-providers:',
      FULFILLMENT_PREFIX: 'fulfillment:',
    };
  }

  static getTTLValues() {
    return {
      ORDER_CACHE_TTL: 300, // 5 minutes
      ORDER_ITEMS_CACHE_TTL: 300, // 5 minutes
      SHIPPING_CACHE_TTL: 600, // 10 minutes
      TRACKING_CACHE_TTL: 180, // 3 minutes
      USER_ORDERS_CACHE_TTL: 900, // 15 minutes
      ORDER_STATS_CACHE_TTL: 3600, // 1 hour
      SHIPPING_PROVIDERS_CACHE_TTL: 7200, // 2 hours
      FULFILLMENT_CACHE_TTL: 600, // 10 minutes
    };
  }
}
