import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelations1620815441971 implements MigrationInterface {
  name = 'AddRelations1620815441971';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message" ADD "chat_id" integer`);
    await queryRunner.query(`ALTER TABLE "chat" ADD "user_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "chat" ADD "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ADD "date_updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat" ADD CONSTRAINT "FK_15d83eb496fd7bec7368b30dbf3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat" DROP CONSTRAINT "FK_15d83eb496fd7bec7368b30dbf3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`,
    );
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "date_updated"`);
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "date_created"`);
    await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "chat_id"`);
  }
}
