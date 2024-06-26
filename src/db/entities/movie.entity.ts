import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenreEntity } from './genre.entity';

@Entity({ name: 'movies', synchronize: false })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  synopsis: string;

  @ManyToMany(() => GenreEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'movie_genres',
    joinColumn: {
      name: 'movieId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genreId',
      referencedColumnName: 'id',
    },
  })
  genres?: GenreEntity[];
}
