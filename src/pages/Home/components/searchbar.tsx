import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "./../../../assets/search.icon.svg";
import ClearIcon from "./../../../assets/cancel.icon.svg";
import { COLORS } from "../../../utils/constants";

const SearchBarContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  margin: 0px 20px 0px 0px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: ${COLORS.GRAY2};
  .searchIcon,
  .clearIcon {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin: 0 10px 0 0;
    padding: 0px;
    background-image: url(${SearchIcon});
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  .clearIcon {
    background-image: url(${ClearIcon});
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 0 0 20px;
  border: none;
  font-family: "Noto Sans regular";
  letter-spacing: 0.3px;
  background-color: transparent;
  color: ${COLORS.GRAY3};
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
interface Props {
  search: string;
  setSearch: (search: string) => void;
  SearchForBook: () => void;
}
const EMPTY = "";
function SearchBar({ search, setSearch, SearchForBook }: Props) {
  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        autoComplete="on"
        placeholder="Search for a book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? SearchForBook() : true)}
      />
      <div
        title="Clear."
        className="clearIcon"
        onClick={() => setSearch(EMPTY)}
      ></div>
      <div
        title="Search."
        className="searchIcon"
        onClick={() => SearchForBook()}
      ></div>
    </SearchBarContainer>
  );
}

export default SearchBar;
