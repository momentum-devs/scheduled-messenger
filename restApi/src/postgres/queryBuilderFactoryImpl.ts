import knex from 'knex';
import { QueryBuilder } from './queryBuilder.js';
import { QueryBuilderConfig } from './queryBuilderConfig.js';
import { QueryBuilderFactory } from './queryBuilderFactory.js';

export class QueryBuilderFactoryImpl implements QueryBuilderFactory {
  public create(config: QueryBuilderConfig): QueryBuilder {
    const { host, user, password, databaseName } = config;

    return knex.knex({
      client: 'pg',
      connection: {
        host,
        port: 5432,
        user,
        password,
        database: databaseName,
      },
      pool: {
        min: 1,
        max: 1,
      },
    });
  }
}
