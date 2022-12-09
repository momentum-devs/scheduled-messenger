import { Message } from '../message.js';
import { MessageEntity } from '../messageEntity.js';
import { MessageMapper } from './messageMapper.js';

export class MessageMapperImpl implements MessageMapper {
  public map({
    id,
    title,
    content,
    display_name,
    send_date,
    repeat_by,
    user_id,
    recipient_id,
  }: MessageEntity): Message {
    return new Message({
      id,
      title,
      content,
      displayName: display_name,
      sendDate: send_date,
      repeatBy: repeat_by,
      userId: user_id,
      recipientId: recipient_id,
    });
  }
}
