import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserResponseType } from './types/userResponse.type';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async logoutUser(): Promise<void> {
    return;
  }

  builUserResponse(user: User): UserResponseType {
    return {
      username: user.username,
      email: user.email,
      token: this.generateJwtToken(user),
    };
  }

  generateJwtToken(user: User): string {
    return sign({ email: user.email }, 'JWT_SECRET');
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
