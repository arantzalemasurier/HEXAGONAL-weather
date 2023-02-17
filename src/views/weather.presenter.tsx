interface WeatherData {
    today: any;
    weekly: any;
  }
  
  export class WeatherPresenter {
    public readonly weatherData: WeatherData;
  
    constructor(today: any, weekly: any) {
      this.weatherData = { today, weekly };
    }
  }