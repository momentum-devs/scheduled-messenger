import { faker } from '@faker-js/faker';
import { RecipientEntity } from '../../domain/recipient/recipientEntity.js';

export class RecipientEntityTestFactory {
  public create(input: Partial<RecipientEntity> = {}): RecipientEntity {
    return { id: faker.datatype.uuid(), email: faker.internet.email(), name: faker.name.firstName(), ...input };
  }
}
