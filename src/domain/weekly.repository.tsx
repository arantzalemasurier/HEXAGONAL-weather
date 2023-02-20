import axios from 'axios';

export interface WeatherData {
  day: string;
  icon: string;
  key: number;
  lTemp: number;
  hTemp: number;
  main: string;
  desc: string;
}

export interface WeeklyRepository {
  getWeeklyForecast(city: string): Promise<WeatherData[]>;
}

export class OpenWeatherMapWeeklyRepository implements WeeklyRepository {
  constructor(private readonly apiKey: string) {}

  async getWeeklyForecast(city: string): Promise<WeatherData[]> {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: this.apiKey,
      },
    });

    const weatherData = response.data.list.filter((data: any) => data.dt_txt.includes('12:00:00')).map((data: any, index: number) => ({
      day: index === 0 ? 'Hoy' : new Date(data.dt_txt).toLocaleDateString('es-ES', { weekday: 'short' }),
      icon: data.weather[0].icon,
      key: index,
      lTemp: Math.round(data.main.temp_min),
      hTemp: Math.round(data.main.temp_max),
      main: data.weather[0].main,
      desc: data.weather[0].description,
    }));

    return weatherData;
  }
}
