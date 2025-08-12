import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

// Interceptors
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { RateLimitInterceptor } from './interceptors/rate-limit.interceptor';

// Filters
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';

// Pipes
import { ValidationPipe } from './pipes/validation.pipe';
import { ParseIntPipe } from './pipes/parse-int.pipe';
import { ParseFloatPipe } from './pipes/parse-float.pipe';

// Decorators
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { ApiKey } from './decorators/api-key.decorator';

// Services
import { LoggerService } from './services/logger.service';
import { CacheService } from './services/cache.service';
import { QueueService } from './services/queue.service';
import { HttpService } from './services/http.service';
import { ValidationService } from './services/validation.service';
import { SecurityService } from './services/security.service';
import { MetricsService } from './services/metrics.service';

// Utils
import { DateUtils } from './utils/date.utils';
import { StringUtils } from './utils/string.utils';
import { NumberUtils } from './utils/number.utils';
import { ValidationUtils } from './utils/validation.utils';
import { SecurityUtils } from './utils/security.utils';

@Global()
@Module({
  imports: [
    ConfigModule,
    CacheModule,
    BullModule,
    HttpModule,
    JwtModule,
    PassportModule,
  ],
  providers: [
    // Guards
    JwtAuthGuard,
    RolesGuard,
    ThrottlerGuard,
    
    // Interceptors
    LoggingInterceptor,
    TransformInterceptor,
    ErrorInterceptor,
    CacheInterceptor,
    RateLimitInterceptor,
    
    // Filters
    HttpExceptionFilter,
    ValidationExceptionFilter,
    
    // Pipes
    ValidationPipe,
    ParseIntPipe,
    ParseFloatPipe,
    
    // Services
    LoggerService,
    CacheService,
    QueueService,
    HttpService,
    ValidationService,
    SecurityService,
    MetricsService,
    
    // Utils
    DateUtils,
    StringUtils,
    NumberUtils,
    ValidationUtils,
    SecurityUtils,
  ],
  exports: [
    // Guards
    JwtAuthGuard,
    RolesGuard,
    ThrottlerGuard,
    
    // Interceptors
    LoggingInterceptor,
    TransformInterceptor,
    ErrorInterceptor,
    CacheInterceptor,
    RateLimitInterceptor,
    
    // Filters
    HttpExceptionFilter,
    ValidationExceptionFilter,
    
    // Pipes
    ValidationPipe,
    ParseIntPipe,
    ParseFloatPipe,
    
    // Services
    LoggerService,
    CacheService,
    QueueService,
    HttpService,
    ValidationService,
    SecurityService,
    MetricsService,
    
    // Utils
    DateUtils,
    StringUtils,
    NumberUtils,
    ValidationUtils,
    SecurityUtils,
    
    // Decorators
    Roles,
    CurrentUser,
    Public,
    ApiKey,
  ],
})
export class CommonModule {}
