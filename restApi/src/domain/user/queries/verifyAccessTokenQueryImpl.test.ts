import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { UserTestFactory } from '../../../tests/factories/userTestFactory.js';
import { UserNotFoundError } from '../errors/userNotFoundError.js';
import { TokenService } from '../services/tokenService.js';
import { VerifyAccessTokenQueryImpl } from './verifyAccessTokenQueryImpl.js';

describe('VerifyAccessTokenQueryImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let tokenService: TokenService;
  let verifyAccessTokenQueryImpl: VerifyAccessTokenQueryImpl;

  const userTestFactory = new UserTestFactory();

  beforeEach(async () => {
    tokenService = new DummyFactory().create();
    verifyAccessTokenQueryImpl = new VerifyAccessTokenQueryImpl(tokenService);
  });

  it('verifies an access token', async () => {
    expect.assertions(2);

    const user = userTestFactory.create();

    const accessToken = 'accessToken';

    spyFactory.create(tokenService, 'verifyAccessToken').mockImplementation(async () => {
      return { userId: user.id };
    });

    const result = await verifyAccessTokenQueryImpl.verifyAccessToken({ accessToken });

    expect(tokenService.verifyAccessToken).toHaveBeenCalledWith(accessToken);
    expect(result.userId).toEqual(user.id);
  });

  it('throws when userId not found in access token payload', async () => {
    expect.assertions(1);

    const user = userTestFactory.create();

    const accessToken = 'accessToken';

    spyFactory.create(tokenService, 'verifyAccessToken').mockImplementation(async () => {
      return { xxx: user.id };
    });

    try {
      await verifyAccessTokenQueryImpl.verifyAccessToken({ accessToken });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);
    }
  });
});
