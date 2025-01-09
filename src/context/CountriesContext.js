import React, { createContext, useState, useEffect, useMemo } from 'react';

export const CountriesContext = createContext();

function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const filterByRegion = (region) => {
    if (region === 'Filter by Region') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) => country.region === region);
      setFilteredCountries(filtered);
    }
  };
  
  function filterCountries(searchTerm) {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }

  const contextValue = useMemo(
    () => ({
      countries,
      filteredCountries,
      filterByRegion,
      filterCountries,
      setFilteredCountries,
    }),
    [countries, filteredCountries]
  );

  return (
    <CountriesContext.Provider value={contextValue}>
      {children}
    </CountriesContext.Provider>
  );
}

export default CountriesProvider;