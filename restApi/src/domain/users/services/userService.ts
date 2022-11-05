import { User } from '../user.js';

export interface UserService {
  registerUser(email: string, password: string): Promise<void>;
  loginUser(email: string, password: string): Promise<string>;
  findUser(userId: string): Promise<User>;
}
