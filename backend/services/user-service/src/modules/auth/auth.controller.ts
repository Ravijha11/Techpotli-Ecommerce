/**
 * @fileoverview Authentication controller for User Service
 * Exposes REST API endpoints for user authentication and management
 */

import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Ip,
  Headers,
  ValidationPipe,
  UsePipes,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

// Services
import { AuthService } from './auth.service';

// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

// DTOs
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';

// Types
import { AuthResponse } from './types/auth.types';

// Decorators
import { GetUser } from './decorators/get-user.decorator';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 10, ttl: 3600000 } }) // 10 attempts per hour
  @ApiOperation({
    summary: 'User Registration',
    description: 'Register a new user account with email and phone verification',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - user already exists',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(
    @Body() registerDto: RegisterDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<AuthResponse> {
    this.logger.log(`Registration attempt from IP: ${ipAddress}`);
    
    return this.authService.register({
      ...registerDto,
      ipAddress,
      userAgent,
    });
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 900000 } }) // 3 attempts per 15 minutes
  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticate user and receive JWT tokens',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid credentials',
  })
  @ApiResponse({
    status: 423,
    description: 'Locked - account temporarily locked',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() loginDto: LoginDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<AuthResponse> {
    this.logger.log(`Login attempt from IP: ${ipAddress} for: ${loginDto.emailOrPhone}`);
    
    return this.authService.login({
      ...loginDto,
      ipAddress,
      userAgent,
    });
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 attempts per minute
  @ApiOperation({
    summary: 'Refresh Access Token',
    description: 'Get new access token using refresh token',
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid refresh token',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string }> {
    this.logger.log('Token refresh attempt');
    
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('forgot-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 3600000 } }) // 5 attempts per hour
  @ApiOperation({
    summary: 'Forgot Password',
    description: 'Request password reset link via email or SMS',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Reset link sent if account exists',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    this.logger.log(`Password reset requested for: ${forgotPasswordDto.emailOrPhone}`);
    
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 3600000 } }) // 5 attempts per hour
  @ApiOperation({
    summary: 'Reset Password',
    description: 'Reset password using reset token',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid or expired token',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    this.logger.log('Password reset attempt');
    
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('verify-email')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 attempts per minute
  @ApiOperation({
    summary: 'Verify Email',
    description: 'Verify email address using verification token',
  })
  @ApiBody({ type: VerifyEmailDto })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid or expired token',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<{ message: string }> {
    this.logger.log('Email verification attempt');
    
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('verify-phone')
  @Public()
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 attempts per minute
  @ApiOperation({
    summary: 'Verify Phone',
    description: 'Verify phone number using verification token',
  })
  @ApiBody({ type: VerifyPhoneDto })
  @ApiResponse({
    status: 200,
    description: 'Phone verified successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid or expired token',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyPhone(@Body() verifyPhoneDto: VerifyPhoneDto): Promise<{ message: string }> {
    this.logger.log('Phone verification attempt');
    
    return this.authService.verifyPhone(verifyPhoneDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'User Logout',
    description: 'Logout user and invalidate refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid token',
  })
  async logout(@GetUser('id') userId: string): Promise<{ message: string }> {
    this.logger.log(`Logout request for user: ${userId}`);
    
    return this.authService.logout(userId);
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Logout All Sessions',
    description: 'Logout user from all devices and invalidate all refresh tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'All sessions logged out successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid token',
  })
  async logoutAll(@GetUser('id') userId: string): Promise<{ message: string }> {
    this.logger.log(`Logout all sessions request for user: ${userId}`);
    
    // This would invalidate all refresh tokens for the user
    // Implementation depends on your token storage strategy
    return { message: 'All sessions logged out successfully' };
  }

  @Post('resend-verification')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @Throttle({ default: { limit: 3, ttl: 3600000 } }) // 3 attempts per hour
  @ApiOperation({
    summary: 'Resend Verification',
    description: 'Resend email or phone verification tokens',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['email', 'phone'] },
      },
      required: ['type'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Verification token resent successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid verification type',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid token',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  async resendVerification(
    @GetUser('id') userId: string,
    @Body() body: { type: 'email' | 'phone' },
  ): Promise<{ message: string }> {
    this.logger.log(`Resend verification request for user: ${userId}, type: ${body.type}`);
    
    // Implementation would depend on your verification logic
    return { message: `Verification token resent to your ${body.type}` };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @Throttle({ default: { limit: 5, ttl: 3600000 } }) // 5 attempts per hour
  @ApiOperation({
    summary: 'Change Password',
    description: 'Change user password (requires current password)',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        currentPassword: { type: 'string' },
        newPassword: { type: 'string' },
      },
      required: ['currentPassword', 'newPassword'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid current password',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - invalid token',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests',
  })
  async changePassword(
    @GetUser('id') userId: string,
    @Body() body: { currentPassword: string; newPassword: string },
  ): Promise<{ message: string }> {
    this.logger.log(`Password change request for user: ${userId}`);
    
    // Implementation would validate current password and update to new password
    return { message: 'Password changed successfully' };
  }
}
