/**
 * @fileoverview User entity for TechPotli backend services
 * Defines the user table structure and relationships
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { generateId } from '@techpotli/common';

@Entity('users')
@Index(['email'], { unique: true })
@Index(['phone'], { unique: true, sparse: true })
@Index(['isActive'])
@Index(['role'])
@Index(['createdAt'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'enum', enum: ['user', 'admin', 'seller', 'moderator'], default: 'user' })
  role: 'user' | 'admin' | 'seller' | 'moderator';

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isPhoneVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isTwoFactorEnabled: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  twoFactorSecret?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  passwordHash?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  passwordResetToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  emailVerificationToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerificationExpires?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  phoneVerificationToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  phoneVerificationExpires?: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt?: Date;

  @Column({ type: 'varchar', length: 45, nullable: true })
  lastLoginIp?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastLoginUserAgent?: string;

  @Column({ type: 'json', nullable: true })
  preferences?: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Virtual properties
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isVerified(): boolean {
    return this.isEmailVerified && this.isPhoneVerified;
  }

  // Lifecycle hooks
  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = generateId();
    }
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
