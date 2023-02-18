import ReactDOM from 'react-dom';
import App from './app';
import GlobalStyles from './styles/globalStyles';

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root') as HTMLElement
);
