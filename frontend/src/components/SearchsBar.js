import React, { useState } from "react";
import "../stylesheets/SearchBar.scss";

const SearchsBar = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); 
    onChange(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        id="search"
        onChange={handleChange} 
        placeholder="Chercher un projet..."
        value={searchTerm} 
      />
    </div>
  );
};

export default SearchsBar;
