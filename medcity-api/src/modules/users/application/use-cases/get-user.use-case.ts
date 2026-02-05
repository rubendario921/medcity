import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from '../dtos';
import { UserApplicationMapper } from '../mappers/user-application.mapper';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly mapper: UserApplicationMapper,
  ) {}

  async run(id: string): Promise<UserResponseDto> {
    if (!id) throw new Error('User id is required');

    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    return this.mapper.toResultDto(user);
  }
}
