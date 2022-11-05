import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class FindUserQueryPayload {
  @IsString()
  public readonly userId: string;

  private constructor({ userId }: FindUserQueryPayload) {
    this.userId = userId;

    Validator.validate(this);
  }

  public static create(input: FindUserQueryPayload): FindUserQueryPayload {
    return new FindUserQueryPayload({ ...input });
  }
}
