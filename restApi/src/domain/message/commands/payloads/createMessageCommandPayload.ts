import { IsEnum, IsOptional, IsString, IsUuidV4 } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';
import { RepeatBy } from '../../repeatBy.js';

export interface CreateMessageCommandPayloadInput {
  readonly title: string;
  readonly content: string;
  readonly displayName: string;
  readonly sendDate: string;
  readonly repeatBy?: RepeatBy | undefined;
  readonly userId: string;
  readonly recipientId: string;
}

export class CreateMessageCommandPayload {
  @IsString()
  public readonly title: string;

  @IsString()
  public readonly content: string;

  @IsString()
  public readonly displayName: string;

  @IsString()
  public readonly sendDate: string;

  @IsOptional()
  @IsEnum(RepeatBy)
  public readonly repeatBy?: RepeatBy;

  @IsUuidV4()
  public readonly userId: string;

  @IsUuidV4()
  public readonly recipientId: string;

  private constructor({
    title,
    content,
    displayName,
    sendDate,
    repeatBy,
    userId,
    recipientId,
  }: CreateMessageCommandPayloadInput) {
    this.title = title;
    this.content = content;
    this.displayName = displayName;
    this.sendDate = sendDate;
    this.userId = userId;
    this.recipientId = recipientId;

    if (repeatBy) {
      this.repeatBy = repeatBy;
    }

    Validator.validate(this);
  }

  public static create(input: CreateMessageCommandPayloadInput): CreateMessageCommandPayload {
    return new CreateMessageCommandPayload({ ...input });
  }
}
