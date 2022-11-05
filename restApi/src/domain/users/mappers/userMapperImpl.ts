import { User } from '../user.js';
import { UserEntity } from '../userEntity.js';
import { UserMapper } from './userMapper.js';

export class UserMapperImpl implements UserMapper {
  public map({ id, email, password }: UserEntity): User {
    return User.create({ id, email, password });
  }
}
