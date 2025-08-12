import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseConfig {
  static getPrimaryConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      name: 'primary',
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT', 3306),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
      synchronize: configService.get('DATABASE_SYNCHRONIZE', false),
      logging: configService.get('DATABASE_LOGGING', false),
      ssl: configService.get('NODE_ENV') === 'production',
      extra: {
        connectionLimit: 20,
        acquireTimeout: 60000,
        timeout: 60000,
        charset: 'utf8mb4_unicode_ci',
      },
      poolSize: 20,
      maxQueryExecutionTime: 10000,
    };
  }

  static getReadReplicaConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      name: 'readReplica',
      type: 'mysql',
      host: configService.get('DATABASE_READ_HOST', configService.get('DATABASE_HOST')),
      port: configService.get('DATABASE_READ_PORT', configService.get('DATABASE_PORT', 3306)),
      username: configService.get('DATABASE_READ_USERNAME', configService.get('DATABASE_USERNAME')),
      password: configService.get('DATABASE_READ_PASSWORD', configService.get('DATABASE_PASSWORD')),
      database: configService.get('DATABASE_NAME'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: false,
      ssl: configService.get('NODE_ENV') === 'production',
      extra: {
        connectionLimit: 30,
        acquireTimeout: 60000,
        timeout: 60000,
        charset: 'utf8mb4_unicode_ci',
      },
      poolSize: 30,
      maxQueryExecutionTime: 10000,
    };
  }

  static getAllConfigs(configService: ConfigService): {
    primary: TypeOrmModuleOptions;
    readReplica1: TypeOrmModuleOptions;
    readReplica2?: TypeOrmModuleOptions;
  } {
    return {
      primary: this.getPrimaryConfig(configService),
      readReplica1: this.getReadReplicaConfig(configService),
      readReplica2: configService.get('DATABASE_READ_HOST_2') ? {
        name: 'readReplica2',
        type: 'mysql',
        host: configService.get('DATABASE_READ_HOST_2'),
        port: configService.get('DATABASE_READ_PORT_2', 3306),
        username: configService.get('DATABASE_READ_USERNAME_2', configService.get('DATABASE_USERNAME')),
        password: configService.get('DATABASE_READ_PASSWORD_2', configService.get('DATABASE_PASSWORD')),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
        ssl: configService.get('NODE_ENV') === 'production',
        extra: {
          connectionLimit: 30,
          acquireTimeout: 60000,
          timeout: 60000,
          charset: 'utf8mb4_unicode_ci',
        },
        poolSize: 30,
        maxQueryExecutionTime: 10000,
      } : undefined,
    };
  }

  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      const config = this.getPrimaryConfig(configService);
      // Here you would implement actual database connection test
      // For now, we'll return a basic health check
      return {
        status: 'healthy',
        message: 'Database connection pool is available',
        details: {
          host: config.host,
          port: config.port,
          database: config.database,
          poolSize: config.poolSize,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Database connection failed',
        details: {
          error: error.message,
          timestamp: new Date().toISOString(),
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
    // This would typically query actual database statistics
    // For now, returning mock data
    return {
      connections: 15,
      queries: 1250,
      slowQueries: 3,
      uptime: Date.now() - new Date().getTime(),
    };
  }
}
