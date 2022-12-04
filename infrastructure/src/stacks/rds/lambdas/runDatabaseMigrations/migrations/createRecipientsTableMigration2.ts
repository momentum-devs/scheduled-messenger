import { Knex } from 'knex';

import { Migration } from '../migration.js';

export class CreateRecipientsTableMigration2 implements Migration {
  public readonly name = 'CreateRecipientsTableMigration2';

  public async up({ schema }: Knex): Promise<void> {
    await schema.createTable('recipients', (table) => {
      table.text('id');
      table.text('email').notNullable();
      table.text('name').notNullable();

      table.primary(['id']);
      table.unique(['email', 'name']);
    });
  }

  public async down({ schema }: Knex): Promise<void> {
    await schema.dropTable('recipients');
  }
}
