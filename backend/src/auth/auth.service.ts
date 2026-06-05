import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../config/supabase.service';
import { PrismaService } from '../config/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  // Email/password sign-up (full auth flow via Supabase Auth)
  async signUp(email: string, password: string, role: Role = Role.USER) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signUp({ email, password });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    if (data.user) {
      await this.prisma.user.create({
        data: {
          supabaseId: data.user.id,
          email,
          role,
        },
      });
    }

    return data;
  }

  // Email/password sign-in (full auth flow via Supabase Auth)
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({ email, password });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

  // Verify JWT token from Supabase Auth
  async verifyToken(token: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.prisma.user.findUnique({
      where: { supabaseId: data.user.id },
    });

    return user;
  }

  // Admin login via local admins table
  async adminLogin(username: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: admin.id, username: admin.username };
  }
}
