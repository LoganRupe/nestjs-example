import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray } from 'class-validator';
import { UserLoginDto } from './userlogin.dto';

export class UserDto extends UserLoginDto {
  @ApiProperty({ example: 1, description: 'The unquie id of the User' })
  @IsInt()
  readonly userId: number;

  
  @ApiProperty({ example: ['Admin'], description: 'The list of roles assigned to the User', enum: ['Admin', 'User'] })
  @IsArray()
  readonly roles: string[];

  // Used in jwt.strategy
  readonly sub?: number;
}