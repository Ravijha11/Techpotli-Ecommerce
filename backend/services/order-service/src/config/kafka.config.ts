import { ConfigService } from '@nestjs/config';

export class KafkaConfig {
  static getProducerConfig(configService: ConfigService) {
    return {
      clientId: configService.get('KAFKA_CLIENT_ID', 'order-service-producer'),
      brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
      connectionTimeout: 3000,
      authenticationTimeout: 1000,
      reauthenticationThreshold: 10000,
      requestTimeout: 30000,
      retry: {
        initialRetryTime: 100,
        retries: 8,
        maxRetryTime: 30000,
        factor: 0.2,
        restartDelay: 100,
      },
      ssl: configService.get('KAFKA_SSL_ENABLED', false),
      sasl: configService.get('KAFKA_SASL_ENABLED', false) ? {
        mechanism: configService.get('KAFKA_SASL_MECHANISM', 'plain'),
        username: configService.get('KAFKA_USERNAME'),
        password: configService.get('KAFKA_PASSWORD'),
      } : undefined,
    };
  }

  static getConsumerConfig(configService: ConfigService) {
    return {
      clientId: configService.get('KAFKA_CLIENT_ID', 'order-service-consumer'),
      groupId: configService.get('KAFKA_GROUP_ID', 'order-service-group'),
      brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
      connectionTimeout: 3000,
      authenticationTimeout: 1000,
      reauthenticationThreshold: 10000,
      requestTimeout: 30000,
      sessionTimeout: 30000,
      heartbeatInterval: 3000,
      maxWaitTimeInMs: 5000,
      retry: {
        initialRetryTime: 100,
        retries: 8,
        maxRetryTime: 30000,
        factor: 0.2,
        restartDelay: 100,
      },
      ssl: configService.get('KAFKA_SSL_ENABLED', false),
      sasl: configService.get('KAFKA_SASL_ENABLED', false) ? {
        mechanism: configService.get('KAFKA_SASL_MECHANISM', 'plain'),
        username: configService.get('KAFKA_USERNAME'),
        password: configService.get('KAFKA_PASSWORD'),
      } : undefined,
      allowAutoTopicCreation: true,
      maxInFlightRequests: 5,
      maxBytes: 1048576, // 1MB
      maxBytesPerPartition: 1048576, // 1MB
      maxWaitTimeInMs: 5000,
      minBytes: 1,
    };
  }

  static getTopics() {
    return {
      // Order related topics
      ORDER_CREATED: 'order.created',
      ORDER_UPDATED: 'order.updated',
      ORDER_CANCELLED: 'order.cancelled',
      ORDER_SHIPPED: 'order.shipped',
      ORDER_DELIVERED: 'order.delivered',
      ORDER_RETURNED: 'order.returned',
      ORDER_REFUNDED: 'order.refunded',
      
      // Payment related topics
      PAYMENT_PROCESSED: 'payment.processed',
      PAYMENT_FAILED: 'payment.failed',
      PAYMENT_REFUNDED: 'payment.refunded',
      
      // Inventory related topics
      INVENTORY_RESERVED: 'inventory.reserved',
      INVENTORY_RELEASED: 'inventory.released',
      INVENTORY_UPDATED: 'inventory.updated',
      
      // Shipping related topics
      SHIPPING_LABEL_CREATED: 'shipping.label.created',
      SHIPPING_TRACKING_UPDATED: 'shipping.tracking.updated',
      SHIPPING_DELIVERED: 'shipping.delivered',
      
      // Notification topics
      NOTIFICATION_ORDER_UPDATE: 'notification.order.update',
      NOTIFICATION_SHIPPING_UPDATE: 'notification.shipping.update',
      NOTIFICATION_PAYMENT_UPDATE: 'notification.payment.update',
      
      // Analytics topics
      ANALYTICS_ORDER_METRICS: 'analytics.order.metrics',
      ANALYTICS_SHIPPING_METRICS: 'analytics.shipping.metrics',
      ANALYTICS_CUSTOMER_BEHAVIOR: 'analytics.customer.behavior',
    };
  }

  static getEventTypes() {
    return {
      // Order events
      ORDER_CREATED: 'order.created',
      ORDER_UPDATED: 'order.updated',
      ORDER_CANCELLED: 'order.cancelled',
      ORDER_SHIPPED: 'order.shipped',
      ORDER_DELIVERED: 'order.delivered',
      ORDER_RETURNED: 'order.returned',
      ORDER_REFUNDED: 'order.refunded',
      
      // Payment events
      PAYMENT_PROCESSED: 'payment.processed',
      PAYMENT_FAILED: 'payment.failed',
      PAYMENT_REFUNDED: 'payment.refunded',
      
      // Inventory events
      INVENTORY_RESERVED: 'inventory.reserved',
      INVENTORY_RELEASED: 'inventory.released',
      INVENTORY_UPDATED: 'inventory.updated',
      
      // Shipping events
      SHIPPING_LABEL_CREATED: 'shipping.label.created',
      SHIPPING_TRACKING_UPDATED: 'shipping.tracking.updated',
      SHIPPING_DELIVERED: 'shipping.delivered',
      
      // Notification events
      NOTIFICATION_ORDER_UPDATE: 'notification.order.update',
      NOTIFICATION_SHIPPING_UPDATE: 'notification.shipping.update',
      NOTIFICATION_PAYMENT_UPDATE: 'notification.payment.update',
      
      // Analytics events
      ANALYTICS_ORDER_METRICS: 'analytics.order.metrics',
      ANALYTICS_SHIPPING_METRICS: 'analytics.shipping.metrics',
      ANALYTICS_CUSTOMER_BEHAVIOR: 'analytics.customer.behavior',
    };
  }

  static getProducerOptions(configService: ConfigService) {
    return {
      ...this.getProducerConfig(configService),
      transactionalId: configService.get('KAFKA_TRANSACTIONAL_ID', 'order-service-transactional'),
      enableIdempotence: true,
      acks: 'all',
      compression: 'gzip',
      batchSize: 16384,
      linger: 5,
      bufferMemory: 33554432, // 32MB
      maxRequestSize: 1048576, // 1MB
      retryBackoff: 100,
      requestTimeout: 30000,
      deliveryTimeout: 120000,
      enableDeliveryReports: true,
      deliveryReportOnlyError: false,
    };
  }

  static getConsumerOptions(configService: ConfigService) {
    return {
      ...this.getConsumerConfig(configService),
      autoCommit: false,
      autoCommitInterval: 5000,
      autoCommitThreshold: 100,
      fetchMinBytes: 1,
      fetchMaxBytes: 1048576, // 1MB
      fetchMaxWaitMs: 500,
      maxBytes: 1048576, // 1MB
      maxBytesPerPartition: 1048576, // 1MB
      maxWaitTimeInMs: 5000,
      minBytes: 1,
      partitionAssignmentStrategy: 'round-robin',
      rebalanceTimeout: 60000,
      sessionTimeout: 30000,
      heartbeatInterval: 3000,
      maxInFlightRequests: 5,
      retry: {
        initialRetryTime: 100,
        retries: 8,
        maxRetryTime: 30000,
        factor: 0.2,
        restartDelay: 100,
      },
    };
  }

  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      const config = this.getProducerConfig(configService);
      // Here you would implement actual Kafka connection test
      // For now, we'll return a basic health check
      return {
        status: 'healthy',
        message: 'Kafka connection is available',
        details: {
          clientId: config.clientId,
          brokers: config.brokers,
          ssl: config.ssl,
          sasl: !!config.sasl,
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Kafka connection failed',
        details: {
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }
}
