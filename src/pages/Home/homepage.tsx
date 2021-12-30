import React, { useEffect, useState } from "react";
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
  overflow: auto;
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

const EMPTY = "";
const RESET_ITEM = 0;
function HomePage() {
  const [currentItem, setCurrentItem] = useState(RESET_ITEM);
  const [search, setSearch] = useState(EMPTY);
  const [newbook, setNewbook] = useState(false);
  const [newBookData, setNewBookData] = useState<any>(null);
  const [data, setData] = useState<AddBookVM[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    const fetchAll = async () => {
      await fetch(
        `https://book-dir-js.herokuapp.com/${process.env.REACT_APP_API_KEY}/book`,
        {
          method: `GET`,
        }
      )
        .then((response) => response.json())
        .then((dataBook) => {
          setData(dataBook);
        })
        .catch((err) => console.log(err));
    };

    if (refresh) fetchAll();

    return () => {
      setRefresh(false);
    };
  }, [refresh]);

  useEffect(() => {
    const AddBook = async () => {
      await fetch(
        `https://book-dir-js.herokuapp.com/${process.env.REACT_APP_API_KEY}/book/add`,
        {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isbn: newBookData.isbn,
            title: newBookData.title,
            author: newBookData.author,
            publisher: newBookData.publisher,
            pages: newBookData.pages,
          }),
        }
      )
        .then((response) => response.json())
        .catch((err) => console.log(err));
    };
    if (newBookData !== null && newBookData.type === CardType.NewBook) {
      AddBook();
    }

    return () => {
      setRefresh(true);
      setNewBookData(null);
    };
  }, [newBookData]);

  const SearchForBook = async () => {
    await fetch(
      `https://book-dir-js.herokuapp.com/${process.env.REACT_APP_API_KEY}/book/${search}`,
      {
        method: `GET`,
      }
    )
      .then((response) => response.json())
      .then((dataBook) => {
        setData(dataBook);
      })
      .catch((err) => console.log(err));
  };

  return (
    <PageContainer>
      <LogoContainer>
        <Logo />
        <LogoTitle>
          book<span>Dir</span>
        </LogoTitle>
      </LogoContainer>
      <SearchContainer>
        <SearchBar
          search={search}
          setSearch={setSearch}
          SearchForBook={SearchForBook}
        />
        <AddNewBook title="Add new book." onClick={() => setNewbook(true)} />
        {newbook && (
          <Card1
            tag={CardType.NewBook}
            setOpen={setNewbook}
            setData={setNewBookData}
          />
        )}
      </SearchContainer>
      <BookListContainer>
        {data.length === 0 && <div>Book does Not Exist</div>}
        {data.length > 0 &&
          data.map((element, index) => (
            <BookItem
              key={index}
              book={element}
              onClick={() => setCurrentItem(index)}
              open={currentItem === index}
              setRefresh={setRefresh}
            />
          ))}
      </BookListContainer>
    </PageContainer>
  );
}

export default HomePage;
