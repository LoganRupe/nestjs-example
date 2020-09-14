import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../common/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 201 })
  @Roles('admin')
  async create(@Body() createCatDto: CatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all cats' })
  @ApiResponse({ 
    status: 200, 
    description: 'All Cat records.',
    type: [CatDto]
  })
  async findAll(): Promise<CatDto[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find cat.' })  
  @ApiResponse({
    status: 200,
    description: 'The found record.',
    type: CatDto
  })
  findOne(
    @Param('id', new ParseIntPipe()) id: number): CatDto {
    return this.catsService.findOne(+id);
  }
}
