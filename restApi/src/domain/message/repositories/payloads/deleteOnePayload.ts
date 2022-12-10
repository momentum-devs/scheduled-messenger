import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class DeleteOnePayload {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly user_id: string;

  private constructor({ id, user_id }: DeleteOnePayload) {
    this.id = id;
    this.user_id = user_id;

    Validator.validate(this);
  }

  public static create(input: DeleteOnePayload): DeleteOnePayload {
    return new DeleteOnePayload({ ...input });
  }
}
