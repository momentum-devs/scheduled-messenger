import { Knex } from 'knex';

import { Migration } from '../migration.js';

export class CreateUsersTableMigration1 implements Migration {
  public readonly name = 'CreateUsersTableMigration1';

  public async up({ schema }: Knex): Promise<void> {
    await schema.createTable('users', (table) => {
      table.text('id');
      table.text('email').notNullable();
      table.text('password').notNullable();

      table.primary(['id']);
      table.unique(['email']);
    });
  }

  public async down({ schema }: Knex): Promise<void> {
    await schema.dropTable('users');
  }
}
