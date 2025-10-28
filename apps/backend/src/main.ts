import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({ origin: true });

  const logger = new Logger('App');

  const PORT = process.env.PORT ?? 5002;

  await app.listen(PORT, () => {
    logger.log(`Server successfully started on port ${PORT}`);
  });
}
bootstrap();
