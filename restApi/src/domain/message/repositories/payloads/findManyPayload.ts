import { IsOptional, IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export interface FindManyPayloadInput {
  readonly user_id?: string | undefined;
}

export class FindManyPayload {
  @IsOptional()
  @IsString()
  public readonly user_id?: string;

  private constructor({ user_id }: FindManyPayloadInput) {
    if (user_id) {
      this.user_id = user_id;
    }

    Validator.validate(this);
  }

  public static create(input: FindManyPayloadInput): FindManyPayload {
    return new FindManyPayload({ ...input });
  }
}
