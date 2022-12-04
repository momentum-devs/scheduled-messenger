import { IsOptional, IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export interface FindOnePayloadInput {
  readonly id?: string | undefined;
  readonly email?: string | undefined;
}

export class FindOnePayload {
  @IsOptional()
  @IsString()
  public readonly id?: string;

  @IsOptional()
  @IsString()
  public readonly email?: string;

  private constructor({ id, email }: FindOnePayloadInput) {
    if (id) {
      this.id = id;
    }

    if (email) {
      this.email = email;
    }

    Validator.validate(this);
  }

  public static create(input: FindOnePayloadInput): FindOnePayload {
    return new FindOnePayload({ ...input });
  }
}
