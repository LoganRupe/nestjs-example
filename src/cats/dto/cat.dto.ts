import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CatDto {
  @ApiProperty({ example: 'Kitty', description: 'The name of the Cat' })
  @IsString()
  readonly name: string;

  
  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  @IsInt()
  readonly age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  @IsString()
  readonly breed: string;
}
