import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  CreateUserUseCase,
  GetAllUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from "../../application/use-cases";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiPayload } from "src/shared/contracts/api-payload";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../dtos";
import { UserApplicationMapper } from "../../application/mappers/user-application.mapper";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly userApplicationMapper: UserApplicationMapper,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get All Users" })
  @ApiResponse({
    status: 200,
    description: "List of all users.",
    type: [UserResponseDto],
  })
  async getAllUsers(): Promise<ApiPayload<UserResponseDto[]>> {
    const res = await this.getAllUserUseCase.run();
    return {
      message: "Users found",
      data: this.userApplicationMapper.toResultListDto(res),
    };
  }

  @Get(":id")
  @HttpCode(HttpStatus.FOUND)
  @ApiOperation({ summary: "Get User by ID" })
  @ApiResponse({
    status: 200,
    description: "User found successfully.",
    type: UserResponseDto,
  })
  async getUserById(
    @Param("id") id: string,
  ): Promise<ApiPayload<UserResponseDto>> {
    const res = await this.getUserUseCase.run(id);
    return {
      message: "User found",
      data: this.userApplicationMapper.toResultDto(res),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "User created successfully.",
    type: UserResponseDto,
  })
  async createUser(
    @Body() req: CreateUserDto,
  ): Promise<ApiPayload<UserResponseDto>> {
    const user = this.userApplicationMapper.toDomainCreate(req);
    const res = await this.createUserUseCase.run(user);
    return {
      message: "New User",
      data: this.userApplicationMapper.toResultDto(res),
    };
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: 200,
    description: "User update successfully.",
    type: UserResponseDto,
  })
  async updateUser(
    @Param("id") id: string,
    @Body() req: UpdateUserDto,
  ): Promise<ApiPayload<UserResponseDto>> {
    const user = this.userApplicationMapper.toDomainUpdate(req);
    const res = await this.updateUserUseCase.run(id, user);
    return {
      message: "Update User",
      data: this.userApplicationMapper.toResultDto(res),
    };
  }
}
