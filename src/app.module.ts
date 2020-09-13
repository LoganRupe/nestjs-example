import { Module } from '@nestjs/common';
import { AuthModule } from './common/auth/auth.module';
import { UsersModule } from './common/users/users.module';
import { HealthModule } from './health/health.module';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [HealthModule, AuthModule, UsersModule, CoreModule, CatsModule],
})
export class AppModule {}
