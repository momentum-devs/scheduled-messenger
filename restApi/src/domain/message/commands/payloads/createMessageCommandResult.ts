import { IsInstanceOf } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';
import { Message } from '../../message.js';

export class CreateMessageCommandResult {
  @IsInstanceOf(Message)
  public readonly message: Message;

  private constructor({ message }: CreateMessageCommandResult) {
    this.message = message;

    Validator.validate(this);
  }

  public static create(input: CreateMessageCommandResult): CreateMessageCommandResult {
    return new CreateMessageCommandResult({ ...input, message: new Message(input.message) });
  }
}
