import { TokenService } from './tokenService.js';
import jwt from 'jsonwebtoken';

export class TokenServiceImpl implements TokenService {
  public constructor(private readonly jwtSecret: string, private readonly jwtExpiresIn: number) {}

  public async signAccessToken(data: Record<string, string>): Promise<string> {
    return jwt.sign(data, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
  }

  public async verifyAccessToken(token: string): Promise<Record<string, unknown>> {
    const data = jwt.verify(token, this.jwtSecret) as Promise<Record<string, unknown>>;

    return data;
  }
}
