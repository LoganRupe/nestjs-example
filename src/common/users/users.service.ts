import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        roles: ['admin']
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        roles: ['admin']
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        roles: ['admin']
      },
    ];
  }

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.users.find(user => user.username === username);
  }
}
