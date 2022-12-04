import 'reflect-metadata';

import { APIGatewayEvent, Handler, ProxyResult } from 'aws-lambda';

import {
  QueryBuilderFactoryImpl,
  MessageMapperImpl,
  MessageRepositoryImpl,
  CreateMessageCommandImpl,
  RepeatBy,
  TokenServiceImpl,
  VerifyAccessTokenQueryImpl,
} from 'rest-api';
import { EnvKey } from '../../../../config/envKey.js';

const databaseName = process.env[EnvKey.databaseName] as string;
const host = process.env[EnvKey.databaseHost] as string;
const user = process.env[EnvKey.databaseUser] as string;
const databasePassword = process.env[EnvKey.databasePassword] as string;
const jwtSecret = process.env[EnvKey.jwtSecret] as string;
const jwtExpiresIn = parseInt(process.env[EnvKey.jwtExpiresIn] as string);

const databaseQueryBuilder = new QueryBuilderFactoryImpl().create({
  databaseName,
  host,
  password: databasePassword,
  user,
});

const messageMapper = new MessageMapperImpl();
const messageRepositoryImpl = new MessageRepositoryImpl(databaseQueryBuilder, messageMapper);
const createMessageCommand = new CreateMessageCommandImpl(messageRepositoryImpl);
const tokenService = new TokenServiceImpl(jwtSecret, jwtExpiresIn);
const verifyAccessTokenQuery = new VerifyAccessTokenQueryImpl(tokenService);

export const lambda: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
  const authorizationHeader = event.headers['Authorization'];

  const [_, accessToken] = authorizationHeader?.split(' ') as string[];

  const { userId } = await verifyAccessTokenQuery.verifyAccessToken({ accessToken: accessToken as string });

  const { title, content, displayName, sendDate, repeatBy, recipientId } = JSON.parse(event.body as string);

  const { message } = await createMessageCommand.createMessage({
    title: title as string,
    content: content as string,
    displayName: displayName as string,
    sendDate: sendDate as string,
    repeatBy: repeatBy as RepeatBy,
    recipientId: recipientId as string,
    userId,
  });

  return {
    statusCode: 201,
    body: JSON.stringify({ message }),
  };
};
