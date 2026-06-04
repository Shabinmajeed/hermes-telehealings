// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../config/supabase.service';
import { PrismaService } from '../config/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

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

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({ email, password });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data;
  }

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
}
