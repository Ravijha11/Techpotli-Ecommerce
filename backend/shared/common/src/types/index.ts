/**
 * @fileoverview Common TypeScript types and interfaces used across all services
 */

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Pagination interfaces
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: Date;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId: string;
}

// User related types
export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SELLER = 'seller',
  MODERATOR = 'moderator'
}

// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  sku: string;
  categoryId: string;
  brandId?: string;
  isActive: boolean;
  stockQuantity: number;
  images: string[];
  attributes: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Order related types
export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

// Address types
export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Payment types
export interface PaymentMethod {
  id: string;
  type: PaymentType;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export enum PaymentType {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  UPI = 'upi',
  NET_BANKING = 'net_banking',
  WALLET = 'wallet',
  CASH_ON_DELIVERY = 'cash_on_delivery'
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

export enum NotificationType {
  ORDER_UPDATE = 'order_update',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILURE = 'payment_failure',
  SHIPPING_UPDATE = 'shipping_update',
  PROMOTIONAL = 'promotional',
  SECURITY = 'security'
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  availability?: boolean;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// Event types for Kafka
export interface BaseEvent {
  id: string;
  type: string;
  version: string;
  timestamp: Date;
  source: string;
  data: any;
  metadata?: Record<string, any>;
}

export interface OrderCreatedEvent extends BaseEvent {
  type: 'order.created';
  data: {
    orderId: string;
    userId: string;
    orderNumber: string;
    total: number;
    currency: string;
  };
}

export interface InventoryUpdatedEvent extends BaseEvent {
  type: 'inventory.updated';
  data: {
    productId: string;
    oldQuantity: number;
    newQuantity: number;
    change: number;
  };
}

export interface PaymentCompletedEvent extends BaseEvent {
  type: 'payment.completed';
  data: {
    orderId: string;
    paymentId: string;
    amount: number;
    currency: string;
    method: string;
  };
}

// Cache key types
export interface CacheKey {
  service: string;
  resource: string;
  identifier: string;
  version?: string;
}

// Rate limiting types
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: any) => string;
}

// Health check types
export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: Date;
  checks: {
    [key: string]: {
      status: 'healthy' | 'unhealthy';
      message?: string;
      details?: any;
    };
  };
  version: string;
  uptime: number;
}
