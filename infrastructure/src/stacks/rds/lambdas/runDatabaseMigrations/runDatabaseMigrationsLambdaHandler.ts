import 'reflect-metadata';

import { QueryBuilderFactoryImpl } from 'rest-api';

import { MigrationSource } from './migrationSource.js';

import { Handler } from 'aws-lambda';
import { EnvKey } from '../../../../config/envKey.js';

export const lambda: Handler = async () => {
  const databaseName = process.env[EnvKey.databaseName] as string;
  const host = process.env[EnvKey.databaseHost] as string;
  const user = process.env[EnvKey.databaseUser] as string;
  const password = process.env[EnvKey.databasePassword] as string;

  const databaseQueryBuilder = new QueryBuilderFactoryImpl().create({ databaseName, host, password, user });

  console.log('Executing database migrations...');

  await databaseQueryBuilder.migrate.latest({
    migrationSource: new MigrationSource(),
  });

  console.log('Database migrations executed.');
};
