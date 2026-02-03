import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateUserUseCase,
  GetAllUserUseCase,
  GetUserUseCase,
} from '../../application/use-cases';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, description: 'List of all users.' })
  async getAllUsers() {
    return this.getAllUserUseCase.run();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({ status: 200, description: 'User found successfully.' })
  async getUserById(@Param('id') id: string) {
    return this.getUserUseCase.run(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ type: UserResponseDto })
  async createUser(
    @Body() createUser: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.run(createUser);
    return UserResponseDto.toResponseDto(user);
  }
}
