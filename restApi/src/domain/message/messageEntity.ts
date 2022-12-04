import { RepeatBy } from './repeatBy.js';

export interface MessageEntity {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly displayName: string;
  readonly sendDate: string;
  readonly repeatBy?: RepeatBy;
  readonly userId: string;
  readonly recipientId: string;
}
