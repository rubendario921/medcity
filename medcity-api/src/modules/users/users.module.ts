import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { TypeOrmUserEntity } from './infrastructure/persistence/typeorm-user.entity';
import { TypeOrmUserRepository } from './infrastructure/adapters/user.adapters';
import { UserMappers } from './infrastructure/mappers/user-infrastructure.mappers';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from './application/use-cases';
import { UserApplicationMapper } from './application/mappers/user-application.mapper';
import { IUserRepository } from './domain/repositories/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UsersController],
  providers: [
    // Mappers
    UserMappers,
    UserApplicationMapper,
    // Repositories
    TypeOrmUserRepository,
    { provide: 'IUserRepository', useClass: TypeOrmUserRepository },
    // Use Cases - Factory Providers
    {
      provide: 'ICreateUserUseCase',
      useFactory: (userRepository: IUserRepository) =>
        new CreateUserUseCase(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IDeleteUserUseCase',
      useFactory: (userRepository: IUserRepository) =>
        new DeleteUserUseCase(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IGetAllUserUseCase',
      useFactory: (userRepository: IUserRepository) =>
        new GetAllUserUseCase(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IGetUserUseCase',
      useFactory: (userRepository: IUserRepository) =>
        new GetUserUseCase(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IUpdateUserUseCase',
      useFactory: (userRepository: IUserRepository) =>
        new UpdateUserUseCase(userRepository),
      inject: ['IUserRepository'],
    },
  ],
})
export class UsersModule {}
