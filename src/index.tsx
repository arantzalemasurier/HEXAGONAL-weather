import ReactDOM from 'react-dom';
import App from './app';
import GlobalStyles from './globalStyles';

ReactDOM.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  document.getElementById('root') as HTMLElement
);
