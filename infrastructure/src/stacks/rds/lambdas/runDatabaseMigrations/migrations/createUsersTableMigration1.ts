import { Knex } from 'knex';

import { Migration } from '../migration.js';

export class CreateUsersTableMigration1 implements Migration {
  public readonly name = 'CreateUsersTableMigration1';

  public async up({ schema }: Knex): Promise<void> {
    await schema.createTable('users', (table) => {
      table.text('id');
      table.text('name').notNullable();
      table.text('password').notNullable();
      table.text('email').notNullable();

      table.primary(['id']);
      table.unique(['email']);
    });
  }

  public async down({ schema }: Knex): Promise<void> {
    await schema.dropTable('users');
  }
}
