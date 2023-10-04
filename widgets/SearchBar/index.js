"use client";
import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import { useRouter } from "next/navigation";

function SearchBar({ width = 250, darkMode = true }) {
  const inputRef = useRef(null);
  const router = useRouter();
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [dark, setDark] = useState(darkMode);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setDark(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch(
        `https://google.com/complete/search?client=chrome&q=${searchTerm}`
      );
      const data = await response.json();
      console.log(data[1]);
      if (data[1].length > 0) {
        setSuggestions(data[1]);
      } else {
        setSuggestions([]);
      }
    };

    if (searchTerm.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  var selectSearch = function (e) {
    const focusElem = document.querySelector(":focus");
    const tabElements = [
      ...document.querySelectorAll("#myinput, #searchList>li"),
    ];
    // const tabElementsCount = tabElements.length - 1;
    if (!tabElements.includes(focusElem)) {
      setSuggestions([]);
      setValue(searchTerm);
    }
  };

  var iterator = function (e) {
    if (e.key == "Enter") {
      const focusElem = document.querySelector(":focus");
      if (focusElem.tagName == "LI") {
        if (isValidUrl(focusElem.innerHTML)) router.push(focusElem.innerHTML);
        else router.push(`https://google.com/search?q=${focusElem.innerHTML}`);
      } else if (focusElem.tagName == "INPUT") {
        if (isValidUrl(searchTerm)) router.push(searchTerm);
        else router.push(`https://google.com/search?q=${searchTerm}`);
      }

      // console.log(focusElem.tagName)
      // router.push(`https://google.com/search?q=${focusElem.innerHTML}`)
    }
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    const focusElem = document.querySelector(":focus");
    const tabElements = [
      ...document.querySelectorAll("#myinput, #searchList>li"),
    ];
    const tabElementsCount = tabElements.length - 1;
    if (!tabElements.includes(focusElem)) return;
    e.preventDefault();
    const focusIndex = tabElements.indexOf(focusElem);
    let elemToFocus;
    if (e.key === "ArrowUp")
      elemToFocus =
        tabElements[focusIndex > 0 ? focusIndex - 1 : tabElementsCount];
    if (e.key === "ArrowDown")
      elemToFocus =
        tabElements[focusIndex < tabElementsCount ? focusIndex + 1 : 0];
    elemToFocus.focus();
  };

  useEffect(() => {
    window.addEventListener("keydown", iterator);
    window.addEventListener("click", selectSearch);
    return () => {
      window.removeEventListener("keydown", iterator);
      window.removeEventListener("click", selectSearch);
    };
  }, [searchTerm]);

  return (
    <div className={`search-bar h-12 w-full relative z-0 mt-0`}>
      <input
        type="text"
        placeholder="Search Google..."
        id="myinput"
        value={value}
        ref={inputRef}
        onChange={(e) => {
          setValue(e.target.value);
          setSearchTerm(e.target.value);
        }}
        // onBlur={() => setSuggestions([])}
        onFocus={() => setValue(searchTerm)}
        tabIndex={-1}
        autoComplete="off"
        className={
          dark
            ? "relative rounded-full w-full h-full ps-[5%] pe-[10%] text-white focus:outline-0 z-[100] bg-[#303134] placeholder:text-[#9aa0a6]"
            : "relative rounded-full w-full h-full ps-[5%] pe-[10%] text-black focus:outline-0 z-[100] bg-white placeholder:text-gray-400"
        }
      />
      {value != "" ? (
        <svg
          className={
            dark
              ? "absolute z-[101] h-1/2 top-[25%] right-[3%] fill-[#9aa0a6] cursor-pointer"
              : "absolute z-[101] h-1/2 top-[25%] right-[3%] fill-gray-400 cursor-pointer"
          }
          onClick={() => {
            setSearchTerm("");
            setValue("");
          }}
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      ) : null}
      <ul
        className={
          dark
            ? "suggestions absolute w-full top-1/2 left-0 list-none overflow-y-auto z-[99] rounded-b-[1.5rem] pt-6 bg-[#303134] overflow-hidden"
            : "suggestions absolute w-full top-1/2 left-0 list-none overflow-y-auto z-[99] rounded-b-[1.5rem] pt-6 bg-white overflow-hidden"
        }
        id="searchList"
      >
        <hr
          className={
            dark
              ? "absolute border-[#6c7075] rounded-full w-[95%] top-0 mt-6 left-1/2 -translate-x-1/2 z-[101]"
              : "absolute border-gray-400 rounded-full w-[92.5%] top-0 mt-6 left-1/2 -translate-x-1/2 z-[101]"
          }
        />
        {suggestions.slice(0, 7).map((suggestion, i) => (
          <li
            className={
              dark
                ? "w-full px-[5%] p-[1%] focus:outline-0 focus:bg-[#3c4043] hover:bg-[#3c4043] cursor-pointer text-white"
                : "w-full px-[5%] p-[1%] focus:outline-0 focus:bg-[#eeeeee] hover:bg-[#eeeeee] cursor-pointer text-black"
            }
            key={i}
            tabIndex={i + 4}
            value={suggestion}
            onFocus={() => setValue(suggestion)}
            onClick={() => {
              if (!isValidUrl(suggestion)) {
                router.push(`https://google.com/search?q=${suggestion}`);
              } else {
                router.push(suggestion);
              }
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
