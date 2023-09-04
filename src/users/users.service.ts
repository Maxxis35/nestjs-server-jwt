import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findOneById(id: string): Promise<UserDocument> {
        return this.userModel.findById(id);
    }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true}).exec();
    }

    async remove(id: string) {
        return this.userModel.findByIdAndRemove(id);
    }

    async findByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({email: email});
    }

    async updateRefToken(id: string, updateUserDto: { refreshToken: string }): Promise<UserDocument> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true}).exec();
    }

}
