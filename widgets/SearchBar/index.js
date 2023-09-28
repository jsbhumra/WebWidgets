"use client"
import React, { useState, useEffect } from "react";
import "./styles.css";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch(
        `https://google.com/complete/search?client=chrome&q=${searchTerm}`);
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
    } else {
      setSuggestions([])
    }
  }, [searchTerm]);

  const isValidUrl = urlString=> {
    try { 
      return Boolean(new URL(urlString)); 
    }
    catch(e){ 
      return false; 
    }
}

  // var selectSearch =

  var iterator = function(e) {
    if(e.key == 'Enter'){
      const focusElem = document.querySelector(':focus');
      if(focusElem.tagName=="LI"){
        if(isValidUrl(focusElem.innerHTML)) router.push(focusElem.innerHTML)
        else router.push(`https://google.com/search?q=${focusElem.innerHTML}`)
      } else if (focusElem.tagName=="INPUT"){
        if(isValidUrl(searchTerm)) router.push(searchTerm)
        else router.push(`https://google.com/search?q=${searchTerm}`)
      }
      
      console.log(focusElem.tagName)
      // router.push(`https://google.com/search?q=${focusElem.innerHTML}`)
    }
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    const focusElem = document.querySelector(':focus');
    const tabElements = [...document.querySelectorAll('#myinput, #searchList>li')];
    const tabElementsCount = tabElements.length - 1;
    if (!tabElements.includes(focusElem)) return;
    e.preventDefault();
    const focusIndex = tabElements.indexOf(focusElem);
    let elemToFocus;
    if (e.key === 'ArrowUp') elemToFocus = tabElements[focusIndex > 0 ? focusIndex - 1 : tabElementsCount];
    if (e.key === 'ArrowDown') elemToFocus = tabElements[focusIndex < tabElementsCount ? focusIndex + 1 : 0];
    elemToFocus.focus();
  }

  useEffect(() => {
    window.addEventListener('keydown', iterator);
    return() => {
      window.removeEventListener('keydown',iterator)
    }
  },[searchTerm])

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        id="myinput"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        tabIndex={1}
        autoComplete="off"
      />
      <ul className="suggestions" id="searchList">
        {suggestions.map((suggestion,i) => (
          <li key={i} tabIndex={i+4} value={suggestion} onClick={() => {if(!isValidUrl(suggestion)){router.push(`https://google.com/search?q=${suggestion}`)}else{router.push(suggestion)}}}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;