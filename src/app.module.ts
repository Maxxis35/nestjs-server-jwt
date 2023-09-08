import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConcertsModule } from './concerts/concerts.module';

@Module({
  imports: [ConfigModule.forRoot(),
      MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`),
      UsersModule,
      AuthModule,
      ConcertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
