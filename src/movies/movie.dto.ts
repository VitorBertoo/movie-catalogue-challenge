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
  @ApiProperty({ example: 'Shrek' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'Ogro conhece princesa' })
  synopsis: string;

  @IsOptional()
  @ApiProperty()
  @ApiProperty({
    isArray: true,
    enum: [
      'adventure',
      'comedy',
      'action',
      'romance',
      'fantasy',
      'historical',
      'horror',
    ],
  })
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
