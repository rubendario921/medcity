import {
  UserCreatedAt,
  UserEmail,
  UserLastName,
  UserName,
  UserNumberDocument,
  UserNumberPhone,
  UserTypeDocument,
} from '../value-object';

export class User {
  id?: string;
  name?: UserName;
  lastName?: UserLastName;
  typeDocument?: UserTypeDocument;
  numberDocument?: UserNumberDocument;
  email?: UserEmail;
  numberPhone?: UserNumberPhone;
  createdAt?: UserCreatedAt;
  updatedAt?: Date;

  constructor(
    id?: string,
    name?: UserName,
    lastName?: UserLastName,
    typeDocument?: UserTypeDocument,
    numberDocument?: UserNumberDocument,
    email?: UserEmail,
    numberPhone?: UserNumberPhone,
    createdAt?: UserCreatedAt,
    updatedAt?: Date,
  ) {
    this.id = id ?? '';
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.typeDocument = typeDocument;
    this.numberDocument = numberDocument;
    this.numberPhone = numberPhone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
