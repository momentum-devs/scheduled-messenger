import { IsString } from '../../common/validator/decorators.js';
import { Validator } from '../../common/validator/validator.js';

export class User {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;

  private constructor({ id, email, password }: User) {
    this.id = id;
    this.email = email;
    this.password = password;

    Validator.validate(this);
  }

  public static create(input: User): User {
    return new User({ ...input });
  }
}
