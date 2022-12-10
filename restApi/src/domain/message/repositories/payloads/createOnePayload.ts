import { IsEnum, IsOptional, IsString, IsUuidV4 } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';
import { RepeatBy } from '../../repeatBy.js';

export interface CreateOnePayloadInput {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly display_name: string;
  readonly send_date: string;
  readonly repeat_by?: RepeatBy | undefined;
  readonly user_id: string;
  readonly recipient_id: string;
}

export class CreateOnePayload {
  @IsUuidV4()
  public readonly id: string;

  @IsString()
  public readonly title: string;

  @IsString()
  public readonly content: string;

  @IsString()
  public readonly display_name: string;

  @IsString()
  public readonly send_date: string;

  @IsOptional()
  @IsEnum(RepeatBy)
  public readonly repeat_by?: RepeatBy;

  @IsUuidV4()
  public readonly user_id: string;

  @IsUuidV4()
  public readonly recipient_id: string;

  private constructor({
    id,
    title,
    content,
    display_name,
    send_date,
    repeat_by,
    user_id,
    recipient_id,
  }: CreateOnePayloadInput) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.display_name = display_name;
    this.send_date = send_date;
    this.user_id = user_id;
    this.recipient_id = recipient_id;

    if (repeat_by) {
      this.repeat_by = repeat_by;
    }

    Validator.validate(this);
  }

  public static create(input: CreateOnePayloadInput): CreateOnePayload {
    return new CreateOnePayload({ ...input });
  }
}
