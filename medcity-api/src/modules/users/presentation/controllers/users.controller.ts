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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserResponseDto } from '../../application/dtos';
import { ApiPayload } from 'src/shared/contracts/api-payload';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users.',
    type: [UserResponseDto],
  })
  async getAllUsers(): Promise<ApiPayload<UserResponseDto[]>> {
    const users = await this.getAllUserUseCase.run();
    return {
      message:'Users found',
      data: users,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found successfully.',
    type: UserResponseDto,
  })
  async getUserById(@Param('id') id: string): Promise<ApiPayload<UserResponseDto>> {
    const user = await this.getUserUseCase.run(id);
    return {
      message: 'User found',
      data: user
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: UserResponseDto,
  })
  async createUser(@Body() dto: CreateUserDto): Promise<ApiPayload<UserResponseDto>> {
    const user = await this.createUserUseCase.run(dto);
    return {
      message: 'New User',
      data: user,
    };
  }
}

