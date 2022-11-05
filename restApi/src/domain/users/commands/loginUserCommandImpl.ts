import { UserNotFoundError } from '../errors/userNotFoundError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { HashService } from '../services/hashService.js';
import { TokenService } from '../services/tokenService.js';
import { LoginUserCommand } from './loginUserCommand.js';
import { LoginUserCommandPayload } from './payloads/loginUserCommandPayload.js';
import { LoginUserCommandResult } from './payloads/loginUserCommandResult.js';

export class LoginUserCommandImpl implements LoginUserCommand {
  public constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  public async loginUser(input: LoginUserCommandPayload): Promise<LoginUserCommandResult> {
    const { email, password } = LoginUserCommandPayload.create(input);

    console.log('Logging user in...', { email });

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UserNotFoundError({ email });
    }

    const isPasswordValid = await this.hashService.comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new UserNotFoundError({ email });
    }

    const accessToken = await this.tokenService.signAccessToken({
      id: user.id,
    });

    console.log('User logged in.', { email, id: user.id });

    return LoginUserCommandResult.create({ accessToken });
  }
}
