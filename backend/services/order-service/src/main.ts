import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import * as rateLimit from 'express-rate-limit';
import * as slowDown from 'express-slow-down';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthCheckService, TerminusModule } from '@nestjs/terminus';
import { PrometheusController } from './modules/health/prometheus.controller';

async function bootstrap() {
  const logger = new Logger('OrderService');
  
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

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

    // Security middleware
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }));

    // Compression
    app.use(compression());

    // CORS configuration
    app.use(cors({
      origin: configService.get('CORS_ORIGINS', '*').split(','),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });

    const speedLimiter = slowDown({
      windowMs: 15 * 60 * 1000, // 15 minutes
      delayAfter: 50, // allow 50 requests per 15 minutes, then...
      delayMs: 500, // begin adding 500ms of delay per request above 50
    });

    app.use('/api/', limiter);
    app.use('/api/', speedLimiter);

    // Global prefix
    app.setGlobalPrefix('api/v1');

    // Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('TechPotli Order Service API')
      .setDescription('Order management and processing service for TechPotli e-commerce platform')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('orders', 'Order management operations')
      .addTag('shipping', 'Shipping and tracking operations')
      .addTag('fulfillment', 'Order fulfillment operations')
      .addTag('health', 'Health check endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showRequestHeaders: true,
      },
    });

    // Health checks
    const healthCheckService = app.get(HealthCheckService);
    app.get('/health', async (req, res) => {
      const health = await healthCheckService.check([
        () => healthCheckService.pingCheck('order-service'),
        () => healthCheckService.diskCheck({
          thresholdPercent: 0.9,
          path: '/',
        }),
        () => healthCheckService.memoryCheck({
          heapUsedThreshold: 150 * 1024 * 1024, // 150MB
        }),
      ]);
      res.json(health);
    });

    // Metrics endpoint
    app.get('/metrics', async (req, res) => {
      const prometheusController = app.get(PrometheusController);
      const metrics = await prometheusController.getMetrics();
      res.set('Content-Type', 'text/plain');
      res.end(metrics);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      logger.log(`Received ${signal}, starting graceful shutdown...`);
      
      try {
        await app.close();
        logger.log('Application closed successfully');
        process.exit(0);
      } catch (error) {
        logger.error('Error during graceful shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Start the application
    const port = configService.get('PORT', 3004);
    await app.listen(port, '0.0.0.0');
    
    logger.log(`🚀 Order Service is running on: http://localhost:${port}`);
    logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
    logger.log(`🏥 Health Check: http://localhost:${port}/health`);
    logger.log(`📊 Metrics: http://localhost:${port}/metrics`);
    
    // Log environment info
    const environment = configService.get('NODE_ENV', 'development');
    const databaseUrl = configService.get('DATABASE_URL', 'not configured');
    const redisUrl = configService.get('REDIS_URL', 'not configured');
    const kafkaUrl = configService.get('KAFKA_URL', 'not configured');
    
    logger.log(`🌍 Environment: ${environment}`);
    logger.log(`🗄️  Database: ${databaseUrl.includes('not configured') ? 'not configured' : 'configured'}`);
    logger.log(`🔴 Redis: ${redisUrl.includes('not configured') ? 'not configured' : 'configured'}`);
    logger.log(`📨 Kafka: ${kafkaUrl.includes('not configured') ? 'not configured' : 'configured'}`);
    
  } catch (error) {
    logger.error('Failed to start Order Service:', error);
    process.exit(1);
  }
}

bootstrap();
