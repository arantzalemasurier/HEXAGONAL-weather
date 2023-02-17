import React from 'react';
import { Typography, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import { TodayViewModel } from '../domain/today.mapper';

interface TodayProps {
  today: TodayViewModel;
}

const Main = styled.div`
  display: flex;
  padding: 5px;
`;

const Left = styled.div`
  width:50%
`;

const Right = styled.div`
  width:50%;
  text-align: right;
`;

const Bottom = styled.div`
  text-align: left;
`;

const WeatherIcon = styled.img`
  width: 90px;
  height: 90px;
`;

const UnitIcon = styled.img`
  width: 22px;
  height: 22px;
  margin: 0 4px 0 20px;
`;

const UnitIcon1 = styled(UnitIcon)`
  font-size: 15px;
`;

const TodayView: React.FC<TodayProps> = ({ today }) => {
  if (!today) {
    return null;
  }

  const { icon } = today;

  if (!icon) {
    return null;
  }
  return (
    <CardContent>
      <Main>
        <Left>
          <WeatherIcon src={`https://openweathermap.org/img/w/${today.icon}.png`} alt={today.icon} />
          <Typography variant="h3" gutterBottom>
            {today.temp}°C
          </Typography>
          <Typography variant="h6" gutterBottom>
            {today.main}, {today.desc}
          </Typography>
        </Left>
        <Right>
          <Typography variant="h6" gutterBottom>
            <UnitIcon src={'http://openweathermap.org/img/wn/01d@2x.png'} alt="Logo" /> {today.sunrise} A.M.
          </Typography>
          <Typography variant="h6" gutterBottom>
            <UnitIcon src={'http://openweathermap.org/img/wn/01n@2x.png'} alt="Logo" /> {today.sunset} P.M.
          </Typography>
        </Right>
      </Main>
      <Bottom>
        <UnitIcon1 src={'http://openweathermap.org/img/wn/50d@2x.png'} alt="Logo" />
        <span>{today.pressure} hPa</span>
        <UnitIcon src={'http://openweathermap.org/img/wn/13d@2x.png'} alt="Logo" />
        <span>{today.humidity} %</span>
        <UnitIcon src={'http://openweathermap.org/img/wn/03d@2x.png'} alt="Logo" />
        <span>{today.wind} m/s N</span>
      </Bottom>
    </CardContent>
  );
};

export default TodayView;
