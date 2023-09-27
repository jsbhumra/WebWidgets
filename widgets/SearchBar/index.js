"use client"
import React, { useState, useEffect } from "react";
import "./styles.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch(
        `http://google.com/complete/search?client=chrome&q=${searchTerm}`);
      const data = await response.json();
      console.log(data[1])
      if(data[1].length>0){
        setSuggestions(data[1]);
      } else {
        setSuggestions([])
      }
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
        {suggestions.map((suggestion,i) => (
          <li key={i}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;