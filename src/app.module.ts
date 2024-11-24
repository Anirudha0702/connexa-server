import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { JwtModule } from '@nestjs/jwt';
import { VerifyMiddleware } from './common/middlewares/verify.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  getBullMqConfig,
  getMongooseConfig,
  getTypeOrmConfig,
} from './config/database/database.config';
import { MailerConfig } from './config/mail/mail.config';
import { UserModule } from './modules/user/user.module';
import { FollowModule } from './modules/follow/follow.module';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    BullModule.forRootAsync({
      useFactory: getBullMqConfig,
    }),
    MongooseModule.forRootAsync({
      useFactory: getMongooseConfig,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getTypeOrmConfig,
    }),
    MailerModule.forRoot(MailerConfig()),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UserModule,
    FollowModule,
    LikeModule,
    CommentModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // console.log(process.env.REDIS_HOST, process.env.REDIS_PORT);
    consumer
      .apply(VerifyMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/signup', method: RequestMethod.ALL },
        { path: 'auth/verify/:validator', method: RequestMethod.ALL },
        { path: '/', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
