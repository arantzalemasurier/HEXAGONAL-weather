interface TodayData {
    temp: number;
    main: string;
    esc: string;
    con: string;
    sunrise: string;
    sunset: string;
    pressure: number;
    humidity: number;
    wind: number;
    icon: string;
    desc: string;
  }
  
  interface TodayViewModel {
    temp: number;
    main: string;
    desc: string;
    icon: string;
    sunrise: string;
    sunset: string;
    pressure: number;
    humidity: number;
    wind: number;
  }
  
  function mapTodayDataToViewModel(todayData: TodayData): TodayViewModel {
    return {
      temp: todayData.temp,
      main: todayData.main,
      desc: todayData.desc,
      icon: `https://openweathermap.org/img/w/${todayData.icon}.png`,
      sunrise: todayData.sunrise,
      sunset: todayData.sunset,
      pressure: todayData.pressure,
      humidity: todayData.humidity,
      wind: todayData.wind,
    };
  }
  
export { mapTodayDataToViewModel };
    export type { TodayData, TodayViewModel };
  