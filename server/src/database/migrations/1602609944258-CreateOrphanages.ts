import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrphanages1602609944258
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            // unsigned: true,
            // isGenerated: true,
            // generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
          },
          {
            name: 'longitude',
            type: 'decimal',
          },
          {
            name: 'about',
            type: 'text',
          },
          {
            name: 'whatsapp',
            type: 'varchar',
          },
          {
            name: 'instructions',
            type: 'text',
          },
          {
            name: 'opening_hours',
            type: 'text',
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_pending',
            type: 'boolean',
            default: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }
}
