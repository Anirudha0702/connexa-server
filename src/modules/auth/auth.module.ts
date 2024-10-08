import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bullmq';
import { VerificationEmailProducer } from './jobs/verification-email.producer';
import { VerificationEmailConsumer } from './jobs/verification-email.consumer';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    VerificationEmailProducer,
    VerificationEmailConsumer,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
