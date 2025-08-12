/**
 * @fileoverview DTO for creating a new cart
 * Defines the structure for cart creation requests
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsObject } from 'class-validator';

export class CreateCartDto {
  @ApiPropertyOptional({
    description: 'Session ID for guest users',
    example: 'sess_123456789',
  })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Currency for the cart',
    example: 'INR',
    default: 'INR',
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
