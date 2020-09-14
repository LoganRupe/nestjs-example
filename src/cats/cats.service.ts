import { Injectable } from '@nestjs/common';
import { CatDto } from './dto/cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: CatDto[] = [];

  create(cat: CatDto) {
    this.cats.push(cat);
  }

  findAll(): CatDto[] {
    return this.cats;
  }
  
  findOne(id: number): CatDto {
    return this.cats[id];
  }
}
