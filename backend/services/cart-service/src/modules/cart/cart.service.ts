/**
 * @fileoverview Cart service for managing shopping cart operations
 * Handles cart business logic, calculations, and data persistence
 */

import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Cart, CartItem, CartStatus } from '@techpotli/database';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CartResponseDto } from './dto/cart-response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async createCart(createCartDto: CreateCartDto, userId: string): Promise<CartResponseDto> {
    this.logger.log(`Creating cart for user: ${userId}`);

    // Check if user already has an active cart
    const existingCart = await this.cartRepository.findOne({
      where: { userId, status: CartStatus.ACTIVE },
      relations: ['items'],
    });

    if (existingCart) {
      this.logger.log(`User ${userId} already has an active cart: ${existingCart.id}`);
      return this.mapToResponseDto(existingCart);
    }

    // Create new cart
    const cart = this.cartRepository.create({
      ...createCartDto,
      userId,
      status: CartStatus.ACTIVE,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    const savedCart = await this.cartRepository.save(cart);
    
    // Cache the cart
    await this.cacheCart(savedCart);
    
    this.logger.log(`Cart created successfully: ${savedCart.id}`);
    return this.mapToResponseDto(savedCart);
  }

  async getUserCart(userId: string): Promise<CartResponseDto> {
    this.logger.log(`Getting cart for user: ${userId}`);

    // Try to get from cache first
    const cachedCart = await this.getCachedCart(userId);
    if (cachedCart) {
      return cachedCart;
    }

    // Get from database
    const cart = await this.cartRepository.findOne({
      where: { userId, status: CartStatus.ACTIVE },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`No active cart found for user: ${userId}`);
    }

    // Cache the cart
    await this.cacheCart(cart);
    
    return this.mapToResponseDto(cart);
  }

  async getCartHistory(userId: string, paginationDto: PaginationDto): Promise<CartResponseDto[]> {
    this.logger.log(`Getting cart history for user: ${userId}`);

    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const carts = await this.cartRepository.find({
      where: { userId },
      relations: ['items'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return carts.map(cart => this.mapToResponseDto(cart));
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto, userId: string): Promise<CartResponseDto> {
    this.logger.log(`Updating cart: ${id} for user: ${userId}`);

    const cart = await this.validateCartOwnership(id, userId);
    
    // Update cart fields
    Object.assign(cart, updateCartDto);
    
    const updatedCart = await this.cartRepository.save(cart);
    
    // Update cache
    await this.cacheCart(updatedCart);
    
    this.logger.log(`Cart updated successfully: ${id}`);
    return this.mapToResponseDto(updatedCart);
  }

  async deleteCart(id: string, userId: string): Promise<void> {
    this.logger.log(`Deleting cart: ${id} for user: ${userId}`);

    const cart = await this.validateCartOwnership(id, userId);
    
    // Soft delete cart and items
    await this.cartItemRepository.softDelete({ cartId: id });
    await this.cartRepository.softDelete(id);
    
    // Remove from cache
    await this.removeCachedCart(userId);
    
    this.logger.log(`Cart deleted successfully: ${id}`);
  }

  async addItem(cartId: string, addItemDto: AddItemDto, userId: string): Promise<CartResponseDto> {
    this.logger.log(`Adding item to cart: ${cartId} for user: ${userId}`);

    const cart = await this.validateCartOwnership(cartId, userId);
    
    // Check if item already exists in cart
    const existingItem = await this.cartItemRepository.findOne({
      where: { cartId, productId: addItemDto.productId },
    });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += addItemDto.quantity;
      existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      // Create new item
      const cartItem = this.cartItemRepository.create({
        ...addItemDto,
        cartId,
        userId,
        totalPrice: addItemDto.unitPrice * addItemDto.quantity,
      });
      await this.cartItemRepository.save(cartItem);
    }

    // Recalculate cart totals
    const updatedCart = await this.calculateCartTotals(cartId);
    
    // Update cache
    await this.cacheCart(updatedCart);
    
    this.logger.log(`Item added successfully to cart: ${cartId}`);
    return this.mapToResponseDto(updatedCart);
  }

  async updateItem(cartId: string, itemId: string, updateItemDto: UpdateItemDto, userId: string): Promise<CartResponseDto> {
    this.logger.log(`Updating item: ${itemId} in cart: ${cartId} for user: ${userId}`);

    await this.validateCartOwnership(cartId, userId);
    
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, cartId },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item not found: ${itemId}`);
    }

    // Update item
    Object.assign(cartItem, updateItemDto);
    cartItem.totalPrice = cartItem.unitPrice * cartItem.quantity;
    
    await this.cartItemRepository.save(cartItem);

    // Recalculate cart totals
    const updatedCart = await this.calculateCartTotals(cartId);
    
    // Update cache
    await this.cacheCart(updatedCart);
    
    this.logger.log(`Item updated successfully: ${itemId}`);
    return this.mapToResponseDto(updatedCart);
  }

  async removeItem(cartId: string, itemId: string, userId: string): Promise<void> {
    this.logger.log(`Removing item: ${itemId} from cart: ${cartId} for user: ${userId}`);

    await this.validateCartOwnership(cartId, userId);
    
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: itemId, cartId },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item not found: ${itemId}`);
    }

    // Remove item
    await this.cartItemRepository.softDelete(itemId);

    // Recalculate cart totals
    await this.calculateCartTotals(cartId);
    
    this.logger.log(`Item removed successfully: ${itemId}`);
  }

  async clearCart(cartId: string, userId: string): Promise<CartResponseDto> {
    this.logger.log(`Clearing cart: ${cartId} for user: ${userId}`);

    const cart = await this.validateCartOwnership(cartId, userId);
    
    // Remove all items
    await this.cartItemRepository.softDelete({ cartId });
    
    // Reset cart totals
    cart.subtotal = 0;
    cart.tax = 0;
    cart.shipping = 0;
    cart.discount = 0;
    cart.total = 0;
    
    const updatedCart = await this.cartRepository.save(cart);
    
    // Update cache
    await this.cacheCart(updatedCart);
    
    this.logger.log(`Cart cleared successfully: ${cartId}`);
    return this.mapToResponseDto(updatedCart);
  }

  async mergeCart(cartId: string, sessionId: string, userId: string): Promise<CartResponseDto> {
    this.logger.log(`Merging cart: ${cartId} with session: ${sessionId} for user: ${userId}`);

    const userCart = await this.validateCartOwnership(cartId, userId);
    
    // Find guest cart by session ID
    const guestCart = await this.cartRepository.findOne({
      where: { sessionId, status: CartStatus.ACTIVE },
      relations: ['items'],
    });

    if (!guestCart) {
      throw new NotFoundException(`Guest cart not found for session: ${sessionId}`);
    }

    // Merge items from guest cart to user cart
    for (const guestItem of guestCart.items) {
      const existingItem = await this.cartItemRepository.findOne({
        where: { cartId, productId: guestItem.productId },
      });

      if (existingItem) {
        // Update quantity
        existingItem.quantity += guestItem.quantity;
        existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;
        await this.cartItemRepository.save(existingItem);
      } else {
        // Create new item
        const cartItem = this.cartItemRepository.create({
          ...guestItem,
          cartId,
          userId,
        });
        await this.cartItemRepository.save(cartItem);
      }
    }

    // Mark guest cart as merged
    guestCart.status = CartStatus.MERGED;
    await this.cartRepository.save(guestCart);

    // Recalculate user cart totals
    const updatedCart = await this.calculateCartTotals(cartId);
    
    // Update cache
    await this.cacheCart(updatedCart);
    
    this.logger.log(`Carts merged successfully`);
    return this.mapToResponseDto(updatedCart);
  }

  async calculateCart(cartId: string, userId: string): Promise<CartResponseDto> {
    this.logger.log(`Calculating totals for cart: ${cartId} for user: ${userId}`);

    const cart = await this.validateCartOwnership(cartId, userId);
    
    const updatedCart = await this.calculateCartTotals(cartId);
    
    // Update cache
    await this.cacheCart(updatedCart);
    
    return this.mapToResponseDto(updatedCart);
  }

  private async validateCartOwnership(cartId: string, userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId, userId },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart not found: ${cartId}`);
    }

    return cart;
  }

  private async calculateCartTotals(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });

    if (!cart) {
      throw new NotFoundException(`Cart not found: ${cartId}`);
    }

    // Calculate subtotal
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Calculate tax (example: 18% GST)
    cart.tax = cart.subtotal * 0.18;
    
    // Calculate shipping (example: free shipping above 1000, else 100)
    cart.shipping = cart.subtotal >= 1000 ? 0 : 100;
    
    // Calculate discount (example: 10% off above 2000)
    cart.discount = cart.subtotal >= 2000 ? cart.subtotal * 0.1 : 0;
    
    // Calculate total
    cart.total = cart.subtotal + cart.tax + cart.shipping - cart.discount;

    return await this.cartRepository.save(cart);
  }

  private async cacheCart(cart: Cart): Promise<void> {
    const cacheKey = `cart:${cart.userId}`;
    await this.cacheManager.set(cacheKey, this.mapToResponseDto(cart), 3600); // 1 hour
  }

  private async getCachedCart(userId: string): Promise<CartResponseDto | null> {
    const cacheKey = `cart:${userId}`;
    return await this.cacheManager.get<CartResponseDto>(cacheKey);
  }

  private async removeCachedCart(userId: string): Promise<void> {
    const cacheKey = `cart:${userId}`;
    await this.cacheManager.del(cacheKey);
  }

  private mapToResponseDto(cart: Cart): CartResponseDto {
    return {
      id: cart.id,
      userId: cart.userId,
      sessionId: cart.sessionId,
      status: cart.status,
      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      discount: cart.discount,
      total: cart.total,
      currency: cart.currency,
      appliedCoupons: cart.appliedCoupons,
      shippingAddress: cart.shippingAddress,
      expiresAt: cart.expiresAt,
      metadata: cart.metadata,
      items: cart.items?.map(item => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        image: item.image,
        attributes: item.attributes,
        metadata: item.metadata,
      })) || [],
      itemCount: cart.items?.length || 0,
      isExpired: cart.isExpired,
      isEmpty: cart.isEmpty,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }
}
