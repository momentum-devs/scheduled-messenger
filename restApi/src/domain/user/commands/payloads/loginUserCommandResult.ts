import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class LoginUserCommandResult {
  @IsString()
  public readonly accessToken: string;

  private constructor({ accessToken }: LoginUserCommandResult) {
    this.accessToken = accessToken;

    Validator.validate(this);
  }

  public static create(input: LoginUserCommandResult): LoginUserCommandResult {
    return new LoginUserCommandResult({ ...input });
  }
}
