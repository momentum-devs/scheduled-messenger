import { describe, beforeEach, it, expect } from 'vitest';
import { RecipientEntityTestFactory } from '../../../tests/factories/recipientEntityTestFactory.js';
import { RecipientMapperImpl } from './recipientMapperImpl.js';

describe('RecipientMapperImpl', () => {
  let recipientMapperImpl: RecipientMapperImpl;

  const recipientEntityTestFactory = new RecipientEntityTestFactory();

  beforeEach(async () => {
    recipientMapperImpl = new RecipientMapperImpl();
  });

  it('maps a recipient entity to a recipient', async () => {
    expect.assertions(1);

    const recipientEntity = recipientEntityTestFactory.create();

    const result = recipientMapperImpl.map(recipientEntity);

    expect(result).toEqual({ id: recipientEntity.id, email: recipientEntity.email, name: recipientEntity.name });
  });
});
