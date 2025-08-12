/**
 * @fileoverview Authentication service for User Service
 * Handles user authentication, JWT token generation, and security operations
 */

import { Injectable, UnauthorizedException, BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Entities
import { User } from '@techpotli/database';

// DTOs
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';

// Types
import { JwtPayload, AuthResponse, TokenPair } from './types/auth.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    
    @InjectQueue('email-verification')
    private readonly emailVerificationQueue: Queue,
    
    @InjectQueue('password-reset')
    private readonly passwordResetQueue: Queue,
    
    @InjectQueue('phone-verification')
    private readonly phoneVerificationQueue: Queue,
  ) {}

  /**
   * User registration
   */
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: [
          { email: registerDto.email },
          ...(registerDto.phone ? [{ phone: registerDto.phone }] : []),
        ],
      });

      if (existingUser) {
        if (existingUser.email === registerDto.email) {
          throw new ConflictException('User with this email already exists');
        }
        if (registerDto.phone && existingUser.phone === registerDto.phone) {
          throw new ConflictException('User with this phone number already exists');
        }
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

      // Generate verification tokens
      const emailVerificationToken = uuidv4();
      const phoneVerificationToken = registerDto.phone ? uuidv4() : null;

      // Create user
      const user = this.userRepository.create({
        ...registerDto,
        passwordHash: hashedPassword,
        emailVerificationToken,
        emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        phoneVerificationToken,
        phoneVerificationExpires: registerDto.phone ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null,
        isEmailVerified: false,
        isPhoneVerified: !registerDto.phone, // If no phone, consider it verified
        role: 'user',
        isActive: true,
      });

      // Save user
      const savedUser = await this.userRepository.save(user);

      // Generate tokens
      const tokens = await this.generateTokenPair(savedUser);

      // Queue verification emails/SMS
      if (registerDto.email) {
        await this.emailVerificationQueue.add('send-verification', {
          userId: savedUser.id,
          email: savedUser.email,
          token: emailVerificationToken,
        });
      }

      if (registerDto.phone) {
        await this.phoneVerificationQueue.add('send-verification', {
          userId: savedUser.id,
          phone: savedUser.phone,
          token: phoneVerificationToken,
        });
      }

      // Store refresh token in cache
      await this.cacheManager.set(
        `refresh_token:${savedUser.id}`,
        tokens.refreshToken,
        7 * 24 * 60 * 60 * 1000 // 7 days
      );

      this.logger.log(`User registered successfully: ${savedUser.email}`);

      return {
        user: this.sanitizeUser(savedUser),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        message: 'User registered successfully. Please verify your email and phone number.',
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * User login
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      // Find user by email or phone
      const user = await this.userRepository.findOne({
        where: [
          { email: loginDto.emailOrPhone },
          { phone: loginDto.emailOrPhone },
        ],
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Account is deactivated');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Check if account is locked due to too many failed attempts
      const failedAttemptsKey = `login_attempts:${user.id}`;
      const failedAttempts = await this.cacheManager.get<number>(failedAttemptsKey) || 0;

      if (failedAttempts >= 5) {
        const lockExpiry = await this.cacheManager.get<number>(`account_lock:${user.id}`);
        if (lockExpiry && Date.now() < lockExpiry) {
          const remainingTime = Math.ceil((lockExpiry - Date.now()) / 1000 / 60);
          throw new UnauthorizedException(`Account is temporarily locked. Try again in ${remainingTime} minutes.`);
        } else {
          // Reset failed attempts if lock has expired
          await this.cacheManager.del(failedAttemptsKey);
          await this.cacheManager.del(`account_lock:${user.id}`);
        }
      }

      // Generate tokens
      const tokens = await this.generateTokenPair(user);

      // Store refresh token in cache
      await this.cacheManager.set(
        `refresh_token:${user.id}`,
        tokens.refreshToken,
        7 * 24 * 60 * 60 * 1000 // 7 days
      );

      // Update last login
      await this.userRepository.update(user.id, {
        lastLoginAt: new Date(),
        lastLoginIp: loginDto.ipAddress,
        lastLoginUserAgent: loginDto.userAgent,
      });

      // Clear failed login attempts
      await this.cacheManager.del(failedAttemptsKey);

      this.logger.log(`User logged in successfully: ${user.email}`);

      return {
        user: this.sanitizeUser(user),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        message: 'Login successful',
      };
    } catch (error) {
      // Increment failed login attempts
      if (error instanceof UnauthorizedException) {
        const user = await this.userRepository.findOne({
          where: [
            { email: loginDto.emailOrPhone },
            { phone: loginDto.emailOrPhone },
          ],
        });

        if (user) {
          const failedAttemptsKey = `login_attempts:${user.id}`;
          const failedAttempts = (await this.cacheManager.get<number>(failedAttemptsKey) || 0) + 1;
          
          await this.cacheManager.set(failedAttemptsKey, failedAttempts, 15 * 60 * 1000); // 15 minutes

          // Lock account after 5 failed attempts
          if (failedAttempts >= 5) {
            const lockDuration = 15 * 60 * 1000; // 15 minutes
            await this.cacheManager.set(
              `account_lock:${user.id}`,
              Date.now() + lockDuration,
              lockDuration
            );
          }
        }
      }

      this.logger.error(`Login failed for ${loginDto.emailOrPhone}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{ accessToken: string }> {
    try {
      // Verify refresh token
      const payload = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET'),
      });

      // Check if refresh token exists in cache
      const cachedToken = await this.cacheManager.get<string>(`refresh_token:${payload.sub}`);
      if (!cachedToken || cachedToken !== refreshTokenDto.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Get user
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });
      if (!user || !user.isActive) {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Generate new access token
      const accessToken = await this.generateAccessToken(user);

      this.logger.log(`Token refreshed for user: ${user.email}`);

      return { accessToken };
    } catch (error) {
      this.logger.error(`Token refresh failed: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Forgot password
   */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: [
          { email: forgotPasswordDto.emailOrPhone },
          { phone: forgotPasswordDto.emailOrPhone },
        ],
      });

      if (!user) {
        // Don't reveal if user exists or not for security
        return { message: 'If an account exists, a password reset link has been sent.' };
      }

      // Generate reset token
      const resetToken = uuidv4();
      const resetExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

      // Update user
      await this.userRepository.update(user.id, {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      });

      // Queue password reset email/SMS
      if (user.email) {
        await this.passwordResetQueue.add('send-reset-email', {
          userId: user.id,
          email: user.email,
          token: resetToken,
        });
      }

      if (user.phone) {
        await this.passwordResetQueue.add('send-reset-sms', {
          userId: user.id,
          phone: user.phone,
          token: resetToken,
        });
      }

      this.logger.log(`Password reset requested for user: ${user.email || user.phone}`);

      return { message: 'If an account exists, a password reset link has been sent.' };
    } catch (error) {
      this.logger.error(`Forgot password failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    try {
      // Find user by reset token
      const user = await this.userRepository.findOne({
        where: {
          passwordResetToken: resetPasswordDto.token,
          passwordResetExpires: new Date(),
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid or expired reset token');
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, saltRounds);

      // Update user
      await this.userRepository.update(user.id, {
        passwordHash: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      });

      // Invalidate all refresh tokens
      await this.cacheManager.del(`refresh_token:${user.id}`);

      this.logger.log(`Password reset successful for user: ${user.email || user.phone}`);

      return { message: 'Password reset successful' };
    } catch (error) {
      this.logger.error(`Password reset failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{ message: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          emailVerificationToken: verifyEmailDto.token,
          emailVerificationExpires: new Date(),
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid or expired verification token');
      }

      // Update user
      await this.userRepository.update(user.id, {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      });

      this.logger.log(`Email verified for user: ${user.email}`);

      return { message: 'Email verified successfully' };
    } catch (error) {
      this.logger.error(`Email verification failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify phone
   */
  async verifyPhone(verifyPhoneDto: VerifyPhoneDto): Promise<{ message: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          phoneVerificationToken: verifyPhoneDto.token,
          phoneVerificationExpires: new Date(),
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid or expired verification token');
      }

      // Update user
      await this.userRepository.update(user.id, {
        isPhoneVerified: true,
        phoneVerificationToken: null,
        phoneVerificationExpires: null,
      });

      this.logger.log(`Phone verified for user: ${user.phone}`);

      return { message: 'Phone number verified successfully' };
    } catch (error) {
      this.logger.error(`Phone verification failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(userId: string): Promise<{ message: string }> {
    try {
      // Remove refresh token from cache
      await this.cacheManager.del(`refresh_token:${userId}`);

      this.logger.log(`User logged out: ${userId}`);

      return { message: 'Logout successful' };
    } catch (error) {
      this.logger.error(`Logout failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validate user by ID
   */
  async validateUserById(userId: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: { id: userId, isActive: true },
      });
    } catch (error) {
      this.logger.error(`User validation failed: ${error.message}`);
      return null;
    }
  }

  /**
   * Generate JWT token pair
   */
  private async generateTokenPair(user: User): Promise<TokenPair> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return { accessToken, refreshToken };
  }

  /**
   * Generate access token
   */
  private async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
    };

    return this.jwtService.signAsync(payload);
  }

  /**
   * Generate refresh token
   */
  private async generateRefreshToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });
  }

  /**
   * Sanitize user object (remove sensitive data)
   */
  private sanitizeUser(user: User): Partial<User> {
    const { passwordHash, passwordResetToken, passwordResetExpires, emailVerificationToken, emailVerificationExpires, phoneVerificationToken, phoneVerificationExpires, twoFactorSecret, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
