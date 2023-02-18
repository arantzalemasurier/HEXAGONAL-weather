import React from 'react';
import Grid from '@material-ui/core/Grid';
import TodayView from './today.view';
import { WeeklyView } from './weekly.view';
import LocalInfoView from './localInfo.view';
import { Root, WeatherCard } from "../styles/weather.style";

interface WeatherProps {
  today: any,
  weekly: any
}

const WeatherView: React.FC<WeatherProps> = ({ today, weekly }) => {
  const handleClick = () => {
    window.location.href = '/kanban';
  };
  return (
    <Root>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <WeatherCard>
            <LocalInfoView today={today} />
              <div>
                <button onClick={handleClick}>Ir a Kanban</button>
              </div>
          </WeatherCard> 
        </Grid>  
        <Grid item xs={12} sm={6}>   
          <WeatherCard>
            <TodayView today={today} />
          </WeatherCard>
        </Grid>
        <Grid item xs={12}>
          <WeatherCard>
            <WeeklyView weekData={weekly} />
          </WeatherCard>
        </Grid>
      </Grid>
    </Root>
  );
};

export default WeatherView;
