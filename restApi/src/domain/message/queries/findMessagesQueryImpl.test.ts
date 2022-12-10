import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { MessageTestFactory } from '../../../tests/factories/messageTestFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { MessageRepository } from '../repositories/messageRepository.js';
import { FindMessagesQueryImpl } from './findMessagesQueryImpl.js';

describe('FindMessagesQueryImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let messageRepository: MessageRepository;
  let findMessagesQueryImpl: FindMessagesQueryImpl;

  const messageTestFactory = new MessageTestFactory();

  beforeEach(async () => {
    messageRepository = new DummyFactory().create();
    findMessagesQueryImpl = new FindMessagesQueryImpl(messageRepository);
  });

  it('finds messages', async () => {
    expect.assertions(2);

    const message = messageTestFactory.create();

    spyFactory.create(messageRepository, 'findMany').mockImplementation(async () => {
      return [message];
    });

    const result = await findMessagesQueryImpl.findMessages({ userId: message.userId });

    expect(messageRepository.findMany).toHaveBeenCalledWith({ user_id: message.userId });
    expect(result.messages).toEqual([message]);
  });
});
