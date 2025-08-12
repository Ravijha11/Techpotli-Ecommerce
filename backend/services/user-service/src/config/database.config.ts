/**
 * @fileoverview Database configuration for User Service
 * Handles primary and read replica database connections
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export class DatabaseConfig {
  /**
   * Get primary database configuration (write operations)
   */
  static getPrimaryConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mysql',
      host: configService.get<string>('DB_HOST', 'localhost'),
      port: configService.get<number>('DB_PORT', 3306),
      username: configService.get<string>('DB_USERNAME', 'techpotli_user'),
      password: configService.get<string>('DB_PASSWORD', 'techpotli_password_2024'),
      database: configService.get<string>('DB_NAME', 'techpotli_production'),
      synchronize: false, // Never true in production
      logging: configService.get<string>('NODE_ENV') === 'development',
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
      subscribers: [__dirname + '/../../database/subscribers/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'src/database/subscribers',
      },
      // Connection pooling for high concurrency
      extra: {
        connectionLimit: configService.get<number>('DB_POOL_MAX', 20),
        acquireTimeout: configService.get<number>('DB_POOL_ACQUIRE_TIMEOUT', 60000),
        timeout: configService.get<number>('DB_POOL_ACQUIRE_TIMEOUT', 60000),
        reconnect: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
      },
      // SSL configuration for production
      ssl: configService.get<string>('NODE_ENV') === 'production' ? {
        rejectUnauthorized: false,
      } : false,
    };
  }

  /**
   * Get read replica database configuration (read operations)
   */
  static getReadReplicaConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      name: 'read-replica',
      type: 'mysql',
      host: configService.get<string>('DB_READ_HOST_1', 'localhost'),
      port: configService.get<number>('DB_READ_PORT_1', 3307),
      username: configService.get<string>('DB_READ_USERNAME_1', 'techpotli_read_user'),
      password: configService.get<string>('DB_READ_PASSWORD_1', 'techpotli_read_password_2024'),
      database: configService.get<string>('DB_NAME', 'techpotli_production'),
      synchronize: false,
      logging: false, // Disable logging for read replicas
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [],
      subscribers: [],
      // Read-only connection with more connections for reads
      extra: {
        connectionLimit: configService.get<number>('DB_POOL_MAX', 20) * 2,
        acquireTimeout: configService.get<number>('DB_POOL_ACQUIRE_TIMEOUT', 60000),
        timeout: configService.get<number>('DB_POOL_ACQUIRE_TIMEOUT', 60000),
        reconnect: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
      },
      // SSL configuration for production
      ssl: configService.get<string>('NODE_ENV') === 'production' ? {
        rejectUnauthorized: false,
      } : false,
    };
  }

  /**
   * Get all database configurations for multi-database setup
   */
  static getAllConfigs(configService: ConfigService): {
    primary: TypeOrmModuleOptions;
    readReplica1: TypeOrmModuleOptions;
    readReplica2?: TypeOrmModuleOptions;
  } {
    const configs = {
      primary: this.getPrimaryConfig(configService),
      readReplica1: this.getReadReplicaConfig(configService),
    };

    // Add second read replica if configured
    if (configService.get<string>('DB_READ_HOST_2')) {
      configs.readReplica2 = {
        ...this.getReadReplicaConfig(configService),
        name: 'read-replica-2',
        host: configService.get<string>('DB_READ_HOST_2'),
        port: configService.get<number>('DB_READ_PORT_2', 3308),
        username: configService.get<string>('DB_READ_USERNAME_2'),
        password: configService.get<string>('DB_READ_PASSWORD_2'),
      } as TypeOrmModuleOptions;
    }

    return configs;
  }

  /**
   * Database connection health check
   */
  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      const config = this.getPrimaryConfig(configService);
      const mysql = await import('mysql2/promise');
      
      const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database,
      });
      
      await connection.ping();
      await connection.end();
      
      return { status: 'healthy' };
    } catch (error) {
      return { 
        status: 'unhealthy', 
        message: `Database connection failed: ${error.message}`,
        details: error,
      };
    }
  }

  /**
   * Get database statistics
   */
  static async getStats(configService: ConfigService): Promise<{
    connections: number;
    queries: number;
    slowQueries: number;
    uptime: number;
  }> {
    try {
      const config = this.getPrimaryConfig(configService);
      const mysql = await import('mysql2/promise');
      
      const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database,
      });
      
      // Get status variables
      const [statusRows] = await connection.execute('SHOW STATUS');
      const status = Object.fromEntries(
        statusRows.map((row: any) => [row.Variable_name, row.Value])
      );
      
      await connection.end();
      
      return {
        connections: parseInt(status.Threads_connected || '0'),
        queries: parseInt(status.Questions || '0'),
        slowQueries: parseInt(status.Slow_queries || '0'),
        uptime: parseInt(status.Uptime || '0'),
      };
    } catch (error) {
      return {
        connections: 0,
        queries: 0,
        slowQueries: 0,
        uptime: 0,
      };
    }
  }
}
