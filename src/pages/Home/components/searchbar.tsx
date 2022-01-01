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
    background-position: center;
    background-size: contain;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
      margin: 0 8px 0 0;
      opacity: 0.8;
    }
    @media (hover: none) {
      opacity: 1;
    }
  }

  .clearIcon {
    background-image: url(${ClearIcon});
  }
  @media (max-width: 768px) {
    margin: 0px 15px 0px 0px;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 0 0 20px;
  border: none;
  font-family: "Noto Sans regular";

  background-color: transparent;
  color: ${COLORS.GRAY3};
  font-size: 16px;
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    padding: 0 0 0 10px;
    font-size: 14px;
    letter-spacing: 0;
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
