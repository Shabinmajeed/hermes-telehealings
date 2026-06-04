// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { validateConfig } from './config/config.validation';
import { PrismaModule } from './config/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TherapistsModule } from './therapists/therapists.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SessionsModule } from './sessions/sessions.module';
import { ChatModule } from './chat/chat.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { AdminModule } from './admin/admin.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
      envFilePath: ['.env', '.env.local'],
    }),
    TerminusModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    TherapistsModule,
    AppointmentsModule,
    SessionsModule,
    ChatModule,
    PaymentsModule,
    ChatbotModule,
    AdminModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
