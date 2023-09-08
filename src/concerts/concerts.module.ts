import {forwardRef, Module} from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Concert, ConcertSchema} from "./concert.schema";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [MongooseModule.forFeature([
    {name: Concert.name, schema: ConcertSchema},
  ]), forwardRef(()=> AuthModule)],
  controllers: [ConcertsController],
  providers: [ConcertsService],
  exports: [ConcertsService]
})
export class ConcertsModule {}
