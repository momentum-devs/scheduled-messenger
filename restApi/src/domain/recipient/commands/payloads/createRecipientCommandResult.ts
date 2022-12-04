import { IsInstanceOf } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';
import { Recipient } from '../../recipient.js';

export class CreateRecipientCommandResult {
  @IsInstanceOf(Recipient)
  public readonly recipient: Recipient;

  private constructor({ recipient }: CreateRecipientCommandResult) {
    this.recipient = recipient;

    Validator.validate(this);
  }

  public static create(input: CreateRecipientCommandResult): CreateRecipientCommandResult {
    return new CreateRecipientCommandResult({ ...input, recipient: new Recipient(input.recipient) });
  }
}
