import { WeatherData } from "./weekly.repository";

export interface WeeklyForecast {
  weekData: WeatherData[];
}

export function mapWeeklyForecastToViewModel(data: WeatherData[]): WeeklyForecast {
  return {
    weekData: data,
  };
}
