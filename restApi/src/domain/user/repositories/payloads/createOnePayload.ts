import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class CreateOnePayload {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly email_password: string;

  @IsString()
  public readonly password: string;

  private constructor({ id, email, email_password, password }: CreateOnePayload) {
    this.id = id;
    this.email = email;
    this.email_password = email_password;
    this.password = password;

    Validator.validate(this);
  }

  public static create(input: CreateOnePayload): CreateOnePayload {
    return new CreateOnePayload({ ...input });
  }
}
