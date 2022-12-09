import { faker } from '@faker-js/faker';
import { MessageEntity } from '../../domain/message/messageEntity.js';
import { RepeatBy } from '../../domain/message/repeatBy.js';

export class MessageEntityTestFactory {
  public create(input: Partial<MessageEntity> = {}): MessageEntity {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.word(),
      content: faker.lorem.words(),
      display_name: faker.name.firstName(),
      send_date: faker.date.soon().toISOString(),
      repeat_by: faker.helpers.arrayElement([RepeatBy.day, RepeatBy.month, RepeatBy.week, RepeatBy.year]),
      recipient_id: faker.datatype.uuid(),
      user_id: faker.datatype.uuid(),
      ...input,
    };
  }
}
