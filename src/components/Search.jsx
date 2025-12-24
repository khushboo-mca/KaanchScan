import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Search.css';

function Search(props) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch() {
    if (query.trim() !== "") {
      navigate("/search-not-found");
    }
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="navbar">
      <h1 className="headline">{props.title}</h1>

      <div className="search-box">
        <input
          className="input"
          type="text"
          placeholder="Search by Address/Txn Hash/Block/Token/KANCH Domain Name"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Search;
