import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto, UserResponseDto } from '../dtos';
import { UserApplicationMapper } from '../mappers/user-application.mapper';


export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly mapper: UserApplicationMapper,
  ) { }

  async run(dto: CreateUserDto): Promise<UserResponseDto> {
    if (!dto) {
      throw new Error("Data is null o empty");
    }

    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error(`User with email ${dto.email} already exists`);
    }
    const newUser = this.mapper.toDomain(dto);
    const createdUser = await this.userRepository.create(newUser);
    return this.mapper.toResultDto(createdUser);
  }
}
