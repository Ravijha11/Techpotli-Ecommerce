/**
 * @fileoverview Main entry point for User Service
 * Bootstraps the NestJS application with all necessary configurations
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('UserService');
  
  try {
    // Create NestJS application
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Security middleware
    app.use(helmet());
    app.use(compression());

    // CORS configuration
    const corsOrigins = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000').split(',');
    app.enableCors({
      origin: corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        validationError: {
          target: false,
          value: false,
        },
      }),
    );

    // Global prefix
    app.setGlobalPrefix('api/v1');

    // Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('TechPotli User Service API')
      .setDescription('User management and authentication service for TechPotli e-commerce platform')
      .setVersion('1.0')
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management endpoints')
      .addTag('profile', 'User profile endpoints')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });

    // Get port from configuration
    const port = configService.get<number>('APP_PORT', 3001);
    const host = configService.get<string>('APP_HOST', '0.0.0.0');

    // Start application
    await app.listen(port, host);
    
    logger.log(`🚀 User Service is running on: http://${host}:${port}`);
    logger.log(`📚 API Documentation available at: http://${host}:${port}/api/docs`);
    logger.log(`🔍 Health check available at: http://${host}:${port}/health`);
    
    // Log environment information
    const nodeEnv = configService.get<string>('NODE_ENV', 'development');
    logger.log(`🌍 Environment: ${nodeEnv}`);
    
    // Log database connection status
    const dbHost = configService.get<string>('DB_HOST', 'localhost');
    const dbPort = configService.get<number>('DB_PORT', 3306);
    logger.log(`🗄️  Database: ${dbHost}:${dbPort}`);
    
    // Log Redis connection status
    const redisHost = configService.get<string>('REDIS_HOST', 'localhost');
    const redisPort = configService.get<number>('REDIS_PORT', 6379);
    logger.log(`🔴 Redis: ${redisHost}:${redisPort}`);
    
    // Log Kafka connection status
    const kafkaBrokers = configService.get<string>('KAFKA_BROKERS', 'localhost:9092');
    logger.log(`📨 Kafka: ${kafkaBrokers}`);

  } catch (error) {
    logger.error('❌ Failed to start User Service:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  const logger = new Logger('UserService');
  logger.log('🔄 SIGTERM received, shutting down gracefully...');
  
  // Close any open connections here if needed
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  const logger = new Logger('UserService');
  logger.log('🔄 SIGINT received, shutting down gracefully...');
  
  // Close any open connections here if needed
  
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  const logger = new Logger('UserService');
  logger.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  const logger = new Logger('UserService');
  logger.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

bootstrap();
