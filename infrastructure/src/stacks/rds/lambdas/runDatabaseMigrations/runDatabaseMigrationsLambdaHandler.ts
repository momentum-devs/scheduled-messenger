import 'reflect-metadata';

import { QueryBuilderFactoryImpl } from 'rest-api';

import { MigrationSource } from './migrationSource.js';

async function runDatabaseMigrations(): Promise<void> {
  const databaseName = process.env['DB_NAME'] as string;
  const host = process.env['DB_HOST'] as string;
  const user = process.env['DB_USERNAME'] as string;
  const password = process.env['DB_PASSWORD'] as string;

  const databaseQueryBuilder = new QueryBuilderFactoryImpl().create({ databaseName, host, password, user });

  console.log('Executing database migrations...');

  await databaseQueryBuilder.migrate.latest({
    migrationSource: new MigrationSource(),
  });

  console.log('Database migrations executed.');
}

export const handler = runDatabaseMigrations;
