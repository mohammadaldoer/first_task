import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountriesList from '../components/CountriesList';
import { CountriesContext } from '../context/CountriesContext';

const mockOnSelectCountry = jest.fn();

const renderWithContext = (countries, currentPage = 1) => {
  const filteredCountries = countries;
  render(
    <CountriesContext.Provider value={{ filteredCountries }}>
      <CountriesList onSelectCountry={mockOnSelectCountry} />
    </CountriesContext.Provider>
  );
};

describe('CountriesList Component', () => {
  test('renders correctly with countries', () => {
    const mockCountries = [
      { name: { common: 'Country A' }, population: 1000, region: 'Region A', capital: 'Capital A', flags: { svg: 'flag-a.svg' } },
      { name: { common: 'Country B' }, population: 2000, region: 'Region B', capital: 'Capital B', flags: { svg: 'flag-b.svg' } },
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

  test('calls onSelectCountry when a country is clicked', () => {
    const mockCountries = [
      { name: { common: 'Country A' }, population: 1000, region: 'Region A', capital: 'Capital A', flags: { svg: 'flag-a.svg' } },
    ];

    renderWithContext(mockCountries);

    fireEvent.click(screen.getByText('Country A'));
    expect(mockOnSelectCountry).toHaveBeenCalledWith(mockCountries[0]);
  });
});
