import { Recipient } from '../recipient.js';
import { CreateOnePayload } from './payloads/createOnePayload.js';

export interface RecipientRepository {
  createOne(input: CreateOnePayload): Promise<Recipient>;
}
