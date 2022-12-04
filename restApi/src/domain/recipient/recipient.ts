import { IsString, IsUuidV4 } from '../../common/validator/decorators.js';
import { Validator } from '../../common/validator/validator.js';

export class Recipient {
  @IsUuidV4()
  public readonly id: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly name: string;

  public constructor({ id, email, name }: Recipient) {
    this.id = id;
    this.email = email;
    this.name = name;

    Validator.validate(this);
  }
}
