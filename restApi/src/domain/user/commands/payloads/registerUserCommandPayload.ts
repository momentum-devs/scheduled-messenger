import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class RegisterUserCommandPayload {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  private constructor({ email, password }: RegisterUserCommandPayload) {
    this.email = email;
    this.password = password;

    Validator.validate(this);
  }

  public static create(input: RegisterUserCommandPayload): RegisterUserCommandPayload {
    return new RegisterUserCommandPayload({ ...input });
  }
}
