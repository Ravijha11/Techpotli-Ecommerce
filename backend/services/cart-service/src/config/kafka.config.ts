/**
 * @fileoverview Kafka configuration for Cart Service
 * Configures Kafka producer and consumer settings
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaConfig {
  static getProducerConfig(configService: ConfigService) {
    return {
      clientId: configService.get<string>('KAFKA_CLIENT_ID', 'cart-service'),
      brokers: configService.get<string>('KAFKA_BROKERS', 'localhost:9092').split(','),
      connectionTimeout: configService.get<number>('KAFKA_CONNECTION_TIMEOUT', 3000),
      authenticationTimeout: configService.get<number>('KAFKA_AUTH_TIMEOUT', 1000),
      requestTimeout: configService.get<number>('KAFKA_REQUEST_TIMEOUT', 30000),
      retry: {
        initialRetryTime: configService.get<number>('KAFKA_INITIAL_RETRY_TIME', 100),
        retries: configService.get<number>('KAFKA_MAX_RETRIES', 8),
      },
      ssl: configService.get<boolean>('KAFKA_SSL', false),
      sasl: configService.get<boolean>('KAFKA_SASL', false) ? {
        mechanism: configService.get<string>('KAFKA_SASL_MECHANISM', 'plain'),
        username: configService.get<string>('KAFKA_USERNAME'),
        password: configService.get<string>('KAFKA_PASSWORD'),
      } : undefined,
    };
  }

  static getConsumerConfig(configService: ConfigService) {
    return {
      groupId: configService.get<string>('KAFKA_GROUP_ID', 'cart-service-consumer'),
      clientId: configService.get<string>('KAFKA_CLIENT_ID', 'cart-service'),
      brokers: configService.get<string>('KAFKA_BROKERS', 'localhost:9092').split(','),
      connectionTimeout: configService.get<number>('KAFKA_CONNECTION_TIMEOUT', 3000),
      authenticationTimeout: configService.get<number>('KAFKA_AUTH_TIMEOUT', 1000),
      requestTimeout: configService.get<number>('KAFKA_REQUEST_TIMEOUT', 30000),
      sessionTimeout: configService.get<number>('KAFKA_SESSION_TIMEOUT', 30000),
      heartbeatInterval: configService.get<number>('KAFKA_HEARTBEAT_INTERVAL', 3000),
      maxBytesPerPartition: configService.get<number>('KAFKA_MAX_BYTES_PER_PARTITION', 1048576), // 1MB
      retry: {
        initialRetryTime: configService.get<number>('KAFKA_INITIAL_RETRY_TIME', 100),
        retries: configService.get<number>('KAFKA_MAX_RETRIES', 8),
      },
      ssl: configService.get<boolean>('KAFKA_SSL', false),
      sasl: configService.get<boolean>('KAFKA_SASL', false) ? {
        mechanism: configService.get<string>('KAFKA_SASL_MECHANISM', 'plain'),
        username: configService.get<string>('KAFKA_USERNAME'),
        password: configService.get<string>('KAFKA_PASSWORD'),
      } : undefined,
    };
  }

  static getTopics() {
    return {
      CART_CREATED: 'cart.created',
      CART_UPDATED: 'cart.updated',
      CART_DELETED: 'cart.deleted',
      CART_ITEM_ADDED: 'cart.item.added',
      CART_ITEM_UPDATED: 'cart.item.updated',
      CART_ITEM_REMOVED: 'cart.item.removed',
      CART_CLEARED: 'cart.cleared',
      CART_MERGED: 'cart.merged',
      CART_EXPIRED: 'cart.expired',
      CART_CONVERTED: 'cart.converted',
      INVENTORY_UPDATED: 'inventory.updated',
      PRODUCT_UPDATED: 'product.updated',
      USER_LOGGED_IN: 'user.logged_in',
      USER_LOGGED_OUT: 'user.logged_out',
    };
  }

  static getEventTypes() {
    return {
      CART_CREATED: 'cart.created',
      CART_UPDATED: 'cart.updated',
      CART_DELETED: 'cart.deleted',
      CART_ITEM_ADDED: 'cart.item.added',
      CART_ITEM_UPDATED: 'cart.item.updated',
      CART_ITEM_REMOVED: 'cart.item.removed',
      CART_CLEARED: 'cart.cleared',
      CART_MERGED: 'cart.merged',
      CART_EXPIRED: 'cart.expired',
      CART_CONVERTED: 'cart.converted',
    };
  }

  static getProducerOptions(configService: ConfigService) {
    return {
      allowAutoTopicCreation: configService.get<boolean>('KAFKA_ALLOW_AUTO_TOPIC_CREATION', true),
      transactionTimeout: configService.get<number>('KAFKA_TRANSACTION_TIMEOUT', 60000),
      maxInFlightRequests: configService.get<number>('KAFKA_MAX_IN_FLIGHT_REQUESTS', 5),
      idempotent: configService.get<boolean>('KAFKA_IDEMPOTENT', true),
      acks: configService.get<number>('KAFKA_ACKS', 1),
      compression: configService.get<string>('KAFKA_COMPRESSION', 'gzip'),
      batchSize: configService.get<number>('KAFKA_BATCH_SIZE', 16384),
      linger: configService.get<number>('KAFKA_LINGER', 5),
      bufferMemory: configService.get<number>('KAFKA_BUFFER_MEMORY', 33554432), // 32MB
    };
  }

  static getConsumerOptions(configService: ConfigService) {
    return {
      autoCommit: configService.get<boolean>('KAFKA_AUTO_COMMIT', true),
      autoCommitInterval: configService.get<number>('KAFKA_AUTO_COMMIT_INTERVAL', 5000),
      autoCommitThreshold: configService.get<number>('KAFKA_AUTO_COMMIT_THRESHOLD', 100),
      partitionsConsumedConcurrently: configService.get<number>('KAFKA_PARTITIONS_CONSUMED_CONCURRENTLY', 1),
      maxWaitTimeInMs: configService.get<number>('KAFKA_MAX_WAIT_TIME_MS', 5000),
      maxBytes: configService.get<number>('KAFKA_MAX_BYTES', 1048576), // 1MB
      retry: {
        initialRetryTime: configService.get<number>('KAFKA_INITIAL_RETRY_TIME', 100),
        retries: configService.get<number>('KAFKA_MAX_RETRIES', 8),
        factor: configService.get<number>('KAFKA_RETRY_FACTOR', 2),
        maxRetryTime: configService.get<number>('KAFKA_MAX_RETRY_TIME', 30000),
      },
    };
  }

  static async checkHealth(configService: ConfigService): Promise<{
    status: 'healthy' | 'unhealthy';
    message?: string;
    details?: any;
  }> {
    try {
      const brokers = configService.get<string>('KAFKA_BROKERS', 'localhost:9092');
      
      return {
        status: 'healthy',
        message: `Kafka connection configured for brokers: ${brokers}`,
        details: {
          brokers: brokers.split(','),
          clientId: configService.get<string>('KAFKA_CLIENT_ID', 'cart-service'),
          groupId: configService.get<string>('KAFKA_GROUP_ID', 'cart-service-consumer'),
          ssl: configService.get<boolean>('KAFKA_SSL', false),
          sasl: configService.get<boolean>('KAFKA_SASL', false),
        },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Kafka configuration error',
        details: error.message,
      };
    }
  }
}
