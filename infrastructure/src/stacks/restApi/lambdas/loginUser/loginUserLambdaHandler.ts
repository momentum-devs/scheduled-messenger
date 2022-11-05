import 'reflect-metadata';

import { APIGatewayEvent, Handler, ProxyResult } from 'aws-lambda';

import {
  QueryBuilderFactoryImpl,
  UserMapperImpl,
  UserRepositoryImpl,
  HashServiceImpl,
  TokenServiceImpl,
  LoginUserCommandImpl,
} from 'rest-api';
import { EnvKey } from '../../../../config/envKey.js';

const databaseName = process.env[EnvKey.databaseName] as string;
const host = process.env[EnvKey.databaseHost] as string;
const user = process.env[EnvKey.databaseUser] as string;
const databasePassword = process.env[EnvKey.databasePassword] as string;
const jwtSecret = process.env[EnvKey.jwtSecret] as string;
const jwtExpiresIn = parseInt(process.env[EnvKey.jwtExpiresIn] as string);
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
const tokenService = new TokenServiceImpl(jwtSecret, jwtExpiresIn);
const loginUserCommand = new LoginUserCommandImpl(hashService, tokenService, userRepository);

export const lambda: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
  const { email, password } = JSON.parse(event.body as string);

  const { accessToken } = await loginUserCommand.loginUser({ email, password });

  return {
    statusCode: 200,
    body: JSON.stringify({ accessToken }),
  };
};
