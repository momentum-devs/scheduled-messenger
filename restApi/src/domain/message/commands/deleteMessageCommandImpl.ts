import { MessageRepository } from '../repositories/messageRepository.js';
import { DeleteMessageCommand } from './deleteMessageCommand.js';
import { DeleteMessageCommandPayload } from './payloads/deleteMessageCommandPayload.js';

export class DeleteMessageCommandImpl implements DeleteMessageCommand {
  public constructor(private readonly messageRepository: MessageRepository) {}

  public async deleteMessage(input: DeleteMessageCommandPayload): Promise<void> {
    const { id, userId } = DeleteMessageCommandPayload.create(input);

    console.log('Deleting message...', { id, userId });

    await this.messageRepository.deleteOne({ id, user_id: userId });

    console.log('Message deleted.', { id, userId });
  }
}
