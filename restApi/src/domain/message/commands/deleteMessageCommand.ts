import { DeleteMessageCommandPayload } from './payloads/deleteMessageCommandPayload.js';

export interface DeleteMessageCommand {
  deleteMessage(input: DeleteMessageCommandPayload): Promise<void>;
}
