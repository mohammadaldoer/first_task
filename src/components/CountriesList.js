import React, { useContext, useState } from 'react';
import { CountriesContext } from '../context/CountriesContext';
import styles from '../styles/CountriesList.module.scss';

function CountriesList({ onSelectCountry }) {
  const { filteredCountries } = useContext(CountriesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const totalPages = Math.ceil(filteredCountries.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <ul className={styles['countries-list']}>
        {currentCountries.length > 0 ? (
          currentCountries.map((country) => (
            <li key={country.name.common} className={styles['country-card']} onClick={() => onSelectCountry(country)}>
              <img src={country.flags.svg} alt={`${country.name.common} flag`} className={styles['country-card-img']} />
              <div className={styles['country-details']}>
                <h2>{country.name.common}</h2>
                <p>
                  <span>Population:</span> {country.population.toLocaleString()}
                </p>
                <p>
                  <span>Region:</span> {country.region}
                </p>
                <p>
                  <span>Capital:</span> {country.capital}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </ul>

      {filteredCountries.length > cardsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default CountriesList;

