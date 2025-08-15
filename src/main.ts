import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/utils';
import { WinstonModule } from 'nest-winston';
import { logger } from './utils/logging/logger.middleware';
import { setupLogger } from './utils/logging/logger';

async function bootstrap(): Promise<void> {
  const appName = 'nestjs-boilerplate';
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(setupLogger(appName)),
  });
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(logger);
  setupSwagger(app);
  await app.listen(3002);
}

// Handle the promise properly
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
