import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {AccessTokenGuard} from "../auth/guard/accessToken.guard";

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiBearerAuth()
  @ApiOperation({summary: 'Getting a list of users'})
  @ApiResponse({status: 200, type: [User]})
  // @UseGuards(AccessTokenGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @ApiBearerAuth()
  @ApiOperation({summary: 'Getting a user by id'})
  @ApiResponse({status: 200, type: User})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Change user with id'})
  @ApiResponse({status: 200, type: User})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Removing a user from id'})
  @ApiResponse({status: 200, type: User})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @Get('email')
  // findByEmail(@Param('email') email: string): Promise<User> {
  //   return this.usersService.findByEmail(email);
  // }
}

