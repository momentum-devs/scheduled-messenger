import { RepeatBy } from './repeatBy.js';

export interface MessageEntity {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly display_name: string;
  readonly send_date: string;
  readonly repeat_by?: RepeatBy;
  readonly user_id: string;
  readonly recipient_id: string;
}
