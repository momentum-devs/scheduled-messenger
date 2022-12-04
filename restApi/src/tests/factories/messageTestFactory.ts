import { faker } from '@faker-js/faker';
import { Message } from '../../domain/message/message.js';
import { RepeatBy } from '../../domain/message/repeatBy.js';

export class MessageTestFactory {
  public create(input: Partial<Message> = {}): Message {
    return new Message({
      id: faker.datatype.uuid(),
      title: faker.lorem.word(),
      content: faker.lorem.words(),
      displayName: faker.name.firstName(),
      sendDate: faker.date.soon().toISOString(),
      repeatBy: faker.helpers.arrayElement([RepeatBy.day, RepeatBy.month, RepeatBy.week, RepeatBy.year]),
      recipientId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      ...input,
    });
  }
}
