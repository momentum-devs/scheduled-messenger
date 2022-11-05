import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class LoginUserCommandPayload {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  private constructor({ email, password }: LoginUserCommandPayload) {
    this.email = email;
    this.password = password;

    Validator.validate(this);
  }

  public static create(input: LoginUserCommandPayload): LoginUserCommandPayload {
    return new LoginUserCommandPayload({ ...input });
  }
}
