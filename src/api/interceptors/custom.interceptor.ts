import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Api } from '../api.entity';

export class CustomInterceptors implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) =>
        data
          .sort((a: Api, b: Api) => {
            return (
              new Date(b.dateCreated).getTime() -
              new Date(a.dateCreated).getTime()
            );
          })
          .map((item: Api) => {
            if (!item.response.current) {
              throw new NotFoundException('Current weather was excluded.');
            } else {
              const res = {
                sunrise: item.response.current.sunrise,
                sunset: item.response.current.sunset,
                temp: item.response.current.temp,
                feels_like: item.response.current.feels_like,
                pressure: item.response.current.pressure,
                humidity: item.response.current.humidity,
                uvi: item.response.current.uvi,
                wind_speed: item.response.current.wind_speed,
              };
              return res;
            }
          }),
      ),
    );
  }
}
