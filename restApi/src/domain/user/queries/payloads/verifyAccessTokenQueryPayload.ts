import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class VerifyAccessTokenQueryPayload {
  @IsString()
  public readonly accessToken: string;

  private constructor({ accessToken }: VerifyAccessTokenQueryPayload) {
    this.accessToken = accessToken;

    Validator.validate(this);
  }

  public static create(input: VerifyAccessTokenQueryPayload): VerifyAccessTokenQueryPayload {
    return new VerifyAccessTokenQueryPayload({ ...input });
  }
}
