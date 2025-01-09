import React from 'react';
import 'mutationobserver-shim';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryDetails from '../components/CountryDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ countryCode: 'TST' }),
}));


function renderComponent(){
  render(
    <MemoryRouter initialEntries={['/country/TST']}>
      <Routes>
        <Route path="/country/:countryCode" element={<CountryDetails />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('CountryDetails Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with country details', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              flags: { svg: 'https://flag.svg' },
              name: {
                common: 'Test Country',
                nativeName: { eng: { common: 'Test Native' } },
              },
              population: 12345678,
              region: 'Test Region',
              subregion: 'Test Subregion',
              capital: ['Test Capital'],
              tld: ['.tc'],
              currencies: { USD: { name: 'US Dollar' } },
              languages: { eng: 'English' },
              borders: ['AAA', 'BBB'],
            },
          ]),
      })
    );

    renderComponent();

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/test country/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/test region/i)).toBeInTheDocument();
    expect(screen.getByText(/12,345,678/i)).toBeInTheDocument();
    expect(screen.getByText(/test subregion/i)).toBeInTheDocument();
    expect(screen.getByText(/test capital/i)).toBeInTheDocument();
    expect(screen.getByText(/\.tc/i)).toBeInTheDocument();
    expect(screen.getByText(/us dollar/i)).toBeInTheDocument();
    expect(screen.getByText(/english/i)).toBeInTheDocument();
    global.fetch.mockClear();
  });

  test('renders error message for API failure', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API Error')));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/error: api error/i)).toBeInTheDocument();
    });

    global.fetch.mockClear();
  });

  test('calls navigate on back button click', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              flags: { svg: 'https://flag.svg' },
              name: {
                common: 'Test Country',
                nativeName: { eng: { common: 'Test Native' } },
              },
              population: 12345678,
              region: 'Test Region',
              subregion: 'Test Subregion',
              capital: ['Test Capital'],
              tld: ['.tc'],
              currencies: { USD: { name: 'US Dollar' } },
              languages: { eng: 'English' },
              borders: ['AAA', 'BBB'],
            },
          ]),
      })
    );
  
    renderComponent();
  
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /test country/i })
      ).toBeInTheDocument();
    });
  
    const backButton = screen.getByRole('button', { name: /← back/i });
    fireEvent.click(backButton);
  
    expect(mockNavigate).toHaveBeenCalledWith('/');
    global.fetch.mockClear();
  });
});
