import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Connexa API')
    .setDescription('Connexa API description')
    .setVersion('1.0')
    .addTag('connexa')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
