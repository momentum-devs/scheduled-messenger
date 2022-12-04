import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class CreateRecipientCommandPayload {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  private constructor({ email, name }: CreateRecipientCommandPayload) {
    this.email = email;
    this.name = name;

    Validator.validate(this);
  }

  public static create(input: CreateRecipientCommandPayload): CreateRecipientCommandPayload {
    return new CreateRecipientCommandPayload({ ...input });
  }
}
