import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import styles from '../styles/countryDetails.module.scss';

function CountryDetails() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!response.ok) {
          throw new Error('Country not found');
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleBorderCountryClick = (borderCountryCode) => {
    navigate(`/country/${borderCountryCode}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!country) {
    return <div>No country data available.</div>;
  }

  return (
    <div className={styles.countryDetails}>
      <button className={styles.backButton} onClick={handleGoBack}>
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
            </div>
            <div className={styles.bordersSection}>
                <h3>Border Countries:</h3>
                <div className={styles.flexCards}>
                  {country.borders
                    ? country.borders.map((border) => (
                        <div
                          key={border}
                          className={styles.countrDiv}
                          onClick={() => handleBorderCountryClick(border)}
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
  );
}

export default CountryDetails;
