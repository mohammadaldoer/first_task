import React from 'react';
import 'mutationobserver-shim';
import { render, screen, fireEvent, waitFor , within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryDetails from '../components/CountryDetails';

const mockGoBack = jest.fn();
const mockOnSelectCountry = jest.fn();

const renderWithProps = (country) => {
  render(
    <CountryDetails
      country={country}
      goBack={mockGoBack}
      onSelectCountry={mockOnSelectCountry}
    />
  );
};

describe('CountryDetails Component', () => {
  const mockCountry = {
    flags: { svg: 'https://flag.svg' },
    name: {
      common: 'Test Country',
      nativeName: { test: { common: 'Test Native' } },
    },
    population: 12345678,
    region: 'Test Region',
    subregion: 'Test Subregion',
    capital: ['Test Capital'],
    tld: ['.tc'],
    currencies: { TST: { name: 'Test Currency' } },
    languages: { test: 'Test Language' },
    borders: ['TST1', 'TST2'],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });


  test('renders correctly with country details', () => {
    renderWithProps(mockCountry);
  
    expect(screen.getByRole('button', { name: /← back/i })).toBeInTheDocument();
    expect(screen.getByAltText(/test country flag/i)).toBeInTheDocument();
    expect(screen.getByText(/test country/i)).toBeInTheDocument();
  
    const groupContainer = screen.getByText(/native name/i).closest('.group');
  
    expect(
      within(groupContainer).getByText((content, element) => {
        const hasText = (node) => node.textContent === 'Region: Test Region';
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element?.children || []).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  
    expect(
      within(groupContainer).getByText((content, element) => {
        const hasText = (node) => node.textContent === 'Sub Region: Test Subregion';
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element?.children || []).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  
    expect(screen.getByText(/test currency/i)).toBeInTheDocument();
    expect(screen.getByText(/test language/i)).toBeInTheDocument();
  });
  

  test('renders "No borders available." when borders are null', () => {
    const countryWithoutBorders = { ...mockCountry, borders: null };
    renderWithProps(countryWithoutBorders);

    expect(screen.getByText(/no borders available/i)).toBeInTheDocument();
  });

  test('calls goBack function when back button is clicked', () => {
    renderWithProps(mockCountry);

    const backButton = screen.getByRole('button', { name: /← back/i });
    fireEvent.click(backButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  test('calls onSelectCountry with border country details when border country is clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([{ name: { common: 'Border Country' } }]),
      })
    );

    renderWithProps(mockCountry);

    const borderButton = screen.getByText(/tst1/i);
    fireEvent.click(borderButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/alpha/TST1'
    );
    expect(mockOnSelectCountry).toHaveBeenCalledWith({
      name: { common: 'Border Country' },
    });

    global.fetch.mockClear();
  });

  test('handles missing props gracefully', () => {
    const incompleteCountry = {
      ...mockCountry,
      currencies: null,
      languages: null,
    };

    renderWithProps(incompleteCountry);

    expect(screen.getByText(/currencies:/i).textContent).toBe(
      'Currencies: '
    );
    expect(screen.getByText(/languages:/i).textContent).toBe(
      'Languages: '
    );
  });
});
