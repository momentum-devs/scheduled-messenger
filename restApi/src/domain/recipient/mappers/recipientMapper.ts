import { Recipient } from '../recipient.js';
import { RecipientEntity } from '../recipientEntity.js';

export interface RecipientMapper {
  map(recipientEntity: RecipientEntity): Recipient;
}
