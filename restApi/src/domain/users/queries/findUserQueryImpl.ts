import { UserNotFoundError } from '../errors/userNotFoundError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { User } from '../user.js';
import { FindUserQuery } from './findUserQuery.js';
import { FindUserQueryPayload } from './payloads/findUserQueryPayload.js';

export class FindUserQueryImpl implements FindUserQuery {
  public constructor(private readonly userRepository: UserRepository) {}

  public async findUser(input: FindUserQueryPayload): Promise<User> {
    const { userId } = FindUserQueryPayload.create(input);

    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UserNotFoundError({ id: userId });
    }

    return user;
  }
}
