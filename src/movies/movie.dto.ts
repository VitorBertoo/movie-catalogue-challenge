import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MovieDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  synopsis: string;

  @IsOptional()
  @ApiProperty()
  genres?: string[];
}

export class FindAllParameters {
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsOptional()
  title: string;
}

export class FindOneParameters {
  @IsUUID()
  id: string;
}
