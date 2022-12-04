import 'reflect-metadata';

import { APIGatewayEvent, APIGatewayProxyEventQueryStringParameters, Handler, ProxyResult } from 'aws-lambda';

import { QueryBuilderFactoryImpl, MessageMapperImpl, MessageRepositoryImpl, FindMessagesQueryImpl } from 'rest-api';
import { EnvKey } from '../../../../config/envKey.js';

const databaseName = process.env[EnvKey.databaseName] as string;
const host = process.env[EnvKey.databaseHost] as string;
const user = process.env[EnvKey.databaseUser] as string;
const databasePassword = process.env[EnvKey.databasePassword] as string;

const databaseQueryBuilder = new QueryBuilderFactoryImpl().create({
  databaseName,
  host,
  password: databasePassword,
  user,
});

const messageMapper = new MessageMapperImpl();
const messageRepositoryImpl = new MessageRepositoryImpl(databaseQueryBuilder, messageMapper);
const findMessagesQueryImpl = new FindMessagesQueryImpl(messageRepositoryImpl);

export const lambda: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
  const { userId } = event.queryStringParameters as APIGatewayProxyEventQueryStringParameters;

  const { messages } = await findMessagesQueryImpl.findMessages({ userId: userId as string });

  return {
    statusCode: 201,
    body: JSON.stringify({ messages }),
  };
};
