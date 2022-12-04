import { describe, beforeEach, it, expect } from 'vitest';
import { MessageEntityTestFactory } from '../../../tests/factories/messageEntityTestFactory.js';
import { MessageMapperImpl } from './messageMapperImpl.js';

describe('MessageMapperImpl', () => {
  let messageMapperImpl: MessageMapperImpl;

  const messageEntityTestFactory = new MessageEntityTestFactory();

  beforeEach(async () => {
    messageMapperImpl = new MessageMapperImpl();
  });

  it('maps a message entity to a message', async () => {
    expect.assertions(1);

    const messageEntity = messageEntityTestFactory.create();

    const result = messageMapperImpl.map(messageEntity);

    expect(result).toEqual({
      id: messageEntity.id,
      title: messageEntity.title,
      content: messageEntity.content,
      displayName: messageEntity.displayName,
      sendDate: messageEntity.sendDate,
      repeatBy: messageEntity.repeatBy,
      recipientId: messageEntity.recipientId,
      userId: messageEntity.userId,
    });
  });
});
