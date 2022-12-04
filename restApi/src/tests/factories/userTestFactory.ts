import { User } from '../../domain/user/user.js';
import { faker } from '@faker-js/faker';

export class UserTestFactory {
  public create(input: Partial<User> = {}): User {
    return new User({
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...input,
    });
  }
}
