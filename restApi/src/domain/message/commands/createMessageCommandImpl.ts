import { MessageRepository } from '../repositories/messageRepository.js';
import { CreateMessageCommand } from './createMessageCommand.js';
import {
  CreateMessageCommandPayload,
  CreateMessageCommandPayloadInput,
} from './payloads/createMessageCommandPayload.js';
import { CreateMessageCommandResult } from './payloads/createMessageCommandResult.js';
import { v4 as uuidv4 } from 'uuid';

export class CreateMessageCommandImpl implements CreateMessageCommand {
  public constructor(private readonly messageRepository: MessageRepository) {}

  public async createMessage(input: CreateMessageCommandPayloadInput): Promise<CreateMessageCommandResult> {
    const { content, displayName, recipientId, sendDate, title, userId, repeatBy } =
      CreateMessageCommandPayload.create(input);

    console.log('Creating message...', { userId, title });

    const message = await this.messageRepository.createOne({
      id: uuidv4(),
      content,
      displayName,
      recipientId,
      sendDate,
      title,
      userId,
      repeatBy,
    });

    console.log('Message created.', { messageId: message.id, userId });

    return CreateMessageCommandResult.create({ message });
  }
}
