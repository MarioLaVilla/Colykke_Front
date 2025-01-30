import React from 'react';
import './SearchBar.css';
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="search-bar">
      <IoSearchSharp className='icono'/>
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
