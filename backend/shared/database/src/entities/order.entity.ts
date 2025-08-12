/**
 * @fileoverview Order entity for TechPotli backend services
 * Defines the order table structure and relationships
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsNotEmpty, Min, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { generateId } from '@techpotli/common';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  CAPTURED = 'captured',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum ShippingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned'
}

@Entity('orders')
@Index(['orderNumber'], { unique: true })
@Index(['userId'])
@Index(['status'])
@Index(['paymentStatus'])
@Index(['shippingStatus'])
@Index(['createdAt'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @IsNotEmpty()
  orderNumber: string;

  @Column({ type: 'varchar', length: 36 })
  @IsNotEmpty()
  userId: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @Column({ type: 'enum', enum: ShippingStatus, default: ShippingStatus.PENDING })
  @IsEnum(ShippingStatus)
  shippingStatus: ShippingStatus;

  @Column({ type: 'json' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(0)
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Min(0)
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Min(0)
  shipping: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Min(0)
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(0)
  total: number;

  @Column({ type: 'varchar', length: 10, default: 'INR' })
  currency: string;

  @Column({ type: 'json' })
  shippingAddress: Address;

  @Column({ type: 'json' })
  billingAddress: Address;

  @Column({ type: 'json', nullable: true })
  paymentMethod?: PaymentMethod;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trackingNumber?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  courierName?: string;

  @Column({ type: 'timestamp', nullable: true })
  estimatedDeliveryDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualDeliveryDate?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Lifecycle hooks
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = generateId();
    }
    if (!this.orderNumber) {
      this.orderNumber = this.generateOrderNumber();
    }
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  // Helper methods
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `TP-${timestamp}-${random}`;
  }

  get itemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get isCancellable(): boolean {
    return [OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(this.status);
  }

  get isRefundable(): boolean {
    return [OrderStatus.DELIVERED, OrderStatus.SHIPPED].includes(this.status);
  }
}

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  @IsNotEmpty()
  productId: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  productName: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  sku: string;

  @Column({ type: 'int' })
  @Min(1)
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(0)
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(0)
  total: number;

  @Column({ type: 'json', nullable: true })
  attributes?: Record<string, any>;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image?: string;
}

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  addressLine1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2?: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  city: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  state: string;

  @Column({ type: 'varchar', length: 20 })
  @IsNotEmpty()
  postalCode: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  country: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;
}

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provider?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  last4?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  brand?: string;

  @Column({ type: 'int', nullable: true })
  expiryMonth?: number;

  @Column({ type: 'int', nullable: true })
  expiryYear?: number;

  @Column({ type: 'boolean', default: false })
  isDefault: boolean;
}
