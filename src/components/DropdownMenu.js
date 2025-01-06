import React, { useContext, useState } from 'react';
import { CountriesContext } from '../context/CountriesContext';
import styles from '../styles/DropdownMenu.module.scss';

const regions = ['Filter by Region', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function DropdownMenu() {
  const { countries, setFilteredCountries } = useContext(CountriesContext);
  const [selectedRegion, setSelectedRegion] = useState('Filter by Region');
  const [isOpen, setIsOpen] = useState(false);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);

    if (region === 'Filter by Region') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) => country.region === region);
      setFilteredCountries(filtered);
    }
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedRegion} <span className={styles.arrow}>▼</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {regions.map((region) => (
            <li
              key={region}
              className={styles.dropdownItem}
              onClick={() => handleRegionSelect(region)}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;