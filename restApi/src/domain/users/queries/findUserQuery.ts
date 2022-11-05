import { User } from '../user.js';
import { FindUserQueryPayload } from './payloads/findUserQueryPayload.js';

export interface FindUserQuery {
  findUser(input: FindUserQueryPayload): Promise<User>;
}
