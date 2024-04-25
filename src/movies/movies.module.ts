import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { GenreEntity } from 'src/db/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, GenreEntity])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
