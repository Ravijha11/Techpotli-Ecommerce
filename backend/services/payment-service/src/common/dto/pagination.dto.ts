import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max, IsEnum, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'DESC',
    enum: SortOrder,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional({
    description: 'Search query',
    example: 'payment',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by status',
    example: 'completed',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Filter by date range (start)',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Filter by date range (end)',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Filter by amount range (minimum)',
    example: 100,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minAmount?: number;

  @ApiPropertyOptional({
    description: 'Filter by amount range (maximum)',
    example: 1000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxAmount?: number;

  @ApiPropertyOptional({
    description: 'Filter by payment method',
    example: 'credit_card',
  })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({
    description: 'Filter by currency',
    example: 'INR',
  })
  @IsOptional()
  @IsString()
  currency?: string;

  /**
   * Calculate the number of items to skip for pagination
   */
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  /**
   * Get the number of items to take
   */
  get take(): number {
    return this.limit;
  }

  /**
   * Get the offset for database queries
   */
  get offset(): number {
    return this.skip;
  }

  /**
   * Get the limit for database queries
   */
  get limitValue(): number {
    return this.take;
  }

  /**
   * Get the sort configuration for database queries
   */
  get sortConfig(): { [key: string]: SortOrder } | undefined {
    if (!this.sortBy) return undefined;
    
    return {
      [this.sortBy]: this.sortOrder,
    };
  }

  /**
   * Get the date range filter
   */
  get dateRange(): { startDate?: Date; endDate?: Date } | undefined {
    if (!this.startDate && !this.endDate) return undefined;

    return {
      startDate: this.startDate ? new Date(this.startDate) : undefined,
      endDate: this.endDate ? new Date(this.endDate) : undefined,
    };
  }

  /**
   * Get the amount range filter
   */
  get amountRange(): { minAmount?: number; maxAmount?: number } | undefined {
    if (this.minAmount === undefined && this.maxAmount === undefined) return undefined;

    return {
      minAmount: this.minAmount,
      maxAmount: this.maxAmount,
    };
  }

  /**
   * Validate date range
   */
  validateDateRange(): boolean {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return start <= end;
    }
    return true;
  }

  /**
   * Validate amount range
   */
  validateAmountRange(): boolean {
    if (this.minAmount !== undefined && this.maxAmount !== undefined) {
      return this.minAmount <= this.maxAmount;
    }
    return true;
  }
}
