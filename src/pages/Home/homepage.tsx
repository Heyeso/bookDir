import React, { ReactNode, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AddBookVM } from "../../models/serverModel";
import { COLORS } from "../../utils/constants";
import AddNewBook from "./components/addnewbook.button";
import BookItem from "./components/bookitem";
import Logo from "./components/logo";
import SearchBar from "./components/searchbar";
import Card1, { CardType } from "./reusable/card1";
import BookIcon from "./../../assets/books.icon.svg";
import CancelIcon from "./../../assets/fail.icon.svg";
import SuccessIcon from "./../../assets/success.icon.svg";

const PageContainer = styled.div`
  max-width: 1340px;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const LogoContainer = styled.section`
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 100px;
  padding: 0;
  width: fit-content;
  height: fit-content;
  @media (max-width: 768px) {
    margin-top: 80px;
    svg {
      transform: scale(0.8);
    }
  }
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
  @media (max-width: 768px) {
    font-size: 36px;
    margin-left: 0;
  }
`;
const SearchContainer = styled.section`
  height: 50px;
  display: flex;
  margin-top: 50px;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    height: 40px;
  }
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<number | null>(null);
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
      setRefresh(false);
    };

    if (refresh) fetchAll();
  }, [refresh]);

  useEffect(() => {
    const AddBook = async () => {
      setIsLoading(true);
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
        .then((response) => {
          setSuccess(response.status);
          setNotification(true);
          return response.json();
        })
        .catch((err) => console.log(err));

      setIsLoading(false);
      setRefresh(true);
      setNewBookData(null);
    };
    if (newBookData !== null && newBookData.type === CardType.NewBook) {
      AddBook();
    }
  }, [newBookData]);

  const SearchForBook = async () => {
    setIsLoading(true);
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

    setIsLoading(false);
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
        {data.length === 0 && !isLoading && (
          <BookDoesNotExit
            newbook={newbook}
            setNewbook={setNewbook}
            setNewBookData={setNewBookData}
          />
        )}
        {data.length > 0 &&
          !isLoading &&
          data.map((element, index) => (
            <BookItem
              key={index}
              book={element}
              setSuccess={setSuccess}
              setNotification={setNotification}
              onClick={() => setCurrentItem(index)}
              open={currentItem === index}
              setRefresh={setRefresh}
            />
          ))}
        {isLoading && <DataPlaceholder />}
      </BookListContainer>
      {notification && (
        <Notification
          status={success}
          setNotification={setNotification}
        ></Notification>
      )}
    </PageContainer>
  );
}

export default HomePage;

const BookDoesNotExitContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  .bookIcon {
    width: 80px;
    height: 80px;
    margin: 0px auto;
    padding: 0px;
    background-image: url(${BookIcon});
    opacity: 0.6;
  }
  p {
    margin: 10px auto;
    width: fit-content;
    font-family: "Noto Sans medium";
    font-size: 18px;
    color: ${COLORS.GRAY3};
    letter-spacing: 0.05rem;
  }
  .new-book {
    display: flex;
    align-items: center;
    margin: 0 auto;
    margin-top: 30px;
    width: fit-content;
    p {
      margin: 0 0 0 10px;
      width: fit-content;
      font-family: "Noto Sans regular";
      font-size: 18px;
      color: ${COLORS.LIGHT_BLUE};
    }
  }
`;
interface BookDoesNotExitProps {
  newbook: boolean;
  setNewbook: (value: boolean) => void;
  setNewBookData: (value: any) => void;
}
const BookDoesNotExit = ({
  newbook,
  setNewbook,
  setNewBookData,
}: BookDoesNotExitProps) => {
  return (
    <BookDoesNotExitContainer>
      <div className="bookIcon"></div>
      <p>Book Directory is Empty</p>
      <p>Add a book to fill the Directory.</p>
      <div className="new-book">
        <AddNewBook title="Add new book." onClick={() => setNewbook(true)} />
        <p>ADD NEW BOOK</p>
        {newbook && (
          <Card1
            tag={CardType.NewBook}
            setOpen={setNewbook}
            setData={setNewBookData}
          />
        )}
      </div>
    </BookDoesNotExitContainer>
  );
};

const Pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
  100% {
    opacity: 1;
  }
`;
const Pulse1 = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.4;
  }
`;
const DataPlaceholderContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  margin: 10px 0;
  padding: 15px 40px;
  max-width: 1340px;
  border-radius: 5px;
  align-items: center;
  height: 55px;
  animation: ${Pulse} 1s linear infinite;
  background-color: ${COLORS.GRAY4};
  .year-place,
  .title-place,
  .author-place,
  .publisher-place,
  .pages-place {
    border-radius: 500px;
    background-color: ${COLORS.GRAY3};
    opacity: 0.5;
    height: 100%;
    width: 5%;
    margin: 0;
    animation: ${Pulse1} 2s linear infinite;
  }
  .title-place {
    width: 30%;
    margin-left: 10px;
  }
  .author-place,
  .publisher-place {
    margin-left: auto;
    width: 15%;
  }
  .publisher-place {
    margin-left: 10px;
    width: 15%;
  }

  .pages-place {
    width: 3%;
    margin-left: 10px;
  }
`;

const DataPlaceholder = () => {
  return (
    <div>
      <DataPlaceholderContainer>
        <div className="year-place"></div>
        <div className="title-place"></div>
        <div className="author-place"></div>
        <div className="publisher-place"></div>
        <div className="pages-place"></div>
      </DataPlaceholderContainer>
      <DataPlaceholderContainer>
        <div className="year-place"></div>
        <div className="title-place"></div>
        <div className="author-place"></div>
        <div className="publisher-place"></div>
        <div className="pages-place"></div>
      </DataPlaceholderContainer>
      <DataPlaceholderContainer>
        <div className="year-place"></div>
        <div className="title-place"></div>
        <div className="author-place"></div>
        <div className="publisher-place"></div>
        <div className="pages-place"></div>
      </DataPlaceholderContainer>
      <DataPlaceholderContainer>
        <div className="year-place"></div>
        <div className="title-place"></div>
        <div className="author-place"></div>
        <div className="publisher-place"></div>
        <div className="pages-place"></div>
      </DataPlaceholderContainer>
    </div>
  );
};

interface NotificationProps {
  status: number | null;
  children?: ReactNode;
  setNotification: (value: boolean) => void;
}
const NotificationContainer = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 16px;
  position: fixed;
  font-family: "Noto Sans medium";
  align-content: center;
  margin: 0 auto;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  .success,
  .fail {
    padding: 5px 20px;
    border-radius: 500px;
    display: flex;
    align-items: center;
  }
  .success {
    color: ${COLORS.GRAY4};
    background-color: ${COLORS.GREEN};
  }
  .fail {
    color: ${COLORS.GRAY5};
    background-color: ${COLORS.RED1};
  }
  .failIcon,
  .successIcon {
    width: 25px;
    height: 25px;
    margin: 0 5px 0 0;
    padding: 0px;
    border-radius: 500px;
    background-position: center;
    background-size: contain;
  }
  .successIcon {
    border: 2px solid ${COLORS.GRAY4};
    background-image: url(${SuccessIcon});
  }
  .failIcon {
    border: 2px solid ${COLORS.GRAY5};
    background-image: url(${CancelIcon});
  }
`;

export const Notification = ({
  status,
  children,
  setNotification,
}: NotificationProps) => {
  useEffect(() => {
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  }, []);
  return (
    <NotificationContainer>
      {status === 200 ? (
        <div className="success">
          <div className="successIcon"></div>
          Success
        </div>
      ) : (
        <div className="fail">
          <div className="failIcon"></div>
          Failed
        </div>
      )}
    </NotificationContainer>
  );
};
