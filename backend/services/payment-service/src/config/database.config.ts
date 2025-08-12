import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfig {
  static getPrimaryConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      url: configService.get<string>('DATABASE_URL'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: configService.get('NODE_ENV') === 'development',
      logging: configService.get('NODE_ENV') === 'development',
      ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      extra: {
        connectionLimit: 20,
        acquireTimeout: 60000,
        timeout: 60000,
        charset: 'utf8mb4_unicode_ci',
      },
    };
  }

  static getReadReplicaConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      url: configService.get<string>('DATABASE_READ_REPLICA_1_URL'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: false,
      ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      extra: {
        connectionLimit: 10,
        acquireTimeout: 30000,
        timeout: 30000,
        charset: 'utf8mb4_unicode_ci',
      },
    };
  }

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
    const replica2Url = configService.get<string>('DATABASE_READ_REPLICA_2_URL');
    if (replica2Url) {
      configs.readReplica2 = {
        ...this.getReadReplicaConfig(configService),
        url: replica2Url,
      };
    }

    return configs;
  }

  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      const configs = this.getAllConfigs(configService);
      
      // Test primary connection
      const primaryConnection = await require('typeorm').createConnection(configs.primary);
      await primaryConnection.query('SELECT 1');
      await primaryConnection.close();

      // Test read replica connection
      const replicaConnection = await require('typeorm').createConnection(configs.readReplica1);
      await replicaConnection.query('SELECT 1');
      await replicaConnection.close();

      return {
        status: 'healthy',
        message: 'Database connections are working properly',
        details: {
          primary: 'connected',
          readReplica1: 'connected',
          readReplica2: configs.readReplica2 ? 'configured' : 'not configured',
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Database connection failed',
        details: {
          error: error.message,
          stack: error.stack,
        },
      };
    }
  }

  static async getStats(configService: ConfigService): Promise<{
    connections: number;
    queries: number;
    slowQueries: number;
    uptime: number;
  }> {
    try {
      const connection = await require('typeorm').createConnection(this.getPrimaryConfig(configService));
      
      const [result] = await connection.query(`
        SELECT 
          VARIABLE_VALUE as connections,
          (SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME = 'Questions') as queries,
          (SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME = 'Slow_queries') as slowQueries,
          (SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME = 'Uptime') as uptime
        FROM performance_schema.global_variables 
        WHERE VARIABLE_NAME = 'max_connections'
      `);

      await connection.close();

      return {
        connections: parseInt(result.connections) || 0,
        queries: parseInt(result.queries) || 0,
        slowQueries: parseInt(result.slowQueries) || 0,
        uptime: parseInt(result.uptime) || 0,
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
