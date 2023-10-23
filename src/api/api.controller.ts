import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { error } from 'console';
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
    try {
      return this.apiService.getForecast(forecastDto);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There is an error!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Post('/fetch-forecast')
  returnForecast(
    @Query(new ValidationPipe())
    forecastDto: ForecastDto,
  ) {
    try {
      return this.apiService.fetchForecast(forecastDto);
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There is an error!',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
