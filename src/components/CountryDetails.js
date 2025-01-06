import React, { useState, useEffect } from 'react';
import styles from '../styles/CountryDetails.module.scss';

function CountryDetails({ country, goBack, onSelectCountry }) {
  const [borderCountryCode, setBorderCountryCode] = useState(null);

  useEffect(() => {
    if (borderCountryCode) {
      fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            onSelectCountry(data[0]);
          }
        })
        .catch((error) => console.error('Error fetching border country:', error));
    }
  }, [borderCountryCode, onSelectCountry]);

  return (
    <div className={styles.countryDetails}>
      <button className={styles.backButton} onClick={goBack}>
        &larr; Back
      </button>
      <div className={styles.content}>
        <img src={country.flags.svg} alt={`${country.name.common} flag`} />
        <div className={styles.details}>
          <h2>{country.name.common}</h2>
          <div className={styles.info}>
            <div className={styles.group}>
              <p>
                <strong>Native Name: </strong>
                {Object.values(country.name.nativeName)
                  .map((name) => name.common)
                  .join(', ')}
              </p>
              <p>
                <strong>Population: </strong>
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region: </strong>
                {country.region}
              </p>
              <p>
                <strong>Sub Region: </strong>
                {country.subregion}
              </p>
              <p>
                <strong>Capital: </strong>
                {country.capital}
              </p>
            </div>
            <div className={styles.group}>
              <p>
                <strong>Top Level Domain: </strong>
                {country.tld}
              </p>
              <p>
                <strong>Currencies: </strong>
                {country.currencies &&
                  Object.values(country.currencies)
                    .map((currency) => currency.name)
                    .join(', ')}
              </p>
              <p>
                <strong>Languages: </strong>
                {country.languages &&
                  Object.values(country.languages).join(', ')}
              </p>
              <div className={styles.bordersSection}>
                <h3>Border Countries:</h3>
                <div className={styles.flexCards}>
                  {country.borders
                    ? country.borders.map((border) => (
                        <div
                          key={border}
                          className={styles.countrDiv}
                          onClick={() => setBorderCountryCode(border)}
                        >
                          {border}
                        </div>
                      ))
                    : 'No borders available.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;

