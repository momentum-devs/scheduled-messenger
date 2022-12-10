import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class DeleteOnePayload {
  @IsString()
  public readonly id: string;

  private constructor({ id }: DeleteOnePayload) {
    this.id = id;

    Validator.validate(this);
  }

  public static create(input: DeleteOnePayload): DeleteOnePayload {
    return new DeleteOnePayload({ ...input });
  }
}
