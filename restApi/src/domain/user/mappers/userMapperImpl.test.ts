import { describe, beforeEach, it, expect } from 'vitest';
import { UserEntityTestFactory } from '../../../tests/factories/userEntityTestFactory.js';
import { UserMapperImpl } from './userMapperImpl.js';

describe('UserMapperImpl', () => {
  let userMapperImpl: UserMapperImpl;

  const userEntityTestFactory = new UserEntityTestFactory();

  beforeEach(async () => {
    userMapperImpl = new UserMapperImpl();
  });

  it('maps user entity to user', async () => {
    expect.assertions(1);

    const userEntity = userEntityTestFactory.create();

    const result = userMapperImpl.map(userEntity);

    expect(result).toEqual({
      id: userEntity.id,
      email: userEntity.email,
      emailPassword: userEntity.email_password,
      password: userEntity.password,
    });
  });
});
