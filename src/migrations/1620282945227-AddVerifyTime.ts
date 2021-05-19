import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVerifyTime1620282945227 implements MigrationInterface {
    name = 'AddVerifyTime1620282945227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "date_verified" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_verified"`);
    }

}
