import { IsString, IsUuidV4 } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class CreateOnePayload {
  @IsUuidV4()
  public readonly id: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  private constructor({ id, email, name }: CreateOnePayload) {
    this.id = id;
    this.email = email;
    this.name = name;

    Validator.validate(this);
  }

  public static create(input: CreateOnePayload): CreateOnePayload {
    return new CreateOnePayload({ ...input });
  }
}
