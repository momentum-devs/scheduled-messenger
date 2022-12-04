import { faker } from '@faker-js/faker';
import { MessageEntity } from '../../domain/message/messageEntity.js';
import { RepeatBy } from '../../domain/message/repeatBy.js';

export class MessageEntityTestFactory {
  public create(input: Partial<MessageEntity> = {}): MessageEntity {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.word(),
      content: faker.lorem.words(),
      displayName: faker.name.firstName(),
      sendDate: faker.date.soon().toISOString(),
      repeatBy: faker.helpers.arrayElement([RepeatBy.day, RepeatBy.month, RepeatBy.week, RepeatBy.year]),
      recipientId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      ...input,
    };
  }
}
