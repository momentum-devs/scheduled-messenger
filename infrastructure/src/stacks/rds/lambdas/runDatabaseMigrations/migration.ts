import { Knex } from 'knex';

export interface Migration {
  readonly name: string;
  up(schemaBuilder: Knex): Promise<void>;
  down(schemaBuilder: Knex): Promise<void>;
}
