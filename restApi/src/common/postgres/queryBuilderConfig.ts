import { IsString } from '../validator/decorators.js';
import { Validator } from '../validator/validator.js';

export class QueryBuilderConfig {
  @IsString()
  public readonly host: string;

  @IsString()
  public readonly user: string;

  @IsString()
  public readonly password: string;

  @IsString()
  public readonly databaseName: string;

  public constructor({ host, user, password, databaseName }: QueryBuilderConfig) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.databaseName = databaseName;

    Validator.validate(this);
  }
}
