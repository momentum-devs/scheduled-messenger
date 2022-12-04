import { QueryBuilder } from '../../../common/postgres/queryBuilder.js';
import { UserMapper } from '../mappers/userMapper.js';
import { User } from '../user.js';
import { UserEntity } from '../userEntity.js';
import { CreateOnePayload } from './payloads/createOnePayload.js';
import { FindOnePayload, FindOnePayloadInput } from './payloads/findOnePayload.js';
import { UserRepository } from './userRepository.js';

export class UserRepositoryImpl implements UserRepository {
  private readonly usersTableName = 'users';

  public constructor(private readonly queryBuilder: QueryBuilder, private readonly userMapper: UserMapper) {}

  public async createOne(input: CreateOnePayload): Promise<void> {
    const data = CreateOnePayload.create(input);

    await this.queryBuilder<UserEntity>(this.usersTableName).insert(data);
  }

  public async findOne(input: FindOnePayloadInput): Promise<User | null> {
    const { id, email } = FindOnePayload.create(input);

    try {
      let query = this.queryBuilder<UserEntity>(this.usersTableName);

      if (id) {
        query = query.where('id', '=', id);
      } else if (email) {
        query = query.where('email', '=', email);
      }

      const result = await query.first();

      const userEntity = result as UserEntity;

      return this.userMapper.map(userEntity);
    } catch (error) {
      return null;
    }
  }
}
