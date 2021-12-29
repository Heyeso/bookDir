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
      background-image: url(${ClosedBookIcon});
    }
    &:hover {
      background-color: ${COLORS.LIGHT_BLUE};
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
    .bookIcon,
    .editIcon,
    .deleteIcon {
      width: 40px;
      height: 40px;
      margin: 0px;
      padding: 0px;
      background-image: url(${OpenedBookIcon});
      opacity: 0.6;
    }
    .editIcon {
      cursor: pointer;
      margin-left: auto;
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
  }
`;

interface Props {
  book: AddBookVM;
  open?: boolean;
  onClick?: React.MouseEventHandler;
}

function BookItem({ book, open, ...rest }: Props) {
  return (
    <BookItemContainer
      {...rest}
      className={open ? "bookItem open" : "bookItem closed"}
    >
      {open ? <BookItemOpen book={book} /> : <BookItemClosed book={book} />}
    </BookItemContainer>
  );
}

export default BookItem;

function BookItemClosed({ book }: Props) {
  return (
    <>
      <p className="year">{book.publish.getFullYear()}</p>
      <p className="title">{book.title}</p>
      <p className="author">{book.author}</p>
      <p className="publisher">{book.publisher}</p>
      <p className="pages">{book.pages}</p>
      <div className="bookIcon"></div>
    </>
  );
}

function BookItemOpen({ book }: Props) {

  const [edit, setEdit] = useState(false);
  const [deletebook, setDeletebook] = useState(false);

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
            {book.publish.getFullYear()}
          </p>
          <p className="pages">
            <span>Pages: </span>
            {book.pages}
          </p>
        </div>
      </section>
      <div title="Edit Book." className="editIcon" onClick={() => setEdit(true)}></div>
      <div title="Delete Book." className="deleteIcon" onClick={() => setDeletebook(true)}></div>
      <div className="bookIcon"></div>
      {edit && <Card1 tag={CardType.EditBook} setOpen={setEdit}/>}
      {deletebook && <Card1 tag={CardType.DeleteBook} setOpen={setDeletebook}/>}
    </>
  );
}
