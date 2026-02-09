# MedCity - Sistema de Gestión de Citas Médicas

## 📋 Descripción del Proyecto

**MedCity** es una aplicación web desarrollada para la gestión y programación de citas médicas, dedicada al cuidado de clínicas y hospitales. El sistema permite administrar usuarios, médicos, pacientes y citas de manera eficiente, proporcionando una solución integral para instituciones de salud.

## 🏗️ Arquitectura

El proyecto está construido siguiendo los principios de **Arquitectura Hexagonal (Ports & Adapters)** y **Domain-Driven Design (DDD)**, lo que garantiza:

- ✅ Separación clara de responsabilidades
- ✅ Independencia del framework
- ✅ Facilidad para testing
- ✅ Mantenibilidad y escalabilidad
- ✅ Flexibilidad para cambiar implementaciones

### Estructura de Capas

```
src/
├── modules/
│   └── users/
│       ├── domain/              # Capa de Dominio
│       │   ├── entities/        # Entidades de negocio
│       │   ├── value-objects/   # Objetos de valor
│       │   └── repositories/    # Interfaces de repositorios (Ports)
│       │
│       ├── application/         # Capa de Aplicación
│       │   ├── use-cases/       # Casos de uso (lógica de negocio)
│       │   ├── dtos/            # DTOs de aplicación
│       │   └── mappers/         # Mappers de aplicación
│       │
│       ├── infrastructure/      # Capa de Infraestructura
│       │   ├── persistence/     # Entidades de TypeORM
│       │   ├── adapters/        # Implementaciones de repositorios (Adapters)
│       │   └── mappers/         # Mappers de infraestructura
│       │
│       └── presentation/        # Capa de Presentación
│           ├── controllers/     # Controladores HTTP
│           └── dtos/            # DTOs de presentación (Request/Response)
│
├── shared/                      # Código compartido entre módulos
├── app.module.ts                # Módulo principal de la aplicación
└── main.ts                      # Punto de entrada de la aplicación
```

## 🛠️ Stack Tecnológico

### Backend (API)

| Tecnología            | Versión  | Descripción                              |
| --------------------- | -------- | ---------------------------------------- |
| **Node.js**           | LTS      | Runtime de JavaScript                    |
| **NestJS**            | ^11.1.12 | Framework progresivo de Node.js          |
| **TypeScript**        | ^5.9.3   | Superset tipado de JavaScript            |
| **TypeORM**           | ^0.3.28  | ORM para TypeScript y JavaScript         |
| **PostgreSQL**        | -        | Base de datos relacional                 |
| **class-validator**   | ^0.14.3  | Validación de DTOs basada en decoradores |
| **class-transformer** | ^0.5.1   | Transformación de objetos                |
| **Swagger/OpenAPI**   | ^11.2.5  | Documentación automática de API          |

### Herramientas de Desarrollo

| Herramienta  | Versión | Descripción                    |
| ------------ | ------- | ------------------------------ |
| **ESLint**   | ^9.39.2 | Linter para TypeScript         |
| **Prettier** | ^3.8.1  | Formateador de código          |
| **Jest**     | ^30.2.0 | Framework de testing           |
| **ts-jest**  | ^29.4.6 | Preset de Jest para TypeScript |

## 📦 Instalación

### Prerrequisitos

- Node.js (LTS)
- PostgreSQL
- npm o pnpm

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd medcity
```

1. **Instalar dependencias**

```bash
cd medcity-api
npm install
# o
pnpm install
```

1. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto `medcity-api/`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=medcity_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_SYNCHRONIZE=true  # Solo en desarrollo, false en producción

# Application
PORT=3000
```

1. **Ejecutar la aplicación**

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Inicia el servidor en modo desarrollo con hot-reload
npm run start:debug        # Inicia en modo debug

# Producción
npm run build              # Compila el proyecto
npm run start:prod         # Inicia el servidor en modo producción

# Testing
npm run test               # Ejecuta los tests
npm run test:watch         # Ejecuta tests en modo watch
npm run test:cov           # Ejecuta tests con cobertura
npm run test:e2e           # Ejecuta tests end-to-end

# Calidad de código
npm run lint               # Ejecuta ESLint
npm run format             # Formatea el código con Prettier
```

## 📚 Documentación de la API

Una vez que la aplicación esté corriendo, la documentación interactiva de Swagger estará disponible en:

```
http://localhost:3000/api
```

## 🔄 Flujo de Datos entre Capas

### Creación de un Usuario (Ejemplo)

```
1. HTTP Request (JSON)
   ↓
2. Presentation Layer (Controller)
   - Recibe CreateUserDto (DTO de presentación)
   - Valida con class-validator
   - Transforma a CreateUserCommandDto (DTO de aplicación)
   ↓
3. Application Layer (Use Case)
   - Recibe CreateUserCommandDto
   - Ejecuta lógica de negocio
   - Usa UserApplicationMapper para crear entidad de dominio
   - Llama al repositorio (port)
   - Retorna UserResultDto (DTO de aplicación)
   ↓
4. Infrastructure Layer (Repository)
   - Implementa el port del repositorio
   - Transforma entidad de dominio a entidad de TypeORM
   - Persiste en la base de datos
   - Retorna entidad de dominio
   ↓
5. Application Layer
   - Transforma entidad a UserResultDto
   ↓
6. Presentation Layer
   - Transforma UserResultDto a UserResponseDto
   - Retorna respuesta HTTP (JSON)
```

## 📝 Convenciones de DTOs

### DTOs de Presentación (`presentation/dtos/`)

- **Propósito**: Manejar la comunicación HTTP (Request/Response)
- **Características**:
  - Decoradores de validación (`@IsString`, `@IsEmail`, etc.)
  - Decoradores de Swagger (`@ApiProperty`)
  - Transformación desde/hacia DTOs de aplicación
- **Ejemplos**: `CreateUserDto`, `UserResponseDto`

### DTOs de Aplicación (`application/dtos/`)

- **Propósito**: Representar comandos y resultados de casos de uso
- **Características**:
  - Sin decoradores de framework
  - Datos puros (POJO)
  - Independientes de la capa de presentación
- **Ejemplos**: `CreateUserCommandDto`, `UpdateUserCommandDto`, `UserResultDto`

### Entidades de Dominio (`domain/entities/`)

- **Propósito**: Representar conceptos del negocio
- **Características**:
  - Contienen lógica de negocio
  - Usan Value Objects
  - Independientes de la infraestructura

### Entidades de Infraestructura (`infrastructure/persistence/`)

- **Propósito**: Mapear a tablas de base de datos
- **Características**:
  - Decoradores de TypeORM
  - Mapeo directo a la base de datos
- **Ejemplos**: `TypeOrmUserEntity`

## 🎯 Principios Aplicados

### SOLID

- **S**ingle Responsibility: Cada clase tiene una única responsabilidad
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Las implementaciones pueden sustituir interfaces
- **I**nterface Segregation: Interfaces específicas por cliente
- **D**ependency Inversion: Dependencia de abstracciones, no de concreciones

### Clean Architecture

- Independencia de frameworks
- Testeable
- Independencia de la UI
- Independencia de la base de datos
- Independencia de agentes externos

## 🔐 Seguridad

- Validación de datos con `class-validator`
- Variables de entorno para configuración sensible
- Preparado para implementar autenticación JWT
- Preparado para implementar autorización basada en roles

## 🧪 Testing

El proyecto está configurado para testing con Jest:

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e
```

## 📈 Próximas Funcionalidades

- [ ] Módulo de Médicos
- [ ] Módulo de Pacientes
- [ ] Módulo de Citas
- [ ] Módulo de Especialidades
- [ ] Sistema de autenticación y autorización
- [ ] Notificaciones por email
- [ ] Dashboard de administración
- [ ] Reportes y estadísticas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

## 👥 Autor

Desarrollado para la gestión eficiente de citas médicas en clínicas y hospitales.

---

**Nota**: Este proyecto sigue evolucionando. Para más información sobre la arquitectura y patrones utilizados, consulta la documentación en el código fuente.
