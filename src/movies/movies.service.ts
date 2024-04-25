import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindAllParameters, MovieDto } from './movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { GenreEntity } from 'src/db/entities/genre.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async create(movie: MovieDto): Promise<MovieDto> {
    const movieToSave: Partial<MovieEntity> = await this.mapDtoToEntity(movie);

    const createdMovie = await this.movieRepository.save(movieToSave);

    return this.mapEntityToDto(createdMovie);
  }

  async findAll(params: FindAllParameters): Promise<MovieDto[]> {
    const searchParams: FindOptionsWhere<MovieEntity> = {};

    if (params.title) searchParams.title = ILike(`%${params.title}%`);

    const moviesFound = await this.movieRepository.find({
      where: searchParams,
      relations: {
        genres: true,
      },
    });

    return moviesFound.map((movieFound) => this.mapEntityToDto(movieFound));
  }

  async findOne(id: string): Promise<MovieDto> {
    const foundMovie = await this.movieRepository.findOne({ where: { id } });

    if (!foundMovie) throw new NotFoundException('Movie not found');

    return this.mapEntityToDto(foundMovie);
  }

  async update(id: string, movie: MovieDto) {
    const foundMovie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!foundMovie)
      throw new BadRequestException(`Movie with id ${id} not found`);

    const movieEntity = await this.mapDtoToEntity(movie);

    await this.movieRepository.save({ id, ...movieEntity });
  }

  async remove(id: string) {
    const movieFound = await this.movieRepository.findOne({
      where: { id },
    });

    if (!movieFound)
      throw new BadRequestException(`Movie with id ${id} not found`);

    await this.movieRepository.delete(movieFound);
  }

  private mapEntityToDto(movieEntity: MovieEntity): MovieDto {
    const genres = movieEntity.genres.map((genre) => genre.name);

    return {
      id: movieEntity.id,
      title: movieEntity.title,
      synopsis: movieEntity.synopsis,
      genres,
    };
  }

  private async mapDtoToEntity(
    movieDto: MovieDto,
  ): Promise<Partial<MovieEntity>> {
    const genrePromises = await movieDto.genres.map(async (genre) => {
      return await this.genreRepository.findOne({
        where: { name: genre },
      });
    });

    // esperando as promises resolverem
    const genres = await Promise.all(genrePromises);

    return {
      title: movieDto.title,
      synopsis: movieDto.synopsis,
      genres,
    };
  }
}
