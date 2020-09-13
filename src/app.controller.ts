import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { HealthModule } from './health/health.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [HealthModule, CatsModule, CoreModule],
})
export class AppController {}
