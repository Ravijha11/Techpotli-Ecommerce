/**
 * @fileoverview Database configuration for Cart Service
 * Configures TypeORM connections for primary and read replica databases
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cart, CartItem } from '@techpotli/database';

@Injectable()
export class DatabaseConfig {
  static getPrimaryConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 3306),
      username: configService.get<string>('DB_USERNAME', 'techpotli_user'),
      password: configService.get<string>('DB_PASSWORD', 'techpotli_password_2024'),
      database: configService.get<string>('DB_NAME', 'techpotli_production'),
      entities: [Cart, CartItem],
      synchronize: configService.get<boolean>('DB_SYNC', false),
      logging: configService.get<boolean>('DB_LOGGING', false),
      ssl: configService.get<boolean>('DB_SSL', false),
      extra: {
        connectionLimit: configService.get<number>('DB_CONNECTION_LIMIT', 10),
        acquireTimeout: configService.get<number>('DB_ACQUIRE_TIMEOUT', 60000),
        timeout: configService.get<number>('DB_TIMEOUT', 60000),
        reconnect: true,
      },
    };
  }

  static getReadReplicaConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      name: 'read-replica',
      type: 'mysql',
      host: configService.get<string>('DB_READ_HOST', 'localhost'),
      port: configService.get<number>('DB_READ_PORT', 3307),
      username: configService.get<string>('DB_READ_USERNAME', 'techpotli_read_user'),
      password: configService.get<string>('DB_READ_PASSWORD', 'techpotli_read_password_2024'),
      database: configService.get<string>('DB_NAME', 'techpotli_production'),
      entities: [Cart, CartItem],
      synchronize: false, // Never sync on read replicas
      logging: false, // Minimal logging on read replicas
      ssl: configService.get<boolean>('DB_SSL', false),
      extra: {
        connectionLimit: configService.get<number>('DB_READ_CONNECTION_LIMIT', 20),
        acquireTimeout: configService.get<number>('DB_ACQUIRE_TIMEOUT', 60000),
        timeout: configService.get<number>('DB_TIMEOUT', 60000),
        reconnect: true,
      },
    };
  }

  static getAllConfigs(configService: ConfigService): {
    primary: TypeOrmModuleOptions;
    readReplica1: TypeOrmModuleOptions;
    readReplica2?: TypeOrmModuleOptions;
  } {
    const primary = this.getPrimaryConfig(configService);
    const readReplica1 = this.getReadReplicaConfig(configService);

    // Optional second read replica
    let readReplica2: TypeOrmModuleOptions | undefined;
    if (configService.get<string>('DB_READ_HOST_2')) {
      readReplica2 = {
        name: 'read-replica-2',
        type: 'mysql',
        host: configService.get<string>('DB_READ_HOST_2'),
        port: configService.get<number>('DB_READ_PORT_2', 3308),
        username: configService.get<string>('DB_READ_USERNAME_2', 'techpotli_read_user'),
        password: configService.get<string>('DB_READ_PASSWORD_2', 'techpotli_read_password_2024'),
        database: configService.get<string>('DB_NAME', 'techpotli_production'),
        entities: [Cart, CartItem],
        synchronize: false,
        logging: false,
        ssl: configService.get<boolean>('DB_SSL', false),
        extra: {
          connectionLimit: configService.get<number>('DB_READ_CONNECTION_LIMIT', 20),
          acquireTimeout: configService.get<number>('DB_ACQUIRE_TIMEOUT', 60000),
          timeout: configService.get<number>('DB_TIMEOUT', 60000),
          reconnect: true,
        },
      };
    }

    return {
      primary,
      readReplica1,
      readReplica2,
    };
  }

  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      // This would typically check actual database connectivity
      // For now, we'll return a basic health check
      const dbHost = configService.get<string>('DB_HOST', 'localhost');
      const dbPort = configService.get<number>('DB_PORT', 3306);
      
      return {
        status: 'healthy',
        message: `Database connection configured for ${dbHost}:${dbPort}`,
        details: {
          host: dbHost,
          port: dbPort,
          database: configService.get<string>('DB_NAME', 'techpotli_production'),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Database configuration error',
        details: error.message,
      };
    }
  }

  static async getStats(configService: ConfigService): Promise<{
    connections: number;
    queries: number;
    slowQueries: number;
    uptime: number;
  }> {
    // This would typically query actual database statistics
    // For now, we'll return mock data
    return {
      connections: 5,
      queries: 1000,
      slowQueries: 2,
      uptime: 3600, // 1 hour in seconds
    };
  }
}
