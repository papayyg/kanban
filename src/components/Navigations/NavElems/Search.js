import React from 'react'

const Search = () => {
  return (
    <form action='' className='search w-100 flex'>
      <input type="text" placeholder='Поиск по заявкам' className='search_input w-100' id='searchBar'/>
      <button className='search_button' id="searchButton" onClick={e => e.preventDefault()}>Найти</button>
    </form>
  )
}

export default Search