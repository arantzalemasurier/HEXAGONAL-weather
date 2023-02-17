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
  
  interface TodayRepository {
    getTodayData: () => Promise<TodayData>;
  }
  
  export default TodayRepository;
  