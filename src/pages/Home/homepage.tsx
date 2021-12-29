import React, { useState } from "react";
import styled from "styled-components";
import { AddBookVM } from "../../models/serverModel";
import { COLORS } from "../../utils/constants";
import AddNewBook from "./components/addnewbook.button";
import BookItem from "./components/bookitem";
import Logo from "./components/logo";
import SearchBar from "./components/searchbar";
import Card1, { CardType } from "./reusable/card1";

const PageContainer = styled.div`
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 10px;
`;
const LogoContainer = styled.section`
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 100px;
  padding: 0;
  width: fit-content;
  height: fit-content;
`;
const LogoTitle = styled.p`
  margin: 0;
  margin-left: 15px;
  font-family: "Noto Sans semi-bold";
  font-size: 48px;
  letter-spacing: -0.05em;
  & span {
    color: ${COLORS.LIGHT_BLUE};
  }
`;
const SearchContainer = styled.section`
  height: 50px;
  display: flex;
  margin-top: 50px;
  align-items: center;
  width: 100%;
`;
const BookListContainer = styled.section`
  margin: 50px auto 0;
  height: fit-content;
  width: 100%;
`;
//note: Test Data, Delete
const testBook: AddBookVM[] = [
  {
    isbn: "9781593275846",
    title: "Eloquent JavaScript, Second Edition",
    author: "Marijn Haverbeke",
    publisher: "No Starch Press",
    pages: 472,
    publish: new Date("2019-01-16"),
  },
  {
    isbn: "9781203495679",
    title: "Elaborate C++, First Edition",
    author: "Heyeso Hodetaryoh",
    publisher: "Acer Nitro Seven",
    pages: 123,
    publish: new Date("2011-12-12"),
  },
  {
    isbn: "9734567495679",
    title: "Exenorative Java, Third Edition",
    author: "Hardey Hodetaryoh",
    publisher: "Dell Experion Seven",
    pages: 143,
    publish: new Date("2012-10-22"),
  },
];
const EMPTY = "";
const RESET_ITEM = -1;
function HomePage() {
  const [currentItem, setCurrentItem] = useState(RESET_ITEM);
  const [search, setSearch] = useState(EMPTY);

  return (
    <PageContainer>
      <LogoContainer>
        <Logo />
        <LogoTitle>
          book<span>Dir</span>
        </LogoTitle>
      </LogoContainer>
      <SearchContainer>
        <SearchBar search={search} setSearch={setSearch} />
        <AddNewBook title="Add new book." />
      </SearchContainer>
      <BookListContainer>
        {testBook.map((element, index) => (
          <BookItem
            key={index}
            book={element}
            onClick={() =>
              currentItem === index
                ? setCurrentItem(RESET_ITEM)
                : setCurrentItem(index)
            }
            open={currentItem === index}
          />
        ))}
      </BookListContainer>
    </PageContainer>
  );
}

export default HomePage;
