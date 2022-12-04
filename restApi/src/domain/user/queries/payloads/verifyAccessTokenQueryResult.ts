import { IsString } from '../../../../common/validator/decorators.js';
import { Validator } from '../../../../common/validator/validator.js';

export class VerifyAccessTokenQueryResult {
  @IsString()
  public readonly userId: string;

  private constructor({ userId }: VerifyAccessTokenQueryResult) {
    this.userId = userId;

    Validator.validate(this);
  }

  public static create(input: VerifyAccessTokenQueryResult): VerifyAccessTokenQueryResult {
    return new VerifyAccessTokenQueryResult({ ...input });
  }
}
