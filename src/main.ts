import * as process from 'node:process';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: false,
    rawBody: true,
  });

  await setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
