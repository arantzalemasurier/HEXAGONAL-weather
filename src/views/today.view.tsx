import React from 'react';
import { Typography, CardContent } from '@material-ui/core';
import { TodayViewModel } from '../domain/today.mapper';
import { Main, Left, Right, Bottom, WeatherIcon, UnitIcon, UnitIcon1 } from '../styles/today.style';

interface TodayProps {
  today: TodayViewModel;
}

const TodayView: React.FC<TodayProps> = ({ today }) => {
  if (!today || !today.icon) {
    return null;
  }

  const {
    icon,
    temp,
    main,
    desc,
    sunrise,
    sunset,
    pressure,
    humidity,
    wind,
  } = today;

  const weatherIconSrc = `https://openweathermap.org/img/w/${icon}.png`;

  return (
    <CardContent>
      <Main>
        <Left>
          <WeatherIcon src={weatherIconSrc} alt={icon} />
          <Typography variant="h3" gutterBottom>
            {temp}°C
          </Typography>
          <Typography variant="h6" gutterBottom>
            {main}, {desc}
          </Typography>
        </Left>
        <Right>
          <Typography variant="h6" gutterBottom>
            <UnitIcon src={'http://openweathermap.org/img/wn/01d@2x.png'} alt="Logo" /> {sunrise} AM
          </Typography>
          <Typography variant="h6" gutterBottom>
            <UnitIcon src={'http://openweathermap.org/img/wn/01n@2x.png'} alt="Logo" /> {sunset} PM
          </Typography>
        </Right>
      </Main>
      <Bottom>
        <UnitIcon1 src={'http://openweathermap.org/img/wn/50d@2x.png'} alt="Logo" />
        <span>{pressure} hPa</span>
        <UnitIcon src={'http://openweathermap.org/img/wn/13d@2x.png'} alt="Logo" />
        <span>{humidity} %</span>
        <UnitIcon src={'http://openweathermap.org/img/wn/03d@2x.png'} alt="Logo" />
        <span>{wind} m/s N</span>
      </Bottom>
    </CardContent>
  );
};

export default TodayView;
