import {ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {AuthDto} from "./dto/auth.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) {}

    async logIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if(!user) {
            throw new UnauthorizedException({message: 'Некорректный емаил'});
        }
        const passwordEquals = await bcrypt.compare(pass, user.password);
        if(!passwordEquals) {
            throw new UnauthorizedException({message: 'Некорректный пароль'});
        }

        const authUserDto = new AuthDto(user);
        const tokens = await this.generateTokens({...authUserDto});
        await this.updateRefreshToken(user._id, tokens.refresh_token);
        return {user: authUserDto, tokens};
    }

    async singUp(newUserDto: CreateUserDto): Promise<any> {
        const candidate = await this.usersService.findByEmail(newUserDto.email);
        if(candidate){
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(newUserDto.password, 3)
        const user = await this.usersService.create({...newUserDto, password: hashPassword})

        const authUserDto = new AuthDto(user);
        const tokens = await this.generateTokens({...authUserDto});
        await this.updateRefreshToken(user._id, tokens.refresh_token);
        return {user: authUserDto, tokens};
    }

    async logout (userId: string): Promise<any> {
        return this.usersService.updateRefToken(userId, {refreshToken: null});
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.findOneById(userId);
        if (!user || !user.refreshToken){
            throw new ForbiddenException('Access Denied');
        }
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!refreshTokenMatches) {
            throw new ForbiddenException('Access Denied');
        }

        const authUserDto = new AuthDto(user);
        const tokens = await this.generateTokens({...authUserDto});
        await this.updateRefreshToken(user._id, tokens.refresh_token);
        return {user: authUserDto, tokens};
    }

    private async generateTokens(payload) {
        const access_token = await this.jwtService.signAsync(payload,
            {secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1h'});
        const refresh_token = await this.jwtService.signAsync(payload,
            {secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1h'});
        return {access_token, refresh_token}
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 5);
        await this.usersService.updateRefToken(userId, {refreshToken: hashedRefreshToken});
    }
}
