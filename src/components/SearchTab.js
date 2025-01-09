import React, { useContext, useState ,useEffect} from 'react';
import { CountriesContext } from '../context/CountriesContext';
import styles from '../styles/searchTab.module.scss';

const SearchIcon = () => (
  <svg
    className={styles.searchIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
  </svg>
);

function SearchTab() {
  const { filterCountries } = useContext(CountriesContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      filterCountries(searchTerm)
    }, [searchTerm]);

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className={styles.searchTab}>
     <button onClick={()=>filterCountries(searchTerm)} className={styles.searchButton}>
        <SearchIcon />
      </button>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
    </div>
  );
}

export default SearchTab;
