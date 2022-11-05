import { User } from '../../domain/users/user.js';
import { faker } from '@faker-js/faker';

export class UserTestFactory {
  public create(input: Partial<User> = {}): User {
    return User.create({
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...input,
    });
  }
}
