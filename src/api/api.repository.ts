import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DataSource, Repository } from 'typeorm';
import { Api } from './api.entity';
import { ForecastDto } from './dto/forecast.dto';

@Injectable()
export class ApiRepository extends Repository<Api> {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super(Api, dataSource.createEntityManager());
  }

  async getForecast(forecastDto: ForecastDto) {
    const { lat, lon, exclude } = forecastDto;

    const result = await this.find({
      where: {
        lat: lat,
        lon: lon,
        exclude: exclude,
      },
    });

    if (!result.length) {
      throw new NotFoundException('Request not found!');
    }

    return result;
  }

  async fetchForecast(forecastDto: ForecastDto) {
    const { lat, lon, exclude } = forecastDto;
    const API = this.configService.get('API_ENDPOINT');
    const API_KEY = this.configService.get('API_KEY');

    const response = await axios.get(
      `${API}?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`,
    );

    const result = this.create({
      lat,
      lon,
      exclude,
      response: response.data,
      dateCreated: new Date().toISOString(),
    });

    await this.save(result);
    return result;
  }
}
