export class User {
  public _id?: string;
  public name?: string;
  public surname?: string;
  public age?: number;
  public email: string;
  public password: string;
  public isVerified?: boolean;
  public roles?: string;
  public token?: string;
  public createdAt?: Date;
}
