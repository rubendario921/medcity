<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Technology Stack

This project uses the following technologies and principles to build a robust and scalable REST API for medical appointment booking:

- **NestJS**: A Node.js framework for building efficient and scalable backend applications, based on TypeScript.
- **TypeScript**: A programming language that adds static typing to JavaScript, improving maintainability and reducing errors.
- **PostgreSQL**: A relational database management system, used to store user and appointment data.
- **TypeORM**: An ORM (Object-Relational Mapping) for TypeScript and JavaScript, simplifying database interactions.
- **Swagger/OpenAPI**: A tool for documenting and interactively testing the API.
- **Hexagonal Architecture (Ports and Adapters)**: An architectural pattern that separates business logic from external dependencies, promoting testability and maintainability.
- **Clean Code and SOLID**: Software development principles for writing clean, readable, and modular code, following SOLID principles (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).

## Project Structure

The project follows a **Hexagonal Architecture** pattern, organizing code into modules with clear separation of concerns:

```
src/
├── modules/                          # Feature modules
│   └── users/                        # User module
│       ├── domain/                   # Business logic layer (independent of frameworks)
│       │   ├── entities/             # Domain entities (User entity)
│       │   ├── repositories/         # Repository interfaces (contracts)
│       │   └── value-objects/        # Value objects (immutable data)
│       │
│       ├── application/              # Application layer (use cases and services)
│       │   ├── use-cases/            # Application use cases (CreateUserUseCase, GetUsersUseCase)
│       │   └── services/             # Application services
│       │
│       ├── infrastructure/           # Infrastructure layer (external dependencies)
│       │   └── repositories/         # Repository implementations (UserRepository)
│       │
│       ├── presentation/             # Presentation layer (HTTP controllers)
│       │   ├── controllers/          # HTTP controllers (UserController)
│       │   └── dtos/                 # Data Transfer Objects (CreateUserDto)
│       │
│       └── users.module.ts           # NestJS module configuration
│
├── shared/                           # Shared utilities and helpers
│   ├── filters/                      # Exception filters
│   ├── decorators/                   # Custom decorators
│   └── utils/                        # Utility functions and constants
│
├── app.module.ts                     # Main application module
├── app.controller.ts                 # Root controller
├── app.service.ts                    # Root service
└── main.ts                           # Application entry point
```

### Architecture Layers Explanation

1. **Domain Layer**: Contains pure business logic independent of any framework. 
   - Defines entities and repository interfaces (contracts).
   - No dependencies on external frameworks.
   - This is the core of the application.

2. **Application Layer**: Orchestrates business logic through use cases.
   - Implements application services and use cases.
   - Depends on domain layer interfaces.
   - Handles application workflows.

3. **Infrastructure Layer**: Implements technical details and external dependencies.
   - Implements repository interfaces from the domain.
   - Handles database operations using TypeORM.
   - Can be replaced without affecting domain or application layers.

4. **Presentation Layer**: Handles HTTP requests and responses.
   - Contains NestJS controllers.
   - Defines DTOs for input validation.
   - Converts HTTP requests to application layer inputs.

5. **Shared Layer**: Contains cross-cutting concerns.
   - Exception filters for error handling.
   - Custom decorators for metadata.
   - Utility functions used across modules.

### Module Organization

Each feature (like users) is organized as an independent module following the same structure:
- **Domain**: Pure business logic
- **Application**: Use cases
- **Infrastructure**: Data access
- **Presentation**: API endpoints

This allows for easy scaling and adding new features like appointments, doctors, clinics, etc.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
