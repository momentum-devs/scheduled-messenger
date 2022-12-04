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
      table.text('sendDate').notNullable();
      table.enum('repeatBy', ['DAY', 'WEEK', 'MONTH', 'YEAR']);
      table.text('userId');
      table.text('recipientId');

      table.primary(['id']);
      table.foreign('userId').references('id').inTable('users').onDelete('CASCADE');
      table.foreign('recipientId').references('id').inTable('recipients').onDelete('CASCADE');
    });
  }

  public async down({ schema }: Knex): Promise<void> {
    await schema.dropTable('messages');
  }
}
