/**
 * @fileoverview DTO for updating cart information
 * Defines the structure for cart update requests
 */

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsObject, IsEnum } from 'class-validator';
import { CartStatus } from '@techpotli/database';

export class UpdateCartDto {
  @ApiPropertyOptional({
    description: 'Cart status',
    enum: CartStatus,
    example: CartStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(CartStatus)
  status?: CartStatus;

  @ApiPropertyOptional({
    description: 'Currency for the cart',
    example: 'INR',
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({
    description: 'Applied coupon codes',
    example: ['SAVE10', 'FREESHIP'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  appliedCoupons?: string[];

  @ApiPropertyOptional({
    description: 'Shipping address information',
    example: {
      firstName: 'John',
      lastName: 'Doe',
      addressLine1: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
      phone: '+919876543210',
      email: 'john@example.com',
    },
  })
  @IsOptional()
  @IsObject()
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

  @ApiPropertyOptional({
    description: 'Additional metadata for the cart',
    example: { source: 'web', device: 'desktop' },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
