import { UserNotFoundError } from '../errors/userNotFoundError.js';
import { TokenService } from '../services/tokenService.js';
import { VerifyAccessTokenQueryPayload } from './payloads/verifyAccessTokenQueryPayload.js';
import { VerifyAccessTokenQueryResult } from './payloads/verifyAccessTokenQueryResult.js';
import { VerifyAccessTokenQuery } from './verifyAccessTokenQuery.js';

export class VerifyAccessTokenQueryImpl implements VerifyAccessTokenQuery {
  public constructor(private readonly tokenService: TokenService) {}

  public async verifyAccessToken(input: VerifyAccessTokenQueryPayload): Promise<VerifyAccessTokenQueryResult> {
    const { accessToken } = VerifyAccessTokenQueryPayload.create(input);

    console.log('Verifying access token...', { accessToken });

    const payload = await this.tokenService.verifyAccessToken(accessToken);

    const userId = payload['userId'] as string;

    if (!userId) {
      throw new UserNotFoundError();
    }

    console.log('Access token verified.', { accessToken, userId });

    return VerifyAccessTokenQueryResult.create({ userId });
  }
}
