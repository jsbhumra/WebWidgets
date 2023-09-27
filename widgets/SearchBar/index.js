"use client"
import React, { useState, useEffect } from "react";
import "./styles.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm}`
      );
      const data = await response.json();
      setSuggestions(data.items);
    };

    if (searchTerm.length > 0) {
      fetchSuggestions();
    }
  }, [searchTerm]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="suggestions">
        {suggestions!=[] && suggestions!=undefined ? suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        )):null}
      </ul>
    </div>
  );
};

export default SearchBar;