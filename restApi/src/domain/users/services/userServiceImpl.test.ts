import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { UserTestFactory } from '../../../tests/factories/userTestFactory.js';
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError.js';
import { UserNotFoundError } from '../errors/userNotFoundError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { HashService } from './hashService.js';
import { TokenService } from './tokenService.js';
import { UserServiceImpl } from './userServiceImpl.js';

describe('UserServiceImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let hashService: HashService;
  let tokenService: TokenService;
  let userRepository: UserRepository;
  let userServiceImpl: UserServiceImpl;

  const userTestFactory = new UserTestFactory();

  beforeEach(async () => {
    userRepository = new DummyFactory().create();
    hashService = new DummyFactory().create();
    tokenService = new DummyFactory().create();
    userServiceImpl = new UserServiceImpl(hashService, tokenService, userRepository);
  });

  describe('Login', () => {
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

      const result = await userServiceImpl.loginUser(email, password);

      expect(userRepository.findOne).toHaveBeenCalledWith({ email });
      expect(hashService.comparePasswords).toHaveBeenCalledWith(password, password);
      expect(tokenService.signAccessToken).toHaveBeenCalledWith({ id });
      expect(result).toEqual(accessToken);
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
        await userServiceImpl.loginUser(email, password);
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
        await userServiceImpl.loginUser(email, password);
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundError);
      }
    });
  });

  describe('Register', () => {
    it('registers user', async () => {
      expect.assertions(2);

      const user = userTestFactory.create();

      const { password: hashedPassword } = userTestFactory.create();

      const { email, password } = user;

      spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
        return null;
      });

      spyFactory.create(hashService, 'hashPassword').mockImplementation(async () => {
        return hashedPassword;
      });

      spyFactory.create(userRepository, 'createOne').mockImplementation(async () => {});

      await userServiceImpl.registerUser(email, password);

      expect(userRepository.findOne).toHaveBeenCalledWith({ email });
      expect(userRepository.createOne).toHaveBeenCalledWith({ id: expect.anything(), email, password: hashedPassword });
    });

    it('throws when user already exists', async () => {
      expect.assertions(1);

      const user = userTestFactory.create();

      const { email, password } = user;

      spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
        return user;
      });

      try {
        await userServiceImpl.registerUser(email, password);
      } catch (error) {
        expect(error).toBeInstanceOf(UserAlreadyExistsError);
      }
    });
  });

  describe('Find user', () => {
    it('finds user', async () => {
      expect.assertions(2);

      const user = userTestFactory.create();

      spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
        return user;
      });

      const result = await userServiceImpl.findUser(user.id);

      expect(userRepository.findOne).toHaveBeenCalledWith({ id: user.id });
      expect(result).toEqual(user);
    });

    it('throws when user not found', async () => {
      expect.assertions(1);

      const user = userTestFactory.create();

      const { id } = user;

      spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
        return null;
      });

      try {
        await userServiceImpl.findUser(id);
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFoundError);
      }
    });
  });
});
