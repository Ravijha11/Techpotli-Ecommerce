/**
 * @fileoverview Product entity for TechPotli backend services
 * Defines the product table structure and relationships
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsNotEmpty, Min, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { generateId } from '@techpotli/common';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  ARCHIVED = 'archived'
}

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SERVICE = 'service'
}

@Entity('products')
@Index(['sku'], { unique: true })
@Index(['name'])
@Index(['categoryId'])
@Index(['brandId'])
@Index(['status'])
@Index(['price'])
@Index(['createdAt'])
@Index(['updatedAt'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  description: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty()
  sku: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Min(0)
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @Min(0)
  originalPrice?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  @IsOptional()
  @Min(0)
  discount?: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DRAFT })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.PHYSICAL })
  @IsEnum(ProductType)
  type: ProductType;

  @Column({ type: 'varchar', length: 36 })
  @IsNotEmpty()
  categoryId: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  @IsOptional()
  brandId?: string;

  @Column({ type: 'int', default: 0 })
  @Min(0)
  stockQuantity: number;

  @Column({ type: 'int', default: 0 })
  @Min(0)
  reservedQuantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  @Min(0)
  weight?: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  weightUnit?: string;

  @Column({ type: 'json' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImage)
  images: ProductImage[];

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  attributes?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  specifications?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  variants?: ProductVariant[];

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'boolean', default: false })
  isBestSeller: boolean;

  @Column({ type: 'boolean', default: false })
  isNewArrival: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  @Min(0)
  rating: number;

  @Column({ type: 'int', default: 0 })
  @Min(0)
  reviewCount: number;

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
  get availableQuantity(): number {
    return this.stockQuantity - this.reservedQuantity;
  }

  get isInStock(): boolean {
    return this.availableQuantity > 0;
  }

  get discountPercentage(): number {
    if (!this.originalPrice || this.originalPrice <= this.price) return 0;
    return ((this.originalPrice - this.price) / this.originalPrice) * 100;
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

export class ProductImage {
  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  alt?: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;
}

export class ProductVariant {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  value: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  priceAdjustment?: number;

  @Column({ type: 'int', nullable: true })
  stockQuantity?: number;
}
