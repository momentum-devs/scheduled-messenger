import { CreateMessageCommandPayloadInput } from './payloads/createMessageCommandPayload.js';
import { CreateMessageCommandResult } from './payloads/createMessageCommandResult.js';

export interface CreateMessageCommand {
  createMessage(input: CreateMessageCommandPayloadInput): Promise<CreateMessageCommandResult>;
}
