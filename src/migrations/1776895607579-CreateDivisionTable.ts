import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDivisionTable1776895607579 implements MigrationInterface {
    name = 'CreateDivisionTable1776895607579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`divisions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`collaborator_count\` int NOT NULL, \`level\` int NOT NULL, \`ambassador_name\` varchar(100) NULL, \`parent_id\` int NULL, UNIQUE INDEX \`IDX_9f6740ab8384ad72ec1da19a66\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`divisions\` ADD CONSTRAINT \`FK_25049bb838fb823196d986c1653\` FOREIGN KEY (\`parent_id\`) REFERENCES \`divisions\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`divisions\` DROP FOREIGN KEY \`FK_25049bb838fb823196d986c1653\``);
        await queryRunner.query(`DROP INDEX \`IDX_9f6740ab8384ad72ec1da19a66\` ON \`divisions\``);
        await queryRunner.query(`DROP TABLE \`divisions\``);
    }

}
