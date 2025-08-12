import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaConfig {
  static getProducerConfig(configService: ConfigService) {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.get('KAFKA_CLIENT_ID', 'payment-service'),
          brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
          connectionTimeout: 3000,
          authenticationTimeout: 1000,
          requestTimeout: 30000,
        },
        producer: {
          allowAutoTopicCreation: true,
          transactionTimeout: 30000,
          maxInFlightRequests: 5,
          idempotent: true,
          acks: 'all',
          compression: 'gzip',
          batchSize: 16384,
          linger: 5,
          bufferMemory: 33554432,
        },
      },
    };
  }

  static getConsumerConfig(configService: ConfigService) {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.get('KAFKA_CLIENT_ID', 'payment-service'),
          brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
          connectionTimeout: 3000,
          authenticationTimeout: 1000,
          requestTimeout: 30000,
        },
        consumer: {
          groupId: configService.get('KAFKA_CONSUMER_GROUP_ID', 'payment-service-group'),
          sessionTimeout: 30000,
          heartbeatInterval: 3000,
          rebalanceTimeout: 60000,
          maxBytesPerPartition: 1048576,
          maxWaitTimeInMs: 5000,
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
          autoCommit: false,
          autoCommitInterval: 5000,
          autoCommitThreshold: 100,
        },
        subscribe: {
          fromBeginning: false,
        },
      },
    };
  }

  static getTopics() {
    return {
      // Payment events
      payment: {
        created: 'payment.created',
        processed: 'payment.processed',
        failed: 'payment.failed',
        refunded: 'payment.refunded',
        disputed: 'payment.disputed',
      },
      // Order events
      order: {
        created: 'order.created',
        updated: 'order.updated',
        cancelled: 'order.cancelled',
      },
      // User events
      user: {
        created: 'user.created',
        updated: 'user.updated',
        deleted: 'user.deleted',
      },
      // Notification events
      notification: {
        paymentSuccess: 'notification.payment.success',
        paymentFailure: 'notification.payment.failure',
        refundProcessed: 'notification.refund.processed',
      },
    };
  }

  static getEventTypes() {
    return {
      PAYMENT_CREATED: 'payment.created',
      PAYMENT_PROCESSED: 'payment.processed',
      PAYMENT_FAILED: 'payment.failed',
      PAYMENT_REFUNDED: 'payment.refunded',
      PAYMENT_DISPUTED: 'payment.disputed',
      ORDER_CREATED: 'order.created',
      ORDER_UPDATED: 'order.updated',
      ORDER_CANCELLED: 'order.cancelled',
      USER_CREATED: 'user.created',
      USER_UPDATED: 'user.updated',
      USER_DELETED: 'user.deleted',
      NOTIFICATION_PAYMENT_SUCCESS: 'notification.payment.success',
      NOTIFICATION_PAYMENT_FAILURE: 'notification.payment.failure',
      NOTIFICATION_REFUND_PROCESSED: 'notification.refund.processed',
    };
  }

  static getProducerOptions(configService: ConfigService) {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.get('KAFKA_CLIENT_ID', 'payment-service'),
          brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
          connectionTimeout: 3000,
          authenticationTimeout: 1000,
          requestTimeout: 30000,
        },
        producer: {
          allowAutoTopicCreation: true,
          transactionTimeout: 30000,
          maxInFlightRequests: 5,
          idempotent: true,
          acks: 'all',
          compression: 'gzip',
          batchSize: 16384,
          linger: 5,
          bufferMemory: 33554432,
        },
      },
    };
  }

  static getConsumerOptions(configService: ConfigService) {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.get('KAFKA_CLIENT_ID', 'payment-service'),
          brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
          connectionTimeout: 3000,
          authenticationTimeout: 1000,
          requestTimeout: 30000,
        },
        consumer: {
          groupId: configService.get('KAFKA_CONSUMER_GROUP_ID', 'payment-service-group'),
          sessionTimeout: 30000,
          heartbeatInterval: 3000,
          rebalanceTimeout: 60000,
          maxBytesPerPartition: 1048576,
          maxWaitTimeInMs: 5000,
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
          autoCommit: false,
          autoCommitInterval: 5000,
          autoCommitThreshold: 100,
        },
        subscribe: {
          fromBeginning: false,
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
      const { Kafka } = require('kafkajs');
      const kafka = new Kafka({
        clientId: configService.get('KAFKA_CLIENT_ID', 'payment-service'),
        brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
      });

      const admin = kafka.admin();
      await admin.connect();
      const metadata = await admin.fetchTopicMetadata();
      await admin.disconnect();

      return {
        status: 'healthy',
        message: 'Kafka connection is working properly',
        details: {
          brokers: configService.get('KAFKA_BROKERS', 'localhost:9092').split(','),
          topics: metadata.topics.length,
          clientId: configService.get('KAFKA_CLIENT_ID', 'payment-service'),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Kafka connection failed',
        details: {
          error: error.message,
          stack: error.stack,
        },
      };
    }
  }
}
