import {
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { ForecastDto } from './dto/forecast.dto';
import { CustomInterceptors } from './interceptors/custom.interceptor';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('/get-forecast')
  @UseInterceptors(CustomInterceptors)
  getForecast(
    @Query(new ValidationPipe())
    forecastDto: ForecastDto,
  ) {
    return this.apiService.getForecast(forecastDto);
  }

  @Post('/fetch-forecast')
  returnForecast(
    @Query(new ValidationPipe())
    forecastDto: ForecastDto,
  ) {
    return this.apiService.fetchForecast(forecastDto);
  }
}
