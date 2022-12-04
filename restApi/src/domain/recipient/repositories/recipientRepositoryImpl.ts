import { QueryBuilder } from '../../../common/postgres/queryBuilder.js';
import { RecipientMapper } from '../mappers/recipientMapper.js';
import { RecipientEntity } from '../recipientEntity.js';
import { CreateOnePayload } from './payloads/createOnePayload.js';
import { RecipientRepository } from './recipientRepository.js';
import { Recipient } from '../recipient.js';

export class RecipientRepositoryImpl implements RecipientRepository {
  private readonly recipientsTableName = 'recipients';

  public constructor(private readonly queryBuilder: QueryBuilder, private readonly recipientMapper: RecipientMapper) {}

  public async createOne(input: CreateOnePayload): Promise<Recipient> {
    const data = CreateOnePayload.create(input);

    const result = await this.queryBuilder<RecipientEntity>(this.recipientsTableName).insert(data, '*');

    const messageEntity = result[0] as RecipientEntity;

    return this.recipientMapper.map(messageEntity);
  }
}
