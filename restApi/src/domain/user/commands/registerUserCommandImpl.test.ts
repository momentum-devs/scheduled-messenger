import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { UserTestFactory } from '../../../tests/factories/userTestFactory.js';
import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { HashService } from '../services/hashService.js';
import { RegisterUserCommandImpl } from './registerUserCommandImpl.js';

describe('RegisterUserCommandImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let hashService: HashService;
  let userRepository: UserRepository;
  let registerUserCommandImpl: RegisterUserCommandImpl;

  const userTestFactory = new UserTestFactory();

  beforeEach(async () => {
    userRepository = new DummyFactory().create();
    hashService = new DummyFactory().create();
    registerUserCommandImpl = new RegisterUserCommandImpl(hashService, userRepository);
  });

  it('registers user', async () => {
    expect.assertions(2);

    const user = userTestFactory.create();

    const { password: hashedPassword } = userTestFactory.create();

    const { email, emailPassword, password } = user;

    spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
      return null;
    });

    spyFactory.create(hashService, 'hashPassword').mockImplementation(async () => {
      return hashedPassword;
    });

    spyFactory.create(userRepository, 'createOne').mockImplementation(async () => {});

    await registerUserCommandImpl.registerUser({ email, emailPassword, password });

    expect(userRepository.findOne).toHaveBeenCalledWith({ email });
    expect(userRepository.createOne).toHaveBeenCalledWith({
      id: expect.anything(),
      email,
      email_password: emailPassword,
      password: hashedPassword,
    });
  });

  it('throws when user already exists', async () => {
    expect.assertions(1);

    const user = userTestFactory.create();

    const { email, emailPassword, password } = user;

    spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
      return user;
    });

    try {
      await registerUserCommandImpl.registerUser({ email, emailPassword, password });
    } catch (error) {
      expect(error).toBeInstanceOf(UserAlreadyExistsError);
    }
  });
});
