import { describe, beforeEach, vi, it, expect } from 'vitest';
import { DummyFactory } from '../../../tests/factories/dummyFactory.js';
import { SpyFactory } from '../../../tests/factories/spyFactory.js';
import { UserTestFactory } from '../../../tests/factories/userTestFactory.js';
import { UserNotFoundError } from '../errors/userNotFoundError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { FindUserQueryImpl } from './findUserQueryImpl.js';

describe('FindUserQueryImpl', () => {
  const spyFactory = new SpyFactory(vi);

  let userRepository: UserRepository;
  let findUserQueryImpl: FindUserQueryImpl;

  const userTestFactory = new UserTestFactory();

  beforeEach(async () => {
    userRepository = new DummyFactory().create();
    findUserQueryImpl = new FindUserQueryImpl(userRepository);
  });

  it('finds user', async () => {
    expect.assertions(2);

    const user = userTestFactory.create();

    spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
      return user;
    });

    const result = await findUserQueryImpl.findUser({ userId: user.id });

    expect(userRepository.findOne).toHaveBeenCalledWith({ id: user.id });
    expect(result).toEqual(user);
  });

  it('throws when user not found', async () => {
    expect.assertions(1);

    const user = userTestFactory.create();

    spyFactory.create(userRepository, 'findOne').mockImplementation(async () => {
      return null;
    });

    try {
      await findUserQueryImpl.findUser({ userId: user.id });
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);
    }
  });
});
