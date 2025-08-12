/**
 * @fileoverview Cart entity for TechPotli backend services
 * Defines the cart table structure and relationships
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
import { IsNotEmpty, Min, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { generateId } from '@techpotli/common';

export enum CartStatus {
  ACTIVE = 'active',
  MERGED = 'merged',
  CONVERTED = 'converted',
  EXPIRED = 'expired'
}

@Entity('carts')
@Index(['userId'])
@Index(['sessionId'])
@Index(['status'])
@Index(['createdAt'])
@Index(['updatedAt'])
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  @IsNotEmpty()
  userId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  sessionId?: string;

  @Column({ type: 'enum', enum: CartStatus, default: CartStatus.ACTIVE })
  @IsEnum(CartStatus)
  status: CartStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Min(0)
  total: number;

  @Column({ type: 'varchar', length: 10, default: 'INR' })
  currency: string;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  appliedCoupons?: string[];

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  shippingAddress?: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
    email?: string;
  };

  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  expiresAt?: Date;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Virtual properties
  get itemCount(): number {
    return 0; // Will be calculated from cart items
  }

  get isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }

  get isEmpty(): boolean {
    return this.itemCount === 0;
  }

  // Lifecycle hooks
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = generateId();
    }
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}

@Entity('cart_items')
@Index(['cartId'])
@Index(['productId'])
@Index(['userId'])
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  @IsNotEmpty()
  cartId: string;

  @Column({ type: 'varchar', length: 36 })
  @IsNotEmpty()
  userId: string;

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
  totalPrice: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  image?: string;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  attributes?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
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
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
