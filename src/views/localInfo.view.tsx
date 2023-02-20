import { Typography } from '@material-ui/core';
import { LocalInfo } from '../domain/localInfo';
import StyledCardMedia from '../styles/localInfo.style';
import { useTranslation } from 'react-i18next';

interface Props {
  today: LocalInfo['today'];
}

const LocalInfoView: React.FC<Props> = ({ today }) => {
  const { t } = useTranslation();
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
        {t('CIUDAD')}: {city} 
      </Typography>
      <Typography variant="h3" gutterBottom>
        {country}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('FECHA')}: {date}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t('POBLACIÓN')}: {population.toLocaleString()}
      </Typography>
    </StyledCardMedia>
  );
};

export default LocalInfoView;