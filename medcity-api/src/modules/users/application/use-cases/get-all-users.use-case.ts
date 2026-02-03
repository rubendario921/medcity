import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Inject } from '@nestjs/common';

export class GetAllUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async run(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
