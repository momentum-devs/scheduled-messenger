import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { RecipientTestFactory } from '../../../tests/factories/recipientTestFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { RecipientRepository } from '../repositories/recipientRepository.js';
import { CreateRecipientCommandImpl } from './createRecipientCommandImpl.js';

describe('CreateMessageCommandImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let recipientRepository: RecipientRepository;
  let createRecipientCommandImpl: CreateRecipientCommandImpl;

  const recipientTestFactory = new RecipientTestFactory();

  beforeEach(async () => {
    recipientRepository = new DummyFactory().create();
    createRecipientCommandImpl = new CreateRecipientCommandImpl(recipientRepository);
  });

  it('creates a recipient', async () => {
    expect.assertions(2);

    const recipient = recipientTestFactory.create();

    const { email, name } = recipient;

    spyFactory.create(recipientRepository, 'createOne').mockImplementation(async () => {
      return recipient;
    });

    const result = await createRecipientCommandImpl.createRecipient({ email, name });

    expect(recipientRepository.createOne).toHaveBeenCalledWith({
      id: expect.anything(),
      email,
      name,
    });
    expect(result.recipient).toEqual(recipient);
  });
});
