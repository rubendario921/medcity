import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { ResponseExceptionFilter } from './shared/filters/response-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());
  //Filters
  app.useGlobalFilters(new ResponseExceptionFilter());

  // Config Swagger
  const config = new DocumentBuilder()
    .setTitle('MedCity API')
    .setDescription('The MedCity API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Deploy
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
