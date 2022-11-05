import { Knex } from 'knex';

import { Migration } from '../migration.js';

export class CreateMessagesTableMigration3 implements Migration {
  public readonly name = 'CreateMessagesTableMigration3';

  public async up({ schema }: Knex): Promise<void> {
    await schema.createTable('messages', (table) => {
      table.text('id');
      table.text('title').notNullable();
      table.text('content').notNullable();
      table.text('displayName').notNullable();
      table.text('send_date').notNullable();
      table.enum('repeat_by', ['DAY', 'WEEK', 'MONTH', 'YEAR']).notNullable();
      table.text('user_id');
      table.text('recipient_id');

      table.primary(['id']);
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.foreign('recipient_id').references('id').inTable('recipients').onDelete('CASCADE');
    });
  }

  public async down({ schema }: Knex): Promise<void> {
    await schema.dropTable('messages');
  }
}
