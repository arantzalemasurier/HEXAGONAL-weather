import { WeatherData } from "../domain/weekly.repository";

export interface WeeklyPresenter {
  render(weekData: WeatherData[]): void;
}

export class WeeklyPresenterImpl implements WeeklyPresenter {
  constructor(private view: WeeklyView) {}

  render(weekData: WeatherData[]): void {
    const formattedData = weekData.map((data, index) => ({
      title: index === 0 ? "Hoy" : data.day,
      icon: `https://openweathermap.org/img/w/${data.icon}.png`,
      tempRange: `${data.lTemp}°C - ${data.hTemp}°C`,
      main: data.main,
      desc: data.desc,
    }));

    this.view.render(formattedData);
  }
}

export interface WeeklyView {
  render(formattedData: FormattedWeatherData[]): void;
}

export interface FormattedWeatherData {
  title: string;
  icon: string;
  tempRange: string;
  main: string;
  desc: string;
}
