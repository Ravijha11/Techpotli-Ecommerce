/**
 * @fileoverview Main entry point for Product Service
 * Bootstraps the NestJS application with all necessary configurations
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('ProductService');
  
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
      }),
    );

    // CORS configuration
    app.enableCors({
      origin: configService.get('CORS_ORIGINS', '*').split(','),
      credentials: true,
    });

    // Global prefix
    app.setGlobalPrefix('api/v1');

    // Swagger documentation
    const config = new DocumentBuilder()
      .setTitle('TechPotli Product Service API')
      .setDescription('Product catalog and inventory management service for TechPotli e-commerce platform')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('products', 'Product operations')
      .addTag('categories', 'Category management')
      .addTag('brands', 'Brand management')
      .addTag('inventory', 'Inventory operations')
      .addTag('search', 'Product search')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', service: 'product-service', timestamp: new Date().toISOString() });
    });

    const port = configService.get('PORT', 3002);
    await app.listen(port);
    
    logger.log(`Product Service is running on port ${port}`);
    logger.log(`Swagger documentation available at http://localhost:${port}/api/docs`);
    logger.log(`Health check available at http://localhost:${port}/health`);
    
  } catch (error) {
    logger.error('Failed to start Product Service:', error);
    process.exit(1);
  }
}

bootstrap();
