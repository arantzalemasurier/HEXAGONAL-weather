import React, {useState} from 'react';
import './app.css'
import axios  from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kanban from './domain/kanban';
import Loader from './domain/loader';
import WeatherView from './views/weather.view';
import { WeatherPresenter } from './views/weather.presenter';
import SearchView from './views/search.view';
import { weatherForecast } from './api';

interface State {
    weatherPresenter: WeatherPresenter;
    value: string;
    current: {
      city?: string;
      country?: string;
      date?: string;
      population?: number;
      desc?: string;
      main?: string;
      icon?: string;
      temp?: number;
      hTemp?: number;
      lTemp?: number;
      sunrise?: string;
      sunset?: string;
      clouds?: number;
      humidity?: number;
      wind?: number;
      pressure?: number;
    };
    weekInfo: any[];
    loading: boolean;
    error: boolean;
  }
  
  const App: React.FC = () => {
    const [state, setState] = useState<State>({
      value: '',
      current: {},
      weekInfo: [],
      weatherPresenter: new WeatherPresenter({}, []), // inicializar con objeto vacío y array vacío
      loading: false,
      error: false,
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        value: e.target.value,
      });
    };
  
      const handleSearchCity = (value: string) => {
      setState({
        ...state,
        loading: true,
      });
      axios
        .get(weatherForecast(value))
        .then((response: { data: any; }) => {
          const data = response.data;
          const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'Nocvember',
            'December',
          ];
  
          const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ];
          const currentDate = new Date();
          const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
            months[currentDate.getMonth()]
          }`;
  
          const sunset = new Date(data.list[0].sunset * 1000)
            .toLocaleTimeString()
            .slice(0, 5);
          const sunrise = new Date(data.list[0].sunrise * 1000)
            .toLocaleTimeString()
            .slice(0, 4);
  
          const current = {
            city: data.city.name,
            country: data.city.country,
            date,
            population: data.city.population,
            desc: data.list[0].weather[0].description,
            main: data.list[0].weather[0].main,
            icon: data.list[0].weather[0].icon,
            temp: Math.floor(data.list[0].temp.day),
            hTemp: Math.floor(data.list[0].temp.max),
            lTemp: Math.floor(data.list[0].temp.min),
            sunrise,
            sunset,
            clouds: data.list[0].clouds,
            humidity: data.list[0].humidity,
            wind: data.list[0].speed,
            pressure: data.list[0].pressure,
          };
  
          interface Weather {
            description: string;
            main: string;
            icon: string;
          }
          
          interface Temp {
            max: number;
            min: number;
          }
          
          interface DayData {
            list: object[];
            weather: Weather[];
            dt: number;
            temp: Temp;
          }
          
          const weekData = data.list as DayData[];
          const weekInfo = weekData.map((data, index) => {
            return {
              key: index,
              main: data.weather[0].main.toUpperCase(),
              day: new Date(data.dt * 1000)
                .toLocaleString('es-ES', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                }).toUpperCase(),
              desc: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1).toLocaleLowerCase('es'),
              icon: data.weather[0].icon,
              hTemp: Math.floor(data.temp.max),
              lTemp: Math.floor(data.temp.min),
            };
          });
          
          setState({
            ...state,
            current,
            weekInfo,
            loading: false,
            error: false,
          });
        })
        .catch((error: any) => {
          console.log(error);
  
          setState({
            ...state,
            loading: false,
            error: true,
            current: {},
            weekInfo: [],
          });
        });
    };
    
    
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/weather" element={
            <div className="weather">
              <WeatherView today={state.current} weekly={state.weekInfo} />
            </div>
          } />
          <Route path="/" element={
            <>
              <SearchView
                value={state.value}
                showResult={state.weekInfo.length > 0 || state.error}
                change={handleInputChange}
                submit={(value: string) => handleSearchCity(value)}
              />
              {state.loading === true ? (
                <Loader />
              ) : (
                <div>
                  {state.current.country !== undefined ? (
                    <div className="weather">
                      <WeatherView today={state.current} weekly={state.weekInfo} />
                    </div>
                  ) : state.error ? (
                    <p className="error__loc">
                      ¡Perdón! no tenemos ninguna información sobre la ubicación especificada
                    </p>
                  ) : null}
                </div>
              )}
            </>
          } />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </BrowserRouter>
    );
    }
    
    export default App;
    
    