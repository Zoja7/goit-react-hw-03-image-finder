import { StyledSearchbar } from './StyledSearchbar.styled';
import React, { useRef } from 'react';

export default function Searchbar({ onSubmit }) {
  const inputRef = useRef(null);
  const handleSubmit = event => {
    event.preventDefault();
    const searchQuery = inputRef.current.value.trim();
    onSubmit(searchQuery);
  };
  return (
    <StyledSearchbar onSubmit={handleSubmit}>
      <form className="searchForm">
        <button type="submit" className="searchFormButton">
          <span className="searchFormButtonIcon">&#128269;</span>
          <span className="searchFormButtonLabel">Search</span>
        </button>

        <input
          className="searchFormInput"
          type="text"
          ref={inputRef}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </StyledSearchbar>
  );
}
