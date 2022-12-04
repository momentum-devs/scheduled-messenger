import { CreateRecipientCommandPayload } from './payloads/createRecipientCommandPayload.js';
import { CreateRecipientCommandResult } from './payloads/createRecipientCommandResult.js';

export interface CreateRecipientCommand {
  createRecipient(input: CreateRecipientCommandPayload): Promise<CreateRecipientCommandResult>;
}
