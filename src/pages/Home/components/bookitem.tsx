import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddBookVM } from "../../../models/serverModel";
import { COLORS } from "../../../utils/constants";
import EditIcon from "./../../../assets/edit.icon.svg";
import ClosedBookIcon from "./../../../assets/closed-book.icon.svg";
import OpenedBookIcon from "./../../../assets/opened-book.icon.svg";
import DeleteIcon from "./../../../assets/delete.icon.svg";
import PlaceholderBook from "./../../../assets/placeholder.png";
import Card1, { CardType } from "../reusable/card1";

const BookItemContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  margin: 10px 0;
  padding: 0px 40px;
  max-width: 1340px;
  border-radius: 5px;
  &.closed {
    align-items: center;
    height: 55px;
    background-color: ${COLORS.GRAY4};
    .year {
      font-family: "Noto Sans semi-bold";
      font-size: 18px;
      margin: 0;
      padding: 0;
      color: ${COLORS.BLACK};
    }
    .title {
      margin: 0;
      padding: 0;
      margin-left: 40px;
      font-family: "Noto Sans regular";
      font-size: 20px;
      color: ${COLORS.BLACK};
    }
    .author,
    .publisher,
    .pages {
      margin: 0;
      padding: 0;
      margin-right: 40px;
      font-family: "Noto Sans light";
      font-size: 16px;
      color: ${COLORS.GRAY5};
    }
    .author {
      margin-left: auto;
    }
    .bookIcon {
      width: 40px;
      height: 40px;
      margin: 0px;
      padding: 0px;
      background-position: center;
      background-size: contain;
      background-image: url(${ClosedBookIcon});
    }
    &:hover {
      background-color: ${COLORS.LIGHT_BLUE};
    }
    @media (hover: none) {
      &:hover {
        background-color: ${COLORS.GRAY4};
      }
      &:active {
        background-color: ${COLORS.LIGHT_BLUE};
      }
    }
    @media (max-width: 1024px) {
      padding: 0px 20px;
      height: 50px;
      .year {
        font-size: 16px;
      }
      .title {
        margin-left: 15px;
        font-size: 18px;
      }
      .author,
      .publisher,
      .pages {
        margin-right: 20px;
        font-size: 14px;
      }
      .bookIcon {
        width: 30px;
        height: 30px;
      }
    }
    @media (max-width: 768px) {
      padding: 0px 10px;
      .year {
        font-size: 14px;
      }
      .title {
        margin-left: 10px;
        font-size: 16px;
      }
      .author,
      .publisher,
      .pages {
        display: none;
      }
      .bookIcon {
        margin-left: auto;
      }
    }
  }
  &.open {
    margin: 20px 0;
    height: fit-content;
    background-color: ${COLORS.WHITE};
    .placeholder {
      align-self: center;
      height: 105px;
      width: 100%;
      max-width: 87px;
      margin: 0px;
      margin-right: 20px;
      padding: 0px;
      background-image: url(${PlaceholderBook});
      background-position: center;
      background-size: cover;
    }
    .info {
      display: flex;
      flex-direction: column;
      width: fit-content;
      .title {
        height: fit-content;
        width: 100%;
        margin: 0;
        font-family: "Noto Sans regular";
        font-size: 24px;
        color: ${COLORS.BLACK};
      }
      .author {
        height: fit-content;
        width: 100%;
        margin: 10px 0px 0px;
        font-family: "Noto Sans light";
        font-size: 16px;
        color: ${COLORS.GRAY5};
      }
      & > div {
        display: flex;
        margin: 20px 0px 0px;
        .publisher,
        .isbn,
        .year,
        .pages {
          margin: 0;
          margin-right: 30px;
          font-family: "Noto Sans medium";
          font-size: 16px;
          span {
            color: ${COLORS.LIGHT_BLUE};
          }
        }
      }
    }
    .icons {
      display: flex;
      margin-left: auto;
    }
    .bookIcon,
    .editIcon,
    .deleteIcon {
      width: 40px;
      height: 40px;
      margin: 0px;
      padding: 0px;
      background-image: url(${OpenedBookIcon});
      opacity: 0.6;
      background-position: center;
      background-size: contain;
    }
    .editIcon {
      cursor: pointer;
      background-image: url(${EditIcon});
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
    .deleteIcon {
      cursor: pointer;
      background-image: url(${DeleteIcon});
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
    &:hover {
      .bookIcon {
        opacity: 1;
      }
    }
    @media (hover: none) {
      .deleteIcon,
      .editIcon {
        opacity: 1;
      }
    }
    @media (max-width: 1024px) {
      flex-direction: column;
      text-align: center;
      .placeholder {
        display: none;
      }
      .info {
        margin: 0 auto;
        width: fit-content;
        align-items: center;
        .title {
          width: fit-content;
          font-size: 20px;
        }
        .author {
          width: fit-content;
          font-size: 14px;
          font-family: "Noto Sans regular";
        }
        & > div {
          flex-direction: column;
          align-items: center;
          margin: 10px 0px 0px;
          .publisher,
          .isbn,
          .year,
          .pages {
            margin: 0;
            font-size: 16px;
            span {
              font-size: 12px;
              font-family: "Noto Sans regular";
            }
          }
        }
      }
      .icons {
        margin: 15px auto 0;
        width: fit-content;
      }
      .bookIcon,
      .editIcon,
      .deleteIcon {
        width: 35px;
        height: 35px;
        margin: 0 5px;
      }
    }
    @media (max-width: 1024px) {
      .bookIcon,
      .editIcon,
      .deleteIcon {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

interface Props {
  book: AddBookVM;
  open?: boolean;
  onClick?: React.MouseEventHandler;
  setRefresh: (value: boolean) => void;
  setSuccess: (value: number | null) => void;
  setNotification: (value: boolean) => void;
}

function BookItem({
  book,
  open,
  setRefresh,
  setSuccess,
  setNotification,
  ...rest
}: Props) {
  return (
    <BookItemContainer
      {...rest}
      className={open ? "bookItem open" : "bookItem closed"}
    >
      {open ? (
        <BookItemOpen
          book={book}
          setRefresh={setRefresh}
          setSuccess={setSuccess}
          setNotification={setNotification}
        />
      ) : (
        <BookItemClosed
          book={book}
          setRefresh={setRefresh}
          setSuccess={setSuccess}
          setNotification={setNotification}
        />
      )}
    </BookItemContainer>
  );
}

export default BookItem;

function BookItemClosed({ book, setSuccess, setNotification, ...rest }: Props) {
  const { width, height } = useWindowDimensions();
  return (
    <>
      <p className="year">{new Date(book.publish).getFullYear()}</p>
      <p className="title">
        {book.title.length > 30 && width < 1024
          ? book.title.substring(0, 30) + "..."
          : book.title}
      </p>
      <p className="author">{book.author}</p>
      <p className="publisher">{book.publisher}</p>
      <p className="pages">{book.pages}</p>
      <div className="bookIcon"></div>
    </>
  );
}

function BookItemOpen({
  book,
  setRefresh,
  setSuccess,
  setNotification,
}: Props) {
  const [edit, setEdit] = useState(false);
  const [deletebook, setDeletebook] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const EditBook = async () => {
      const dataToUpdate = {
        isbn: book.isbn,
        title: data.title === "" ? null : data.title,
        author: data.author === "" ? null : data.author,
        publisher: data.publisher === "" ? null : data.publisher,
        pages: data.pages === "" ? null : data.pages,
      };
      if (dataToUpdate.title === null) delete dataToUpdate.title;
      if (dataToUpdate.author === null) delete dataToUpdate.author;
      if (dataToUpdate.publisher === null) delete dataToUpdate.publisher;
      if (dataToUpdate.pages === null) delete dataToUpdate.pages;
      await fetch(
        `https://book-dir-js.herokuapp.com/${process.env.REACT_APP_API_KEY}/book/update`,
        {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      )
        .then((response) => {
          setSuccess(response.status);
          setNotification(true);
          return response.json();
        })
        .catch((err) => console.log(err));
      setData(null);
      setRefresh(true);
    };
    const DeleteBook = async () => {
      await fetch(
        `https://book-dir-js.herokuapp.com/${process.env.REACT_APP_API_KEY}/book/delete`,
        {
          method: `DELETE`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isbn: book.isbn,
          }),
        }
      )
        .then((response) => {
          setSuccess(response.status);
          setNotification(true);
          return response.json();
        })
        .catch((err) => console.log(err));
      setRefresh(true);
      setData(null);
    };
    if (data !== null && data.type === CardType.EditBook) {
      EditBook();
    }
    if (data !== null && data.type === CardType.DeleteBook) {
      DeleteBook();
    }
  }, [data]);
  const getStringDate = (date: Date) => {
    let dateToString = `${date.getFullYear()}`;
    if (date.getMonth() < 10) dateToString += `-0${date.getMonth()}`;
    else dateToString += `-${date.getMonth()}`;

    if (date.getDay() < 10) dateToString += `-0${date.getDay()}`;
    else dateToString += `-${date.getDay()}`;

    return dateToString;
  };

  return (
    <>
      <div className="placeholder"></div>
      <section className="info">
        <p className="title">{book.title}</p>
        <p className="author">{book.author}</p>
        <div>
          <p className="publisher">
            <span>Publisher: </span>
            {book.publisher}
          </p>
          <p className="isbn">
            <span>ISBN: </span>
            {book.isbn}
          </p>
          <p className="year">
            <span>Published: </span>
            {getStringDate(new Date(book.publish))}
          </p>
          <p className="pages">
            <span>Pages: </span>
            {book.pages}
          </p>
        </div>
      </section>
      <section className="icons">
        <div
          title="Edit Book."
          className="editIcon"
          onClick={() => setEdit(true)}
        ></div>
        <div
          title="Delete Book."
          className="deleteIcon"
          onClick={() => setDeletebook(true)}
        ></div>
        <div className="bookIcon"></div>
      </section>
      {edit && (
        <Card1 tag={CardType.EditBook} setOpen={setEdit} setData={setData} />
      )}
      {deletebook && (
        <Card1
          tag={CardType.DeleteBook}
          setOpen={setDeletebook}
          setData={setData}
        />
      )}
    </>
  );
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
