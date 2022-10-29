import { Migration } from './migration.js';
import { CreateMessagesTableMigration3 } from './migrations/createMessagesTableMigration3.js';
import { CreateRecipientsTableMigration2 } from './migrations/createRecipientsTableMigration2.js';
import { CreateUsersTableMigration1 } from './migrations/createUsersTableMigration1.js';

export class MigrationSource {
  public async getMigrations(): Promise<Migration[]> {
    return [
      new CreateUsersTableMigration1(),
      new CreateRecipientsTableMigration2(),
      new CreateMessagesTableMigration3(),
    ];
  }

  public getMigrationName(migration: Migration): string {
    return migration.name;
  }

  public async getMigration(migration: Migration): Promise<Migration> {
    return migration;
  }
}
