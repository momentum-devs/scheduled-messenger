import { Validator } from '../../../../common/validator/validator.js';
import { IsInstanceOf } from '../../../../common/validator/decorators.js';
import { Message } from '../../message.js';

export class FindMessagesQueryResult {
  @IsInstanceOf(Message, { each: true })
  public readonly messages: Message[];

  private constructor({ messages }: FindMessagesQueryResult) {
    this.messages = messages;

    Validator.validate(this);
  }

  public static create(input: FindMessagesQueryResult): FindMessagesQueryResult {
    return new FindMessagesQueryResult({
      ...input,
      messages: input.messages.map((messageInput) => new Message(messageInput)),
    });
  }
}
