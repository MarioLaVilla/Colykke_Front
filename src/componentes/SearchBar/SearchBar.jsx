import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || "Buscar productos o marcas..."}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch) {
            onSearch(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
