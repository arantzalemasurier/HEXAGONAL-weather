import React from 'react';
import styled from 'styled-components';

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

const Root = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

const ImageListItem = styled.li`
  width: 50%;
  text-align: center;
  border: 1px groove;
  min-width: 185px;
  list-style: none;
`;

const WeatherIcon = styled.img`
  width: 62px;
  height: 62px;
  transform: translateY(0%);
`;

const Info = styled.p`
  font-size: 17px;
  font-weight: bold;
`;

const Title = styled.p`
  text-align: center;
  font-size: 17px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: inherit;
`;

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
