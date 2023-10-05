import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type UserDocument = User & Document

@Schema()
export class User {
    @ApiProperty({example: 'Vasya', description: 'First name'})
    @Prop()
    firstName: string;

    @ApiProperty({example: 'Pupkin', description: 'Last name'})
    @Prop()
    lastName: string;

    @ApiProperty({example: 'user@domain.ru', description: 'E mail'})
    @Prop({required: true, unique: true})
    email: string;

    @ApiProperty({example: '12345', description: 'Password'})
    @Prop({required: true})
    password: string;

    @ApiProperty({example: 'true', description: 'Activate'})
    @Prop()
    isActive: boolean;

    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User)