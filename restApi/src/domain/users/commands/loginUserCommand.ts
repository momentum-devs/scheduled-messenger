import { LoginUserCommandPayload } from './payloads/loginUserCommandPayload.js';
import { LoginUserCommandResult } from './payloads/loginUserCommandResult.js';

export interface LoginUserCommand {
  loginUser(input: LoginUserCommandPayload): Promise<LoginUserCommandResult>;
}
