import { CardMedia, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { LocalInfo } from '../domain/localInfo';


interface Props {
  today: LocalInfo['today'];
}

const StyledCardMedia = styled(CardMedia)`
  text-align: center;
  margin: 7% auto;
`;

const LocalInfoView: React.FC<Props> = ({ today }) => {
  let city = '';
  let country = '';
  let date = '';
  let population = 0;

  if (today) {
    city = today.city;
    country = today.country;
    date = today.date;
    population = today.population;
  }

  return (
    <StyledCardMedia>
      <Typography variant="h3" gutterBottom>
        {city}, {country}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {date}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Población: {population.toLocaleString()}
      </Typography>
    </StyledCardMedia>
  );
};

export default LocalInfoView;