import ReactDOM from 'react-dom';
import App from './app';
import GlobalStyles from './styles/globalStyles';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      city: 'City',
      country: 'Country',
      date: 'Date',
      population: 'Population',
    },
  },
  es: {
    translation: {
      city: 'Ciudad',
      country: 'País',
      date: 'Fecha',
      population: 'Población',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  interpolation: {
    escapeValue: false,
  },
});


ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root') as HTMLElement
);
