export class User {
  public name: string;
  public surname: string;
  public age: number;
  public email: string;
  public password: string;
  public img?: string;
  public roles?: string;
  public google?: boolean;
  public isVerified?: boolean;
  public passwordResetToken?: string;
  public passwordResetExpires?: Date;
  public _id?: string;
}
