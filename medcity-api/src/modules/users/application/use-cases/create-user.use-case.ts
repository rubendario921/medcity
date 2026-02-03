import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Inject } from '@nestjs/common';
import {
  UserCreatedAt,
  UserEmail,
  UserLastName,
  UserName,
  UserNumberDocument,
  UserNumberPhone,
  UserTypeDocument,
} from '../../domain/value-object';

export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async run(data: {
    name: string;
    lastName: string;
    typeDocument: string;
    numberDocument: string;
    email: string;
    numberPhone: string;
  }): Promise<User> {
    //Validate User Data
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser)
      throw new Error(`User with email ${data.email} already exists`);

    //New User Data
    const newUser = new User(
      '',
      new UserName(data.name),
      new UserLastName(data.lastName),
      new UserTypeDocument(data.typeDocument),
      new UserNumberDocument(data.numberDocument),
      new UserEmail(data.email),
      new UserNumberPhone(data.numberPhone),
      new UserCreatedAt(),
    );

    return this.userRepository.create(newUser);
  }
}
