import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieTable1713983013463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
        CREATE TABLE movies (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            title varchar(256) NOT NULL,
            synopsis varchar(512) NULL,
            
            CONSTRAINT movie_pk PRIMARY KEY (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
  }
}
