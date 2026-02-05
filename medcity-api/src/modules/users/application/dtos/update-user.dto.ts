export class UpdateUserDto {
  name?: string;
  lastName?: string;
  typeDocument?: string;
  numberDocument?: string;
  email?: string;
  numberPhone?: string;

  constructor(data: {
    name?: string;
    lastName?: string;
    typeDocument?: string;
    numberDocument?: string;
    email?: string;
    numberPhone?: string;
  }) {
    this.name = data.name;
    this.lastName = data.lastName;
    this.typeDocument = data.typeDocument;
    this.numberDocument = data.numberDocument;
    this.email = data.email;
    this.numberPhone = data.numberPhone;
  }
}
