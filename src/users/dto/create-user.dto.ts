import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Vasya', description: 'First name'})
    readonly firstName: string;
    @ApiProperty({example: 'Pupkin', description: 'Last name'})
    readonly lastName: string;
    @ApiProperty({example: 'user@domain.ru', description: 'E mail'})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'Password'})
    readonly password: string;
    @ApiProperty({example: 'true', description: 'Active'})
    readonly isActive: boolean;

    readonly refreshToken?: string | null;
}