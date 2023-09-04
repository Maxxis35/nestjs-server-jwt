import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({credentials: true, origin: true});
  app.use(cookieParser());

  const config = new DocumentBuilder()
      .setTitle('Concerts ConcertAppServer API')
      .setVersion('0.1')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    }
  });

  await app.listen(process.env.PORT || 5000, ()=> console.log(`Server started on port:${process.env.PORT}`));
}
bootstrap();
