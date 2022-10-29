import { QueryBuilder } from './queryBuilder.js';
import { QueryBuilderConfig } from './queryBuilderConfig.js';

export interface QueryBuilderFactory {
  create(config: QueryBuilderConfig): QueryBuilder;
}
