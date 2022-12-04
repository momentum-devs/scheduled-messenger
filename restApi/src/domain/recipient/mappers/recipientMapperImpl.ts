import { Recipient } from '../recipient.js';
import { RecipientEntity } from '../recipientEntity.js';
import { RecipientMapper } from './recipientMapper.js';

export class RecipientMapperImpl implements RecipientMapper {
  public map({ id, email, name }: RecipientEntity): Recipient {
    return new Recipient({ id, email, name });
  }
}
