export interface HashService {
  hashPassword(plaintextPassword: string): Promise<string>;
  comparePasswords(plaintextPassword: string, hashedPassword: string): Promise<boolean>;
}
