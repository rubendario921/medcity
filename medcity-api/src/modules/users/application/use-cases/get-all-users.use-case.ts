import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserApplicationMapper } from '../mappers/user-application.mapper';
@Injectable()
export class GetAllUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly mapper: UserApplicationMapper,
  ) {}

  async run(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return this.mapper.toResultListDto(users);
  }
}
