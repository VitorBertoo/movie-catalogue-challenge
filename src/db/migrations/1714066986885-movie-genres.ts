import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MovieGenres1714066986885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'genres',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'movie_genres',
        columns: [
          {
            name: 'movieId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'genreId',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['genreId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['movieId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('movie');

    const movieId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('movieId') !== -1,
    );
    const genreId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('genreId') !== -1,
    );

    await queryRunner.dropForeignKeys('movie_genres', [movieId, genreId]);

    await queryRunner.dropTable('movie_genres');
    await queryRunner.dropTable('genres');
  }
}
