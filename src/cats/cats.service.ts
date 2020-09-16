import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CatDto } from './dto/cat.dto';

@Injectable()
export class CatsService {
  constructor(@Inject('CAT_MODEL') private readonly catModel: Model<CatDto>) {}

  create(cat: CatDto) {
    const createdCat = new this.catModel(cat);
    return createdCat.save();
  }

  findAll(): Promise<CatDto[]> {
    return this.catModel.find().exec();
  }
  
  findOne(id: number): any {
    return this.catModel.findOne({ id: id }).exec();
  }
}
