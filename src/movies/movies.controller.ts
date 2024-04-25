import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FindAllParameters, FindOneParameters, MovieDto } from './movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() movie: MovieDto): Promise<MovieDto> {
    return this.moviesService.create(movie);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<MovieDto[]> {
    return this.moviesService.findAll(params);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<MovieDto> {
    return this.moviesService.findOne(id);
  }

  @Put('/:id')
  async update(@Param() params: FindOneParameters, @Body() movie: MovieDto) {
    return this.moviesService.update(params.id, movie);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
