import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { MessageTestFactory } from '../../../tests/factories/messageTestFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { MessageRepository } from '../repositories/messageRepository.js';
import { CreateMessageCommandImpl } from './createMessageCommandImpl.js';

describe('CreateMessageCommandImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let messageRepository: MessageRepository;
  let createMessageCommandImpl: CreateMessageCommandImpl;

  const messageTestFactory = new MessageTestFactory();

  beforeEach(async () => {
    messageRepository = new DummyFactory().create();
    createMessageCommandImpl = new CreateMessageCommandImpl(messageRepository);
  });

  it('creates a message', async () => {
    expect.assertions(2);

    const message = messageTestFactory.create();

    const { content, displayName, recipientId, sendDate, title, userId, repeatBy } = message;

    spyFactory.create(messageRepository, 'createOne').mockImplementation(async () => {
      return message;
    });

    const result = await createMessageCommandImpl.createMessage({
      content,
      displayName,
      recipientId,
      sendDate,
      title,
      userId,
      repeatBy,
    });

    expect(messageRepository.createOne).toHaveBeenCalledWith({
      id: expect.anything(),
      content,
      displayName,
      recipientId,
      sendDate,
      title,
      userId,
      repeatBy,
    });
    expect(result.message).toEqual(message);
  });
});
