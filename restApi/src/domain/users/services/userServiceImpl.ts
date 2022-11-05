import { UserAlreadyExistsError } from '../errors/userAlreadyExistsError.js';
import { UserRepository } from '../repositories/userRepository.js';
import { User } from '../user.js';
import { HashService } from './hashService.js';
import { TokenService } from './tokenService.js';
import { UserService } from './userService.js';
import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from '../errors/userNotFoundError.js';

export class UserServiceImpl implements UserService {
  public constructor(
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  public async registerUser(email: string, password: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({ email });

    if (existingUser) {
      throw new UserAlreadyExistsError({ email });
    }

    await this.userRepository.createOne({
      id: uuidv4(),
      email,
      password: await this.hashService.hashPassword(password),
    });
  }

  public async loginUser(email: string, password: string): Promise<string> {
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

    return accessToken;
  }

  public async findUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new UserNotFoundError({ id: userId });
    }

    return user;
  }
}
