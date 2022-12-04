import { User } from '../user.js';
import { CreateOnePayload } from './payloads/createOnePayload.js';
import { FindOnePayloadInput } from './payloads/findOnePayload.js';

export interface UserRepository {
  createOne(input: CreateOnePayload): Promise<void>;
  findOne(input: FindOnePayloadInput): Promise<User | null>;
}
