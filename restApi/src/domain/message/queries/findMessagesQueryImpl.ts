import { MessageRepository } from '../repositories/messageRepository.js';
import { FindMessagesQuery } from './findMessagesQuery.js';
import { FindMessagesQueryPayload } from './payloads/findMessagesQueryPayload.js';
import { FindMessagesQueryResult } from './payloads/findMessagesQueryResult.js';

export class FindMessagesQueryImpl implements FindMessagesQuery {
  public constructor(private readonly messageRepository: MessageRepository) {}

  public async findMessages(input: FindMessagesQueryPayload): Promise<FindMessagesQueryResult> {
    const { userId } = FindMessagesQueryPayload.create(input);

    console.log('Fetching messages...', { userId });

    const messages = await this.messageRepository.findMany({ user_id: userId });

    console.log('Messages fetched.', { userId });

    return FindMessagesQueryResult.create({ messages });
  }
}
