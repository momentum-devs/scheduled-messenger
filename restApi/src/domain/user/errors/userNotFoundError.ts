import { ApplicationError } from '../../../common/errors/applicationError.js';

interface EmailContext {
  readonly email: string;
}

interface IdContext {
  readonly id: string;
}

export class UserNotFoundError extends ApplicationError<EmailContext | IdContext | void> {
  public constructor(context: EmailContext | IdContext | void) {
    super('UserNotFoundError', 'User not found.', context);
  }
}
