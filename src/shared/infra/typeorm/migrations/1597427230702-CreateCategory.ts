import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateCategory1597427230702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.dropColumn('items', 'category');

    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'category_name',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        name: 'ItemCategory',
        columnNames: ['category_name'],
        referencedColumnNames: ['name'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('items', 'ItemCategory');

    await queryRunner.dropColumn('items', 'category_name');

    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'category',
        type: 'varchar',
      }),
    );

    await queryRunner.dropTable('categories');
  }
}
