import { Message } from '../message.js';
import { MessageEntity } from '../messageEntity.js';
import { MessageMapper } from './messageMapper.js';

export class MessageMapperImpl implements MessageMapper {
  public map({ id, title, content, displayName, sendDate, repeatBy, userId, recipientId }: MessageEntity): Message {
    return new Message({ id, title, content, displayName, sendDate, repeatBy, userId, recipientId });
  }
}
