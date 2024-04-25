import { MigrationInterface, QueryRunner } from 'typeorm';
import { genres } from '../../../utils/genres';

export class SeedGenres1714067856175 implements MigrationInterface {
  // typeOrm não tem suporte pra seeds, então eu vou ter que usar o queryRunner para popular os generos de filmes
  public async up(queryRunner: QueryRunner): Promise<void> {
    genres.forEach(async (genre) => {
      await queryRunner.connection
        .createQueryBuilder()
        .insert()
        .into('genres')
        .values({
          name: genre,
        })
        .execute();
    });
  }

  // como essa migration ocorre logo depois da criação de generos
  // eu posso simplesmente apagar todos pra desfazer as alterações
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder().delete();
  }
}
