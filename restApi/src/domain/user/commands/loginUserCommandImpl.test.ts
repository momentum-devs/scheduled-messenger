import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { UserTestFactory } from '../../../tests/factories/userTestFactory.js';
import { UserNotFoundError } from '../errors/userNotFoundError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { HashService } from '../services/hashService.js';
import { TokenService } from '../services/tokenService.js';
import { LoginUserCommandImpl } from './loginUserCommandImpl.js';

describe('LoginUserCommandImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let hashService: HashService;
  let tokenService: TokenService;
  let userRepository: UserRepository;
  let loginUserCommandImpl: LoginUserCommandImpl;

  const userTestFactory = new UserTestFactory();

  beforeEach(async () => {
    userRepository = new DummyFactory().create();
    hashService = new DummyFactory().create();
    tokenService = new DummyFactory().create();
    loginUserCommandImpl = new LoginUserCommandImpl(hashService, tokenService, userRepository);
  });

  it('logs user in', async () => {
    expect.assertions(4);

    const user = userTestFactory.create();

    const { id, email, password } = user;

    const accessToken = 'accessToken';

    spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
      return user;
    });

    spyFactory.create(hashService, 'comparePasswords').mockImplementation(async () => {
      return true;
    });

    spyFactory.create(tokenService, 'signAccessToken').mockImplementation(async () => {
      return accessToken;
    });

    const result = await loginUserCommandImpl.loginUser({ email, password });

    expect(userRepository.findOne).toHaveBeenCalledWith({ email });
    expect(hashService.comparePasswords).toHaveBeenCalledWith(password, password);
    expect(tokenService.signAccessToken).toHaveBeenCalledWith({ userId: id });
    expect(result.accessToken).toEqual(accessToken);
  });

  it('throws when user not found', async () => {
    expect.assertions(1);

    const { email, password } = userTestFactory.create();

    spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
      return null;
    });

    spyFactory.create(hashService, 'comparePasswords').mockImplementation(async () => {
      return true;
    });

    try {
      await loginUserCommandImpl.loginUser({ email, password });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);
    }
  });

  it('throws when passoword does not match', async () => {
    expect.assertions(1);

    const user = userTestFactory.create();

    const { email, password } = user;

    spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
      return user;
    });

    spyFactory.create(hashService, 'comparePasswords').mockImplementation(async () => {
      return false;
    });

    try {
      await loginUserCommandImpl.loginUser({ email, password });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);
    }
  });
});
