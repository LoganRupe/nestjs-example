import { ApiProperty } from '@nestjs/swagger';
import { LoginDataResponseSchema } from './login.data.response.schema';

export class LoginResponseSchema {
  @ApiProperty({ type: LoginDataResponseSchema })
  readonly data: LoginDataResponseSchema;
}