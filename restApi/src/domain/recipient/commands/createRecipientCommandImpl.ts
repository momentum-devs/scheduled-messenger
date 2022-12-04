import { RecipientRepository } from '../repositories/recipientRepository.js';
import { CreateRecipientCommand } from './createRecipientCommand.js';
import { CreateRecipientCommandPayload } from './payloads/createRecipientCommandPayload.js';
import { CreateRecipientCommandResult } from './payloads/createRecipientCommandResult.js';
import { v4 as uuidv4 } from 'uuid';

export class CreateRecipientCommandImpl implements CreateRecipientCommand {
  public constructor(private readonly recipientRepository: RecipientRepository) {}

  public async createRecipient(input: CreateRecipientCommandPayload): Promise<CreateRecipientCommandResult> {
    const { email, name } = CreateRecipientCommandPayload.create(input);

    console.log('Creating recipient...', { email, name });

    const recipient = await this.recipientRepository.createOne({
      id: uuidv4(),
      email,
      name,
    });

    console.log('Recipient created.', { recipientId: recipient.id });

    return CreateRecipientCommandResult.create({ recipient });
  }
}
