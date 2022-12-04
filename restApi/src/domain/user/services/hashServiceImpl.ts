import bcrypt from 'bcryptjs';
import { HashService } from './hashService.js';

export class HashServiceImpl implements HashService {
  public constructor(private readonly hashSaltRounds: number) {}

  public async hashPassword(plaintextPassword: string): Promise<string> {
    const salt = await this.generateSalt();

    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

    return hashedPassword;
  }

  public async comparePasswords(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hashedPassword);
  }

  private async generateSalt(): Promise<string> {
    return bcrypt.genSalt(this.hashSaltRounds);
  }
}
