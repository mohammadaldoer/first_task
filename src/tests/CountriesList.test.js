import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import CountriesList from '../components/CountriesList';
import { CountriesContext } from '../context/CountriesContext';

const mockOnSelectCountry = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithContext = (countries, currentPage = 1) => {
  const filteredCountries = countries;
  render(
    <MemoryRouter>
      <CountriesContext.Provider value={{ filteredCountries }}>
        <CountriesList onSelectCountry={mockOnSelectCountry} />
      </CountriesContext.Provider>
    </MemoryRouter>
  );
};

describe('CountriesList Component', () => {
  test('renders correctly with countries', () => {
    const mockCountries = [
      { name: { common: 'Country A' }, population: 1000, region: 'Region A', capital: 'Capital A', flags: { svg: 'flag-a.svg' }, cca3: 'AAA' },
      { name: { common: 'Country B' }, population: 2000, region: 'Region B', capital: 'Capital B', flags: { svg: 'flag-b.svg' }, cca3: 'BBB' },
    ];

    renderWithContext(mockCountries);

    expect(screen.getByText('Country A')).toBeInTheDocument();
    expect(screen.getByText('Country B')).toBeInTheDocument();
  });

  test('renders "No countries found" when no countries are provided', () => {
    renderWithContext([]);
    expect(screen.getByText('No countries found.')).toBeInTheDocument();
  });

  test('handles pagination buttons', () => {
    const mockCountries = Array.from({ length: 10 }, (_, i) => ({
      name: { common: `Country ${i + 1}` },
      population: 1000 * (i + 1),
      region: `Region ${i + 1}`,
      capital: `Capital ${i + 1}`,
      flags: { svg: `flag-${i + 1}.svg` },
      cca3: `CC${i + 1}`,
    }));

    renderWithContext(mockCountries);

    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.getByText('Country 8')).toBeInTheDocument();
    expect(screen.queryByText('Country 9')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Country 9')).toBeInTheDocument();
    expect(screen.getByText('Country 10')).toBeInTheDocument();
    expect(screen.queryByText('Country 1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Previous'));

    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.getByText('Country 8')).toBeInTheDocument();
  });

  test('navigates to the correct country detail page when a country is clicked', () => {
    const mockCountries = [
      { name: { common: 'Country A' }, population: 1000, region: 'Region A', capital: 'Capital A', flags: { svg: 'flag-a.svg' }, cca3: 'AAA' },
    ];

    renderWithContext(mockCountries);

    fireEvent.click(screen.getByText('Country A'));
    expect(mockNavigate).toHaveBeenCalledWith('/country/AAA');
  });
});
