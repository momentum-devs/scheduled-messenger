import 'reflect-metadata';

import { APIGatewayEvent, Handler, ProxyResult } from 'aws-lambda';

import {
  QueryBuilderFactoryImpl,
  RecipientMapperImpl,
  RecipientRepositoryImpl,
  CreateRecipientCommandImpl,
} from 'rest-api';
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

const recipientMapper = new RecipientMapperImpl();
const recipientRepository = new RecipientRepositoryImpl(databaseQueryBuilder, recipientMapper);
const createRecipientCommand = new CreateRecipientCommandImpl(recipientRepository);

export const lambda: Handler = async (event: APIGatewayEvent): Promise<ProxyResult> => {
  const { email, name } = JSON.parse(event.body as string);

  const { recipient } = await createRecipientCommand.createRecipient({
    email: email as string,
    name: name as string,
  });

  return {
    statusCode: 201,
    body: JSON.stringify({ recipient }),
  };
};
