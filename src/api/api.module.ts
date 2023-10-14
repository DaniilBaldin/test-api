import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { Api } from './api.entity';
import { ApiRepository } from './api.repository';
import { ApiService } from './api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Api])],
  controllers: [ApiController],
  providers: [ApiService, ApiRepository],
})
export class ApiModule {}
