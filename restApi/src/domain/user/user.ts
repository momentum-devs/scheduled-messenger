import { IsString, IsUuidV4 } from '../../common/validator/decorators.js';
import { Validator } from '../../common/validator/validator.js';

export class User {
  @IsUuidV4()
  public readonly id: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly emailPassword: string;

  @IsString()
  public readonly password: string;

  public constructor({ id, email, emailPassword, password }: User) {
    this.id = id;
    this.email = email;
    this.emailPassword = emailPassword;
    this.password = password;

    Validator.validate(this);
  }
}
