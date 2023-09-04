import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import { Request } from 'express'
import {AccessTokenGuard} from "./guard/accessToken.guard";
import {RefreshTokenGuard} from "./guard/refreshToken.guard";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  logIn(@Body() logInDto: CreateUserDto) {
    return this.authService.logIn(logInDto.email, logInDto.password)
  }

  @Post('singup')
  singup(@Body() singUpDto: CreateUserDto) {
    return this.authService.singUp(singUpDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request, ){
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    console.log('UserID--', userId)
    console.log('Refresh--', refreshToken)
    return this.authService.refreshTokens(userId, refreshToken);
  }


}
