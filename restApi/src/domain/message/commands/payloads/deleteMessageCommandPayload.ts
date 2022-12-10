import { IsUuidV4 } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class DeleteMessageCommandPayload {
  @IsUuidV4()
  public readonly id: string;

  @IsUuidV4()
  public readonly userId: string;

  private constructor({ id, userId }: DeleteMessageCommandPayload) {
    this.id = id;
    this.userId = userId;

    Validator.validate(this);
  }

  public static create(input: DeleteMessageCommandPayload): DeleteMessageCommandPayload {
    return new DeleteMessageCommandPayload({ ...input });
  }
}
