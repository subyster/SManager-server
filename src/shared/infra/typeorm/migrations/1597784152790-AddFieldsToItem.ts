import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldsToItem1597784152790
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'status',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('items', 'avatar');

    await queryRunner.dropColumn('items', 'status');
  }
}
