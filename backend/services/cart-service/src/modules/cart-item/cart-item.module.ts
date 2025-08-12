/**
 * @fileoverview Cart Item module for organizing cart item components
 * Configures cart item controller, service, and repository
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from '@techpotli/database';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CartItemModule {}
