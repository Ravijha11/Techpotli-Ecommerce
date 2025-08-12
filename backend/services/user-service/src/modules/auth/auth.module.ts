/**
 * @fileoverview Authentication module for User Service
 * Handles user authentication, JWT tokens, and security
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';

// Entities
import { User } from '@techpotli/database';

// Services
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

// Controllers
import { AuthController } from './auth.controller';

// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/roles.guard';

// DTOs
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';

// Jobs
import { EmailVerificationProcessor } from './jobs/email-verification.processor';
import { PasswordResetProcessor } from './jobs/password-reset.processor';
import { PhoneVerificationProcessor } from './jobs/phone-verification.processor';

@Module({
  imports: [
    // Database
    TypeOrmModule.forFeature([User]),
    
    // Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    // JWT Configuration
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '15m'),
          issuer: 'techpotli-user-service',
          audience: 'techpotli-users',
        },
      }),
      inject: [ConfigService],
    }),
    
    // Cache for rate limiting and token storage
    CacheModule.register(),
    
    // Background jobs
    BullModule.registerQueue(
      {
        name: 'email-verification',
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 50,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      },
      {
        name: 'password-reset',
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 50,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      },
      {
        name: 'phone-verification',
        defaultJobOptions: {
          removeOnComplete: 100,
          removeOnFail: 50,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
        },
      },
    ),
    
    // Rate limiting for auth endpoints
    ThrottlerModule.forRoot([
      {
        name: 'auth',
        ttl: 60000, // 1 minute
        limit: 5, // 5 attempts per minute
      },
      {
        name: 'login',
        ttl: 900000, // 15 minutes
        limit: 3, // 3 attempts per 15 minutes
      },
      {
        name: 'register',
        ttl: 3600000, // 1 hour
        limit: 10, // 10 attempts per hour
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    RefreshTokenStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    RolesGuard,
    EmailVerificationProcessor,
    PasswordResetProcessor,
    PhoneVerificationProcessor,
  ],
  exports: [
    AuthService,
    JwtAuthGuard,
    LocalAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}
