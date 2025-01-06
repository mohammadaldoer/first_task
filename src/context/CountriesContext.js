import React, { createContext, useState, useEffect } from 'react';

export const CountriesContext = createContext();

function  CountriesProvider({ children }) {
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

  return (
    <CountriesContext.Provider
      value={{ countries, setCountries, filteredCountries, setFilteredCountries }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
export default CountriesProvider;