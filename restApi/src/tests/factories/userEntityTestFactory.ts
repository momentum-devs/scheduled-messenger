import { UserEntity } from '../../domain/user/userEntity.js';
import { faker } from '@faker-js/faker';

export class UserEntityTestFactory {
  public create(input: Partial<UserEntity> = {}): UserEntity {
    return { id: faker.datatype.uuid(), email: faker.internet.email(), password: faker.internet.password(), ...input };
  }
}
