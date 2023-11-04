import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPhoneToUser1699128622370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'phone',
        type: 'string',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'createdAt');
  }
}
