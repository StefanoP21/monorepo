import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseType } from './types/userResponse.type';
import { LoginDto } from './dto/login.dto';
import { ExpressRequest } from './middlewares/auth.middleware';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.builUserResponse(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserResponseType> {
    const user = await this.userService.loginUser(loginDto);
    return this.userService.builUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.builUserResponse(request.user);
  }

  @Post('logout')
  async logout(): Promise<void> {
    return this.userService.logoutUser();
  }
}
