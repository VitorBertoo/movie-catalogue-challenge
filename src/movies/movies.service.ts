import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindAllParameters, MovieDto } from './movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from 'src/db/entities/movie.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async create(movie: MovieDto): Promise<MovieDto> {
    const movieToSave: MovieEntity = {
      title: movie.title,
      synopsis: movie.synopsis,
    };

    const createdMovie = await this.movieRepository.save(movieToSave);

    return this.mapEntityToDto(createdMovie);
  }

  async findAll(params: FindAllParameters): Promise<MovieDto[]> {
    const searchParams: FindOptionsWhere<MovieEntity> = {};

    if (params.title) searchParams.title = ILike(`%${params.title}%`);

    const moviesFound = await this.movieRepository.find({
      where: searchParams,
    });

    return moviesFound.map((movieFound) => this.mapEntityToDto(movieFound));
  }

  async findOne(id: string): Promise<MovieDto> {
    const foundMovie = await this.movieRepository.findOne({ where: { id } });

    if (!foundMovie) throw new NotFoundException('Movie not found');

    return this.mapEntityToDto(foundMovie);
  }

  async update(id: string, movie: MovieDto) {
    const foundMovie = await this.movieRepository.findOne({ where: { id } });

    if (!foundMovie)
      throw new BadRequestException(`Movie with id ${id} not found`);

    await this.movieRepository.update(id, this.mapDtoToEntity(movie));
  }

  async remove(id: string) {
    const result = await this.movieRepository.delete(id);

    if (!result.affected)
      throw new BadRequestException(`Movie with id ${id} not found`);
  }

  private mapEntityToDto(movieEntity: MovieEntity): MovieDto {
    return {
      id: movieEntity.id,
      title: movieEntity.title,
      synopsis: movieEntity.synopsis,
    };
  }

  private mapDtoToEntity(movieDto: MovieDto): Partial<MovieEntity> {
    return {
      title: movieDto.title,
      synopsis: movieDto.synopsis,
    };
  }
}
