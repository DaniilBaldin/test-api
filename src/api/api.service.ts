import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Api } from './api.entity';
import { ApiRepository } from './api.repository';
import { ForecastDto } from './dto/forecast.dto';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(ApiRepository)
    private apiRepository: ApiRepository,
  ) {}

  async getForecast(forecastDto: ForecastDto): Promise<Api[]> {
    return this.apiRepository.getForecast(forecastDto);
  }

  async fetchForecast(forecastDto: ForecastDto): Promise<Api> {
    return this.apiRepository.fetchForecast(forecastDto);
  }
}
