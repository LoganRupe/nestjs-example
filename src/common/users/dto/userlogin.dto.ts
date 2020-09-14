import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  
  @ApiProperty({ example: 'jbloggs', description: 'The Username credential for the User' })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: 'Password123',
    description: `The Password credential for the User`,
  })
  @IsString()
  readonly password: string;
}