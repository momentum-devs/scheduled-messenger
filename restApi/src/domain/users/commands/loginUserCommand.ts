import { LoginUserCommandPayload } from './payloads/loginUserCommandPayload.js';

export interface LoginUserCommand {
  loginUser(input: LoginUserCommandPayload): Promise<string>;
}
