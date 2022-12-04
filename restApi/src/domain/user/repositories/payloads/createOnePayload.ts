import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class CreateOnePayload {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  private constructor({ id, email, password }: CreateOnePayload) {
    this.id = id;
    this.email = email;
    this.password = password;

    Validator.validate(this);
  }

  public static create(input: CreateOnePayload): CreateOnePayload {
    return new CreateOnePayload({ ...input });
  }
}
