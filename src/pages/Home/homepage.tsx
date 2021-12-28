import React, { useState } from "react";
import styled from "styled-components";
import { AddBookVM } from "../../models/serverModel";
import { COLORS } from "../../utils/constants";
import AddNewBook from "./components/addnewbook.button";
import BookItem from "./components/bookitem";
import Logo from "./components/logo";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
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
const SearchContainer = styled.section``;
const BookListContainer = styled.section``;
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
    isbn: "9781203495679",
    title: "Elaborate C++, First Edition",
    author: "Heyeso Hodetaryoh",
    publisher: "Acer Nitro Seven",
    pages: 123,
    publish: new Date("2011-12-12"),
  },
];
function HomePage() {
  const [currentItem, setCurrentItem] = useState(-1);

  return (
    <PageContainer>
      <LogoContainer>
        <Logo />
        <LogoTitle>
          book<span>Dir</span>
        </LogoTitle>
      </LogoContainer>
      <SearchContainer>
        <AddNewBook />
      </SearchContainer>
      <BookListContainer>
      </BookListContainer>
    </PageContainer>
  );
}

export default HomePage;


// {testBook.map((element, index) => (
//   <BookItem key={index} book={element} onClick={() => setCurrentItem(index)} open={currentItem === index}/>
// ))}