import 'reflect-metadata';

import { APIGatewayEvent, Handler, ProxyResult } from 'aws-lambda';

import {
  QueryBuilderFactoryImpl,
  UserMapperImpl,
  UserRepositoryImpl,
  HashServiceImpl,
  RegisterUserCommandImpl,
} from 'rest-api';
import { EnvKey } from '../../../../config/envKey.js';

const databaseName = process.env[EnvKey.databaseName] as string;
const host = process.env[EnvKey.databaseHost] as string;
const user = process.env[EnvKey.databaseUser] as string;
const databasePassword = process.env[EnvKey.databasePassword] as string;
const hashSaltRounds = parseInt(process.env[EnvKey.hashSaltRounds] as string);

const databaseQueryBuilder = new QueryBuilderFactoryImpl().create({
  databaseName,
  host,
  password: databasePassword,
  user,
});

const userMapper = new UserMapperImpl();
const userRepository = new UserRepositoryImpl(databaseQueryBuilder, userMapper);
const hashService = new HashServiceImpl(hashSaltRounds);
const registerUserCommand = new RegisterUserCommandImpl(hashService, userRepository);

export const lambda: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
  const { email, emailPassword, password } = JSON.parse(event.body as string);

  await registerUserCommand.registerUser({ email, emailPassword, password });

  return {
    statusCode: 201,
    body: '',
  };
};
