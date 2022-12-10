import { MessageRepository } from '../repositories/messageRepository.js';
import { DeleteMessageCommand } from './deleteMessageCommand.js';
import { DeleteMessageCommandPayload } from './payloads/deleteMessageCommandPayload.js';

export class DeleteMessageCommandImpl implements DeleteMessageCommand {
  public constructor(private readonly messageRepository: MessageRepository) {}

  public async deleteMessage(input: DeleteMessageCommandPayload): Promise<void> {
    const { id } = DeleteMessageCommandPayload.create(input);

    console.log('Deleting message...', { id });

    await this.messageRepository.deleteOne({ id });

    console.log('Message deleted.', { id });
  }
}
