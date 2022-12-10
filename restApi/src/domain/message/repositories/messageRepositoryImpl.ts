import { QueryBuilder } from '../../../common/postgres/queryBuilder.js';
import { MessageMapper } from '../mappers/messageMapper.js';
import { MessageEntity } from '../messageEntity.js';
import { CreateOnePayload, CreateOnePayloadInput } from './payloads/createOnePayload.js';
import { FindManyPayload, FindManyPayloadInput } from './payloads/findManyPayload.js';
import { MessageRepository } from './messageRepository.js';
import { Message } from '../message.js';
import { DeleteOnePayload } from './payloads/deleteOnePayload.js';

export class MessageRepositoryImpl implements MessageRepository {
  private readonly messagesTableName = 'messages';

  public constructor(private readonly queryBuilder: QueryBuilder, private readonly messageMapper: MessageMapper) {}

  public async createOne(input: CreateOnePayloadInput): Promise<Message> {
    const data = CreateOnePayload.create(input);

    const result = await this.queryBuilder<MessageEntity>(this.messagesTableName).insert(data, '*');

    const messageEntity = result[0] as MessageEntity;

    return this.messageMapper.map(messageEntity);
  }

  public async findMany(input: FindManyPayloadInput): Promise<Message[]> {
    const { user_id } = FindManyPayload.create(input);

    let query = this.queryBuilder<MessageEntity>(this.messagesTableName).select('*');

    if (user_id) {
      query = query.where('user_id', '=', user_id);
    }

    const messageEntities = await query;

    return messageEntities.map((messageEntity) => this.messageMapper.map(messageEntity));
  }

  public async deleteOne(input: DeleteOnePayload): Promise<void> {
    const { id } = DeleteOnePayload.create(input);

    await this.queryBuilder<MessageEntity>(this.messagesTableName).where('id', '=', id).del();
  }
}
