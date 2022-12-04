import { FindMessagesQueryPayload } from './payloads/findMessagesQueryPayload.js';
import { FindMessagesQueryResult } from './payloads/findMessagesQueryResult.js';

export interface FindMessagesQuery {
  findMessages(input: FindMessagesQueryPayload): Promise<FindMessagesQueryResult>;
}
