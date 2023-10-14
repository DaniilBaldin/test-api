import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

const mockDto = { lat: '33.44', lon: '22.44', exclude: 'hourly,daily' };

const mockGetResponse = [
  {
    sunrise: 1697169699,
    sunset: 1697209417,
    temp: 287.09,
    feels_like: 286.6,
    pressure: 1021,
    humidity: 79,
    uvi: 0,
    wind_speed: 2.12,
  },
];

const mockPostResponse = {
  request: 'lat=47.9105&lon=33.3918&exclude=hourly,daily',
  response: {
    lat: 47.9105,
    lon: 33.3918,
    timezone: 'Europe/Kiev',
    timezone_offset: 10800,
    current: {
      dt: 1697213736,
      sunrise: 1697169699,
      sunset: 1697209417,
      temp: 287.09,
      feels_like: 286.6,
      pressure: 1021,
      humidity: 79,
      dew_point: 283.51,
      uvi: 0,
      clouds: 95,
      visibility: 10000,
      wind_speed: 2.12,
      wind_deg: 321,
      wind_gust: 2.69,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
    },
  },
  dateCreated: '2023-10-13T16:15:37.043Z',
  id: '1bbfb2ec-a94c-484f-a8cf-21ecc886f036',
};

describe('ApiController', () => {
  let apiController: ApiController;
  let apiService: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getForecast: jest.fn().mockResolvedValue([mockGetResponse]),
            fetchForecast: jest.fn().mockResolvedValue(mockPostResponse),
          },
        },
      ],
    }).compile();

    apiController = module.get<ApiController>(ApiController);
    apiService = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(apiController).toBeDefined();
  });

  describe('getForecast', () => {
    it('should get forecast and return result', async () => {
      await expect(apiController.getForecast(mockDto)).resolves.toEqual([
        mockGetResponse,
      ]);
    });
  });

  describe('fetchForecast', () => {
    it('should fetch forecast and return result', async () => {
      await expect(apiController.returnForecast(mockDto)).resolves.toEqual(
        mockPostResponse,
      );
    });
  });
});
