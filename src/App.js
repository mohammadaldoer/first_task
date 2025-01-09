import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FilteringComponents from './components/FilteringComponents';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import CountriesProvider from './context/CountriesContext';
import './styles/countriesList.module.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <CountriesProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FilteringComponents />
                  <CountriesList />
                </>
              }
            />
            <Route path="/country/:countryCode" element={<CountryDetails />} />
          </Routes>
        </CountriesProvider>
      </div>
    </Router>
  );
}

export default App;
