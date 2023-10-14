import { IsNotEmpty, IsString } from 'class-validator';

export class ForecastDto {
  @IsNotEmpty()
  @IsString()
  lat: string;

  @IsNotEmpty()
  @IsString()
  lon: string;

  @IsNotEmpty()
  @IsString()
  exclude: string;
}
