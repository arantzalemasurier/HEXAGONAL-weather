import { render, screen, fireEvent } from '@testing-library/react';
import App from './app';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('input value changes correctly', () => {
  const { getByLabelText } = render(<App />);
  const input = getByLabelText('Search City') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Barcelona' } });
  expect(input.value).toBe('Barcelona');
});

test('Busqueda de ciudad', async () => {
  // renderizar el componente App
  const { getByPlaceholderText, getByText } = render(<App />);
  
  // buscar el input de búsqueda y simular una entrada de texto
  const searchInput = getByPlaceholderText('Ciudad');
  fireEvent.change(searchInput, { target: { value: 'Barcelona' } });
  
  // buscar el botón de búsqueda y hacer clic en él
  const searchButton = getByText('Buscar');
  fireEvent.click(searchButton);
  
  // verificar que se muestra la información del tiempo de Barcelona
  const cityTitle = await getByText('Barcelona');
  expect(cityTitle).toBeInTheDocument();
});

