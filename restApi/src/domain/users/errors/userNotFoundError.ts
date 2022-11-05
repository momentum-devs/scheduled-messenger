import { ApplicationError } from '../../../common/errors/applicationError.js';

interface EmailContext {
  readonly email: string;
}

interface IdContext {
  readonly id: string;
}

export class UserNotFoundError extends ApplicationError<EmailContext | IdContext> {
  public constructor(context: EmailContext | IdContext) {
    super('UserNotFoundError', 'User not found.', context);
  }
}
