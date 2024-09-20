import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './config/global-exception/prisma-client-exception/prisma-client-exception.filter';
import { instance } from './config/logger/winston.logger';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,

    // Enable Winston Logging
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // You will use this interceptor to remove the password field from the response object.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Auth JWT')
    .setDescription('The Auth JWT API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger-ui/', app, document);

  // Error handling Prisma
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}

bootstrap();
