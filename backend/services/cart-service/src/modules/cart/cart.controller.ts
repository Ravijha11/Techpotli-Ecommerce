/**
 * @fileoverview Cart controller for managing shopping cart operations
 * Handles cart creation, updates, deletion, and item management
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CartResponseDto } from './dto/cart-response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({
    status: 201,
    description: 'Cart created successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createCart(
    @Body() createCartDto: CreateCartDto,
    @Request() req: any,
  ): Promise<CartResponseDto> {
    this.logger.log(`Creating cart for user: ${req.user.id}`);
    return this.cartService.createCart(createCartDto, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart retrieved successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async getUserCart(@Request() req: any): Promise<CartResponseDto> {
    this.logger.log(`Getting cart for user: ${req.user.id}`);
    return this.cartService.getUserCart(req.user.id);
  }

  @Get('history')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get user cart history' })
  @ApiResponse({
    status: 200,
    description: 'Cart history retrieved successfully',
    type: [CartResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getCartHistory(
    @Request() req: any,
    @Query() paginationDto: PaginationDto,
  ): Promise<CartResponseDto[]> {
    this.logger.log(`Getting cart history for user: ${req.user.id}`);
    return this.cartService.getCartHistory(req.user.id, paginationDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart updated successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async updateCart(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @Request() req: any,
  ): Promise<CartResponseDto> {
    this.logger.log(`Updating cart: ${id} for user: ${req.user.id}`);
    return this.cartService.updateCart(id, updateCartDto, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({ status: 204, description: 'Cart deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async deleteCart(
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<void> {
    this.logger.log(`Deleting cart: ${id} for user: ${req.user.id}`);
    return this.cartService.deleteCart(id, req.user.id);
  }

  @Post(':id/items')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 201,
    description: 'Item added successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async addItem(
    @Param('id') cartId: string,
    @Body() addItemDto: AddItemDto,
    @Request() req: any,
  ): Promise<CartResponseDto> {
    this.logger.log(`Adding item to cart: ${cartId} for user: ${req.user.id}`);
    return this.cartService.addItem(cartId, addItemDto, req.user.id);
  }

  @Put(':id/items/:itemId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update cart item' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiParam({ name: 'itemId', description: 'Cart item ID' })
  @ApiResponse({
    status: 200,
    description: 'Item updated successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart or item not found' })
  async updateItem(
    @Param('id') cartId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
    @Request() req: any,
  ): Promise<CartResponseDto> {
    this.logger.log(`Updating item: ${itemId} in cart: ${cartId} for user: ${req.user.id}`);
    return this.cartService.updateItem(cartId, itemId, updateItemDto, req.user.id);
  }

  @Delete(':id/items/:itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiParam({ name: 'itemId', description: 'Cart item ID' })
  @ApiResponse({ status: 204, description: 'Item removed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart or item not found' })
  async removeItem(
    @Param('id') cartId: string,
    @Param('itemId') itemId: string,
    @Request() req: any,
  ): Promise<void> {
    this.logger.log(`Removing item: ${itemId} from cart: ${cartId} for user: ${req.user.id}`);
    return this.cartService.removeItem(cartId, itemId, req.user.id);
  }

  @Post(':id/clear')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Clear all items from cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart cleared successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async clearCart(
    @Param('id') cartId: string,
    @Request() req: any,
  ): Promise<CartResponseDto> {
    this.logger.log(`Clearing cart: ${cartId} for user: ${req.user.id}`);
    return this.cartService.clearCart(cartId, req.user.id);
  }

  @Post(':id/merge')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Merge guest cart with user cart' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'Carts merged successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async mergeCart(
    @Param('id') cartId: string,
    @Body() body: { sessionId: string },
    @Request() req: any,
  ): Promise<CartResponseDto> {
    this.logger.log(`Merging cart: ${cartId} with session: ${body.sessionId} for user: ${req.user.id}`);
    return this.cartService.mergeCart(cartId, body.sessionId, req.user.id);
  }

  @Get(':id/calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate cart totals' })
  @ApiParam({ name: 'id', description: 'Cart ID' })
  @ApiResponse({
    status: 200,
    description: 'Cart totals calculated successfully',
    type: CartResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async calculateCart(
    @Param('id') cartId: string,
    @Request() req: any,
  ): Promise<CartResponseDto> {
    this.logger.log(`Calculating totals for cart: ${cartId} for user: ${req.user.id}`);
    return this.cartService.calculateCart(cartId, req.user.id);
  }
}
