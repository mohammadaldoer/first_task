import React from 'react'
import SearchTab from './SearchTab'
import DropdownMenu from './DropdownMenu'
import styles from '../styles/filteringComponents.module.scss'

function FilteringComponents() {
  return (
    <div className={styles['filtering-box']}>
      <SearchTab />
      <DropdownMenu />
    </div>
  )
}

export default FilteringComponents
