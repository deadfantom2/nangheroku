export class User {
  public _id?: string;
  public name?: string;
  public surname?: string;
  public age?: number;
  public email: string;
  public password: string;
  public token?: string;
  public isVerified?: boolean;
  public createdAt?: Date;
}
