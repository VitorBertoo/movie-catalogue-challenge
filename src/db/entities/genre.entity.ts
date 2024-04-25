import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity({ name: 'genres' })
export class GenreEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => MovieEntity, { cascade: true })
  @JoinTable({
    name: 'movie_genres',
    joinColumn: {
      name: 'genreId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'movieId',
      referencedColumnName: 'id',
    },
  })
  movies: MovieEntity[];
}
