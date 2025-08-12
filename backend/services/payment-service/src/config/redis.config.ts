import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import * as redis from 'redis';

@Injectable()
export class RedisConfig {
  static getCacheConfig(configService: ConfigService): CacheModuleOptions {
    const isCluster = configService.get('REDIS_CLUSTER_URLS');
    
    if (isCluster) {
      return {
        store: require('cache-manager-redis-store'),
        cluster: {
          nodes: isCluster.split(',').map(url => ({ url: url.trim() })),
          options: {
            scaleReads: 'slave',
            maxRedirections: 16,
            retryDelayOnFailover: 100,
            enableOfflineQueue: false,
            enableReadyCheck: true,
            maxRetriesPerRequest: 3,
          },
        },
        ttl: 300, // 5 minutes default TTL
        max: 1000, // Maximum number of items in cache
        isGlobal: true,
      };
    }

    return {
      store: require('cache-manager-redis-store'),
      host: configService.get('REDIS_HOST', 'localhost'),
      port: configService.get('REDIS_PORT', 6379),
      password: configService.get('REDIS_PASSWORD'),
      db: configService.get('REDIS_DB', 0),
      ttl: 300,
      max: 1000,
      isGlobal: true,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    };
  }

  static getRedisConnectionConfig(configService: ConfigService) {
    const isCluster = configService.get('REDIS_CLUSTER_URLS');
    
    if (isCluster) {
      return {
        cluster: {
          nodes: isCluster.split(',').map(url => ({ url: url.trim() })),
          options: {
            scaleReads: 'slave',
            maxRedirections: 16,
            retryDelayOnFailover: 100,
            enableOfflineQueue: false,
            enableReadyCheck: true,
            maxRetriesPerRequest: 3,
            retryDelayOnClusterDown: 300,
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 3,
          },
        },
      };
    }

    return {
      host: configService.get('REDIS_HOST', 'localhost'),
      port: configService.get('REDIS_PORT', 6379),
      password: configService.get('REDIS_PASSWORD'),
      db: configService.get('REDIS_DB', 0),
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
    };
  }

  static getClusterConfig(configService: ConfigService) {
    const clusterUrls = configService.get('REDIS_CLUSTER_URLS');
    if (!clusterUrls) {
      return null;
    }

    const nodes = clusterUrls.split(',').map(url => {
      const [host, port] = url.trim().split(':');
      return { host, port: parseInt(port) || 6379 };
    });

    return {
      nodes,
      options: {
        scaleReads: 'slave',
        maxRedirections: 16,
        retryDelayOnFailover: 100,
        enableOfflineQueue: false,
        enableReadyCheck: true,
        maxRetriesPerRequest: 3,
        retryDelayOnClusterDown: 300,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3,
        clusterRetryStrategy: (times: number) => {
          const delay = Math.min(times * 100, 3000);
          return delay;
        },
      },
    };
  }

  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      const config = this.getRedisConnectionConfig(configService);
      let client: redis.RedisClientType | redis.RedisClusterType;

      if (config.cluster) {
        client = redis.createCluster(config.cluster);
      } else {
        client = redis.createClient(config);
      }

      await client.connect();
      await client.ping();
      await client.disconnect();

      return {
        status: 'healthy',
        message: 'Redis connection is working properly',
        details: {
          mode: config.cluster ? 'cluster' : 'single',
          nodes: config.cluster ? config.cluster.nodes.length : 1,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Redis connection failed',
        details: {
          error: error.message,
          stack: error.stack,
        },
      };
    }
  }

  static getCacheKeys() {
    return {
      payment: {
        transaction: (id: string) => `payment:transaction:${id}`,
        userPayments: (userId: string) => `payment:user:${userId}`,
        paymentMethods: (userId: string) => `payment:methods:${userId}`,
        webhookEvents: (id: string) => `payment:webhook:${id}`,
      },
      ttl: {
        transaction: 3600, // 1 hour
        userPayments: 1800, // 30 minutes
        paymentMethods: 7200, // 2 hours
        webhookEvents: 86400, // 24 hours
      },
    };
  }

  static getTTLValues() {
    return {
      short: 300, // 5 minutes
      medium: 1800, // 30 minutes
      long: 3600, // 1 hour
      veryLong: 86400, // 24 hours
    };
  }
}
