import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto, UserResponseDto } from '../dtos';
import { UserApplicationMapper } from '../mappers/user-application.mapper';
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly mapper: UserApplicationMapper,
  ) {}

  async run(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    if (!id) throw new Error('User id is required');

    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const data = this.mapper.toDomainUpdate(dto);

    const updatedUser = await this.userRepository.update(id, data);
    if (!updatedUser) throw new Error(`Failed to update user with id ${id}`);

    return this.mapper.toResultDto(updatedUser);
  }
}
