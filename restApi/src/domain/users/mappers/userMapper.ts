import { User } from '../user.js';
import { UserEntity } from '../userEntity.js';

export interface UserMapper {
  map(userEntity: UserEntity): User;
}
