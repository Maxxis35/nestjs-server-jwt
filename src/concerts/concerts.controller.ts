import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import {CreateConcertDto} from "./dto/create-concert.dto";
import {Concert} from "./concert.schema";
import {UpdateConcertDto} from "./dto/update-concert.dtp";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AccessTokenGuard} from "../auth/guard/accessToken.guard";

@Controller('concerts')
@ApiTags('Concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}


  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createConcertDto: CreateConcertDto): Promise<Concert> {
    return this.concertsService.create(createConcertDto);
  }


  @ApiOperation({summary: 'Getting a list of concerts'})
  @ApiResponse({status: 200, type: [Concert]})
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(): Promise<Concert[]> {
    return this.concertsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Concert> {
    return this.concertsService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConcertDto: UpdateConcertDto): Promise<Concert> {
    return this.concertsService.update(id, updateConcertDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertsService.remove(id);
  }
}
