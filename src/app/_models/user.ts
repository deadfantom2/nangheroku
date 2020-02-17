export class User {
  public _id: string;
  public name: string;
  public surname: string;
  public age: number;
  public email: string;
  public password: string;
  public token?: string;

  constructor(
    _id: string,
    name: string,
    age: number,
    surname: string,
    email: string,
    password: string,
    token?: string
  ) {
    this._id = _id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}
