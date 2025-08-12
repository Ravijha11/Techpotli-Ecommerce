/**
 * @fileoverview DTO for adding items to cart
 * Defines the structure for adding items to cart requests
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsOptional, IsObject } from 'class-validator';

export class AddItemDto {
  @ApiProperty({
    description: 'Product ID to add to cart',
    example: 'uuid-456',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Product name',
    example: 'iPhone 15 Pro',
  })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({
    description: 'Product SKU',
    example: 'IPH15PRO-128',
  })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'Quantity to add',
    example: 2,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Unit price of the product',
    example: 99999.99,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @ApiPropertyOptional({
    description: 'Product image URL',
    example: 'https://example.com/iphone15pro.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'Product attributes',
    example: { color: 'Titanium', storage: '128GB' },
  })
  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { warranty: '1 year' },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
