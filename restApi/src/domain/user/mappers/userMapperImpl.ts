import { User } from '../user.js';
import { UserEntity } from '../userEntity.js';
import { UserMapper } from './userMapper.js';

export class UserMapperImpl implements UserMapper {
  public map({ id, email, password, email_password }: UserEntity): User {
    return new User({ id, email, emailPassword: email_password, password });
  }
}
