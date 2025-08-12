import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

// Interceptors
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

// Filters
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ValidationFilter } from './filters/validation.filter';

// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ThrottlerGuard } from './guards/throttler.guard';

// Decorators
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';

// Utilities
import { ValidationService } from './services/validation.service';
import { EncryptionService } from './services/encryption.service';
import { NotificationService } from './services/notification.service';

// DTOs
import { PaginationDto } from './dto/pagination.dto';
import { ApiResponseDto } from './dto/api-response.dto';
import { ErrorResponseDto } from './dto/error-response.dto';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    CacheModule.register({
      ttl: 300, // 5 minutes
      max: 1000,
    }),
  ],
  providers: [
    // Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },

    // Filters
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },

    // Guards
    JwtAuthGuard,
    RolesGuard,
    ThrottlerGuard,

    // Services
    ValidationService,
    EncryptionService,
    NotificationService,
  ],
  exports: [
    // Guards
    JwtAuthGuard,
    RolesGuard,
    ThrottlerGuard,

    // Services
    ValidationService,
    EncryptionService,
    NotificationService,

    // DTOs
    PaginationDto,
    ApiResponseDto,
    ErrorResponseDto,
  ],
})
export class CommonModule {}
