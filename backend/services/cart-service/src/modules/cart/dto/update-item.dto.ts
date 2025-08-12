/**
 * @fileoverview DTO for updating cart items
 * Defines the structure for cart item update requests
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, IsString, IsObject } from 'class-validator';

export class UpdateItemDto {
  @ApiPropertyOptional({
    description: 'Quantity of the item',
    example: 3,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Unit price of the item',
    example: 89999.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;

  @ApiPropertyOptional({
    description: 'Product image URL',
    example: 'https://example.com/iphone15pro-updated.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({
    description: 'Product attributes',
    example: { color: 'Space Black', storage: '256GB' },
  })
  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { warranty: '2 years', insurance: 'included' },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
