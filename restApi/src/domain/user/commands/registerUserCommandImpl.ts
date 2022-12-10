import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { HashService } from '../services/hashService.js';
import { RegisterUserCommandPayload } from './payloads/registerUserCommandPayload.js';
import { RegisterUserCommand } from './registerUserCommand.js';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUserCommandImpl implements RegisterUserCommand {
  public constructor(private readonly hashService: HashService, private readonly userRepository: UserRepository) {}

  public async registerUser(input: RegisterUserCommandPayload): Promise<void> {
    const { email, emailPassword, password } = RegisterUserCommandPayload.create(input);

    console.log('Creating user...', { email });

    const existingUser = await this.userRepository.findOne({ email });

    if (existingUser) {
      throw new UserAlreadyExistsError({ email });
    }

    const hashedPassword = await this.hashService.hashPassword(password);

    await this.userRepository.createOne({
      id: uuidv4(),
      email,
      email_password: emailPassword,
      password: hashedPassword,
    });

    console.log('User created.', { email });
  }
}
