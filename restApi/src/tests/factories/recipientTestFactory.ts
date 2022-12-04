import { faker } from '@faker-js/faker';
import { Recipient } from '../../domain/recipient/recipient.js';

export class RecipientTestFactory {
  public create(input: Partial<Recipient> = {}): Recipient {
    return new Recipient({
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      name: faker.name.firstName(),
      ...input,
    });
  }
}
