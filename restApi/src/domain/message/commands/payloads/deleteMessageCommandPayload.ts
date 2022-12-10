import { IsUuidV4 } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class DeleteMessageCommandPayload {
  @IsUuidV4()
  public readonly id: string;

  private constructor({ id }: DeleteMessageCommandPayload) {
    this.id = id;

    Validator.validate(this);
  }

  public static create(input: DeleteMessageCommandPayload): DeleteMessageCommandPayload {
    return new DeleteMessageCommandPayload({ ...input });
  }
}
