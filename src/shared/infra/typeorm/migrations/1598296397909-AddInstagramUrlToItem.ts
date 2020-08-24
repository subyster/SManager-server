import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddInstagramUrlToItem1598296397909
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'instagram_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('items', 'instagram_url');
  }
}
