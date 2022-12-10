import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { MessageTestFactory } from '../../../tests/factories/messageTestFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { MessageRepository } from '../repositories/messageRepository.js';
import { DeleteMessageCommandImpl } from './deleteMessageCommandImpl.js';

describe('DeleteMessageCommandImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let messageRepository: MessageRepository;
  let deleteMessageCommandImpl: DeleteMessageCommandImpl;

  const messageTestFactory = new MessageTestFactory();

  beforeEach(async () => {
    messageRepository = new DummyFactory().create();
    deleteMessageCommandImpl = new DeleteMessageCommandImpl(messageRepository);
  });

  it('deletes a message', async () => {
    expect.assertions(1);

    const { id } = messageTestFactory.create();

    spyFactory.create(messageRepository, 'deleteOne').mockImplementation(async () => {});

    await deleteMessageCommandImpl.deleteMessage({ id });

    expect(messageRepository.createOne).toHaveBeenCalledWith({ id });
  });
});
