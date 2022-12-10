import { Message } from '../message.js';
import { CreateOnePayloadInput } from './payloads/createOnePayload.js';
import { DeleteOnePayload } from './payloads/deleteOnePayload.js';
import { FindManyPayloadInput } from './payloads/findManyPayload.js';

export interface MessageRepository {
  createOne(input: CreateOnePayloadInput): Promise<Message>;
  findMany(input: FindManyPayloadInput): Promise<Message[]>;
  deleteOne(input: DeleteOnePayload): Promise<void>;
}
