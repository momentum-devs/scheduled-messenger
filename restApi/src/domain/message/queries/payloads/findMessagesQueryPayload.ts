import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class FindMessagesQueryPayload {
  @IsString()
  public readonly userId: string;

  private constructor({ userId }: FindMessagesQueryPayload) {
    this.userId = userId;

    Validator.validate(this);
  }

  public static create(input: FindMessagesQueryPayload): FindMessagesQueryPayload {
    return new FindMessagesQueryPayload({ ...input });
  }
}
