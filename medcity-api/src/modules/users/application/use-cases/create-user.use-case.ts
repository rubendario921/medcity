import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from '../dtos';
import { UserApplicationMapper } from '../mappers/user-application.mapper';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly mapper: UserApplicationMapper,
  ) {}

  async run(dto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error(`User with email ${dto.email} already exists`);
    }
    const newUser = this.mapper.toDomain(dto);
    const createdUser = await this.userRepository.create(newUser);
    return this.mapper.toResultDto(createdUser);
  }
}
