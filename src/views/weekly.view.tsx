import React from 'react';
import { Root, ImageList, ImageListItem, WeatherIcon, Info, Title, Subtitle } from '../styles/weekly.style';

interface WeatherData {
  day: string;
  icon: string;
  key: number;
  lTemp: number;
  hTemp: number;
  main: string;
  desc: string;
}

interface Props {
  weekData: WeatherData[];
}

export const WeeklyView: React.FC<Props> = ({ weekData }) => {
  return (
    <Root>
      <ImageList>
        {weekData.map((data, index) => (
          <ImageListItem key={index}>
            <Title>{index === 0 ? 'Hoy' : data.day}</Title>
            <WeatherIcon
              src={`https://openweathermap.org/img/w/${data.icon}.png`}
              alt={data.icon}
            />
            <Info>
              {data.lTemp}°C - {data.hTemp}°C
            </Info>
            <Subtitle>{data.main}</Subtitle>
            <Subtitle style={{ color: '#bb0043', fontSize: 21 }}>
              {data.desc}
            </Subtitle>
          </ImageListItem>
        ))}
      </ImageList>
    </Root>
  );
};
