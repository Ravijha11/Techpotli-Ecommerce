/**
 * @fileoverview Response DTO for cart operations
 * Defines the structure for cart responses
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CartStatus } from '@techpotli/database';

export class CartItemResponseDto {
  @ApiProperty({
    description: 'Cart item ID',
    example: 'uuid-123',
  })
  id: string;

  @ApiProperty({
    description: 'Product ID',
    example: 'uuid-456',
  })
  productId: string;

  @ApiProperty({
    description: 'Product name',
    example: 'iPhone 15 Pro',
  })
  productName: string;

  @ApiProperty({
    description: 'Product SKU',
    example: 'IPH15PRO-128',
  })
  sku: string;

  @ApiProperty({
    description: 'Quantity of the item',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Unit price of the item',
    example: 99999.99,
  })
  unitPrice: number;

  @ApiProperty({
    description: 'Total price for this item',
    example: 199999.98,
  })
  totalPrice: number;

  @ApiPropertyOptional({
    description: 'Product image URL',
    example: 'https://example.com/iphone15pro.jpg',
  })
  image?: string;

  @ApiPropertyOptional({
    description: 'Product attributes',
    example: { color: 'Titanium', storage: '128GB' },
  })
  attributes?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { warranty: '1 year' },
  })
  metadata?: Record<string, any>;
}

export class CartResponseDto {
  @ApiProperty({
    description: 'Cart ID',
    example: 'uuid-789',
  })
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: 'uuid-123',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'Session ID for guest users',
    example: 'sess_123456789',
  })
  sessionId?: string;

  @ApiProperty({
    description: 'Cart status',
    enum: CartStatus,
    example: CartStatus.ACTIVE,
  })
  status: CartStatus;

  @ApiProperty({
    description: 'Cart subtotal',
    example: 199999.98,
  })
  subtotal: number;

  @ApiProperty({
    description: 'Tax amount',
    example: 35999.99,
  })
  tax: number;

  @ApiProperty({
    description: 'Shipping cost',
    example: 0,
  })
  shipping: number;

  @ApiProperty({
    description: 'Discount amount',
    example: 19999.99,
  })
  discount: number;

  @ApiProperty({
    description: 'Total amount',
    example: 215999.98,
  })
  total: number;

  @ApiProperty({
    description: 'Currency',
    example: 'INR',
  })
  currency: string;

  @ApiPropertyOptional({
    description: 'Applied coupon codes',
    example: ['SAVE10', 'FREESHIP'],
    type: [String],
  })
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
    description: 'Cart expiration date',
    example: '2024-12-31T23:59:59.000Z',
  })
  expiresAt?: Date;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { source: 'web', device: 'desktop' },
  })
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Cart items',
    type: [CartItemResponseDto],
  })
  items: CartItemResponseDto[];

  @ApiProperty({
    description: 'Total number of items in cart',
    example: 2,
  })
  itemCount: number;

  @ApiProperty({
    description: 'Whether the cart is expired',
    example: false,
  })
  isExpired: boolean;

  @ApiProperty({
    description: 'Whether the cart is empty',
    example: false,
  })
  isEmpty: boolean;

  @ApiProperty({
    description: 'Cart creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Cart last update date',
    example: '2024-01-01T12:00:00.000Z',
  })
  updatedAt: Date;
}
