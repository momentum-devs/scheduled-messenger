import { Message } from '../message.js';
import { MessageEntity } from '../messageEntity.js';

export interface MessageMapper {
  map(messageEntity: MessageEntity): Message;
}
