import { RegisterUserCommandPayload } from './payloads/registerUserCommandPayload.js';

export interface RegisterUserCommand {
  registerUser(input: RegisterUserCommandPayload): Promise<void>;
}
