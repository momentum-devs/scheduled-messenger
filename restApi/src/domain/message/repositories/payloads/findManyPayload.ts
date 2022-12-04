import { IsOptional, IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export interface FindManyPayloadInput {
  readonly userId?: string | undefined;
}

export class FindManyPayload {
  @IsOptional()
  @IsString()
  public readonly userId?: string;

  private constructor({ userId }: FindManyPayloadInput) {
    if (userId) {
      this.userId = userId;
    }

    Validator.validate(this);
  }

  public static create(input: FindManyPayloadInput): FindManyPayload {
    return new FindManyPayload({ ...input });
  }
}
