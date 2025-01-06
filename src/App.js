import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import FilteringComponents from './components/FilteringComponents';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import CountriesProvider from './context/CountriesContext';
import './styles/CountriesList.module.scss';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelectCountry = useCallback((country) => {
    setSelectedCountry(country);
  }, []);

  const handleBackToList = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="App">
        <Navbar goBack={handleBackToList} />
        <CountriesProvider>
          {selectedCountry ? (
            <CountryDetails
              country={selectedCountry}
              goBack={handleBackToList}
              onSelectCountry={handleSelectCountry}
            />
          ) : (
            <>
              <FilteringComponents />
              <CountriesList onSelectCountry={handleSelectCountry} />
            </>
          )}
        </CountriesProvider>
    </div>
  );
}

export default App;
