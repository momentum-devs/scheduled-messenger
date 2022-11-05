export interface TokenService {
  signAccessToken(data: Record<string, string>): Promise<string>;
  verifyAccessToken(token: string): Promise<Record<string, unknown>>;
}
