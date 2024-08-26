import React, { useState } from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${query}`);
  };
  return (
    <div className="nav-header">
      <div className="nav-logo"></div>
      <div className="nav-area">
        <form className="nav-search" action="/items?$name-item" method="GET" onSubmit={handleSearch}>
          <input type="text" className="nav-search-input nav-search-prop" id="name-item" name="search" placeholder="Nunca dejes de buscar" maxLength={120}
          value={query} onChange={(e) => setQuery(e.target.value)} aria-activedescendant="" aria-controls="sb-suggestions-1" aria-autocomplete="list" aria-expanded="false" role="combobox"/>
          <button type="submit" className="nav-search-btn"></button>
      </form>
    </div>
  </div>
  
)};

export default Home;
