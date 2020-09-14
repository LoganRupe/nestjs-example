import { ApiProperty } from '@nestjs/swagger';

export class LoginDataResponseSchema {
  @ApiProperty({ example: 'abc-123-JWT...', description: 'The JSON Web Token (JWT)' })
  readonly access_token: string;
}