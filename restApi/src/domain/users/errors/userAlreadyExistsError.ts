import { ApplicationError } from '../../../common/errors/applicationError.js';

interface Context {
  readonly email: string;
}

export class UserAlreadyExistsError extends ApplicationError<Context> {
  public constructor(context: Context) {
    super('UserAlreadyExistsError', 'User already exists.', context);
  }
}
