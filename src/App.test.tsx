import { render, screen, fireEvent } from '@testing-library/react';
import App from './app';
import '@testing-library/jest-dom';

// test de prueba por defecto
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Busqueda de ciudad', async () => {
  // renderizar el componente App
  const { getByPlaceholderText, getByText } = render(<App />);
  
  // simular una entrada de texto en el input de busqeuda
  const searchInput = getByPlaceholderText('Ciudad');
  fireEvent.change(searchInput, { target: { value: 'Madrid' } });
  
  // hacer click (enter) en el campo de busqueda
  const searchButton = getByText('Buscar');
  fireEvent.click(searchButton);
  
  // comprobar que se muestra la información del tiempo de MADRID
  const cityTitle = await getByText('Madrid');
  expect(cityTitle).toBeInTheDocument();
});

