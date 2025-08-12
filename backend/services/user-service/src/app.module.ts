/**
 * @fileoverview Main application module for User Service
 * Configures all modules, providers, and global configurations
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { TerminusModule } from '@nestjs/terminus';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Configuration
import { DatabaseConfig } from './config/database.config';
import { RedisConfig } from './config/redis.config';
import { KafkaConfig } from './config/kafka.config';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';
import { HealthModule } from './modules/health/health.module';

// Common modules
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema: undefined, // Add Joi validation schema if needed
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => DatabaseConfig.getPrimaryConfig(configService),
      inject: [ConfigService],
    }),

    // Read Replica Database (for read operations)
    TypeOrmModule.forRootAsync({
      name: 'read-replica',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => DatabaseConfig.getReadReplicaConfig(configService),
      inject: [ConfigService],
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get<number>('RATE_LIMIT_WINDOW_MS', 900000), // 15 minutes
        limit: configService.get<number>('RATE_LIMIT_MAX_REQUESTS', 100),
        skipSuccessfulRequests: configService.get<boolean>('RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS', false),
        skipFailedRequests: false,
      }),
      inject: [ConfigService],
    }),

    // Cache Management
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => RedisConfig.getCacheConfig(configService),
      inject: [ConfigService],
    }),

    // Background Job Queue
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB', 0),
        },
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 200,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      }),
      inject: [ConfigService],
    }),

    // Kafka Microservice
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('KAFKA_CLIENT_ID', 'user-service'),
              brokers: configService.get<string>('KAFKA_BROKERS', 'localhost:9092').split(','),
            },
            consumer: {
              groupId: configService.get<string>('KAFKA_GROUP_ID', 'user-service-consumer'),
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),

    // Health Checks
    TerminusModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    ProfileModule,
    HealthModule,

    // Common Module
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
