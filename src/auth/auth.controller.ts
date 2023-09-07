import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Request, response} from 'express'
import {AccessTokenGuard} from "./guard/accessToken.guard";
import {RefreshTokenGuard} from "./guard/refreshToken.guard";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(req, @Body() logInDto: CreateUserDto, @Res({passthrough: true}) res,) {
    const tokens = await this.authService.logIn(logInDto.email, logInDto.password);
    res.cookie('refreshToken', tokens.refresh_token,
        {httpOnly: true});
    return tokens;
  }

  @Post('singup')
  async singup(@Body() singUpDto: CreateUserDto, @Res({passthrough: true}) res,) {
    const tokens = await this.authService.singUp(singUpDto)
    res.cookie('refreshToken', tokens.refresh_token,
        { httpOnly: true});
    return tokens;
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request, @Res({passthrough: true}) res,){
    this.authService.logout(req.user['sub']);
    res.clearCookie('refreshToken');
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res({passthrough: true}) res,) {
    const userId = req.user['sub'];
    const refreshToken = req.cookies['refreshToken'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    res.cookie('refreshToken', tokens.refresh_token,
        {httpOnly: true});
    return tokens;
  }


}
