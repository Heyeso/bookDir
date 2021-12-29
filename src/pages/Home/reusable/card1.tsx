import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../../utils/constants";
import Button1, { ButtonType } from "./button1";

interface Props {
  tag: CardType;
  setOpen: (edit: boolean) => void;
  setData: (data: Object | null) => void;
}

export enum CardType {
  NewBook = "newBook",
  EditBook = "editBook",
  DeleteBook = "deleteBook",
}

const Bg = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #91919183;
  z-index: 50;
  backdrop-filter: blur(1px);

  /* imporve performance of blur filter */
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000;
  transform: translate3d(0, 0, 0);
  transform: translateZ(0);
`;
const CardComponent = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  box-sizing: border-box;
  max-width: 500px;
  margin: 0;
  padding: 20px;
  background-color: ${COLORS.GRAY4};
  border-radius: 10px;
  .card-title {
    font-family: "Noto Sans medium";
    font-size: 24px;
    letter-spacing: -0.25px;
    color: ${COLORS.GRAY3};
    margin: 0 0 20px;
  }
  & > .title,
  .author,
  .publisher,
  .pages,
  .isbn {
    margin-bottom: 20px;
    label {
      display: block;
      font-family: "Noto Sans semi-bold";
      font-size: 16px;
      color: ${COLORS.GRAY6};
      margin: 0;
      margin-bottom: 10px;
    }
    input {
      width: 100%;
      border: none;
      font-family: "Noto Sans medium";
      letter-spacing: 0.3px;
      background-color: ${COLORS.WHITE};
      box-sizing: border-box;
      border-radius: 5px;
      height: 30px;
      padding: 5px 10px;
      color: ${COLORS.GRAY6};
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
  }
  & > .author {
    div {
      display: flex;
      input {
        &#fname {
          margin-right: 10px;
        }
      }
    }
  }
  .pages,
  .isbn {
    display: inline-block;
  }
  & > .pages {
    margin-right: 20px;
    max-width: 100px;
  }
  & > .isbn {
    max-width: 200px;
  }

  .card-button {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    .cancel-button {
      margin-right: 20px;
    }
  }

  .card-text {
    font-family: "Noto Sans medium";
    font-size: 16px;
    text-align: center;
    color: ${COLORS.GRAY6};
    span {
      color: ${COLORS.RED1};
    }
  }
`;

const EMPTY = "";
function Card1({ setOpen, setData, ...rest }: Props) {
  const [title, setTitle] = useState(EMPTY);
  const [author, setAuthor] = useState({ fname: EMPTY, lname: EMPTY });
  const [publisher, setPublisher] = useState(EMPTY);
  const [pages, setPages] = useState(EMPTY);
  const [isbn, setISBN] = useState(EMPTY);

  const cardFn = (card: CardType) => {
    switch (card) {
      case CardType.NewBook:
      case CardType.EditBook:
        return (
          <>
            <p className="card-title">
              {card === CardType.NewBook ? "New Book" : "Edit Book"}
            </p>
            <div className="title">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                autoComplete="on"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book's title..."
              />
            </div>
            <div className="author">
              <label>Author</label>
              <div>
                <input
                  type="text"
                  id="fname"
                  value={author.fname}
                  onChange={(e) =>
                    setAuthor((prev) => ({ ...prev, fname: e.target.value }))
                  }
                  placeholder="First name..."
                />
                <input
                  type="text"
                  id="lname"
                  value={author.lname}
                  onChange={(e) =>
                    setAuthor((prev) => ({ ...prev, lname: e.target.value }))
                  }
                  placeholder="Last name..."
                />
              </div>
            </div>
            <div className="publisher">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                id="publisher"
                autoComplete="on"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Publisher's title..."
              />
            </div>
            <div className="pages">
              <label htmlFor="pages">Pages</label>
              <input
                type="text"
                id="pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                placeholder="#"
              />
            </div>
            <div className="isbn">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                value={isbn}
                onChange={(e) => setISBN(e.target.value)}
                placeholder="#"
              />
            </div>
            <div className="card-button">
              <Button1
                className="cancel-button"
                tag={ButtonType.Gray}
                onClick={() => {
                  setData(null);
                  setOpen(false);
                }}
              >
                Cancel
              </Button1>
              <Button1 tag={ButtonType.Blue} onClick={() => submitFn(card)}>
                {card === CardType.NewBook ? "Confirm" : "Update"}
              </Button1>
            </div>
          </>
        );
      case CardType.DeleteBook:
        return (
          <>
            <p className="card-title">Delete Book</p>
            <p className="card-text">
              Are you sure you want to <span>DELETE</span> this book?
            </p>
            <div className="card-button">
              <Button1
                className="cancel-button"
                tag={ButtonType.Gray}
                onClick={() => {
                  setData(null);
                  setOpen(false);
                }}
              >
                Cancel
              </Button1>
              <Button1 tag={ButtonType.Red} onClick={() => submitFn(card)}>
                Delete
              </Button1>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  const submitFn = (card: CardType) => {
    switch (card) {
      case CardType.NewBook:
        setOpen(false);
        return setData({
          isbn: isbn,
          title: title,
          author: author.lname + " " + author.fname,
          publisher: publisher,
          pages: pages,
          type: CardType.NewBook,
        });
      case CardType.EditBook:
        setOpen(false);
        return setData({
          isbn: isbn,
          title: title,
          author: author,
          publisher: publisher,
          pages: pages,
          type: CardType.EditBook,
        });
      case CardType.DeleteBook:
        setOpen(false);
        return setData({
          delete: true,
          type: CardType.DeleteBook,
        });
      default:
        setOpen(false);
        return setData(null);
    }
  };

  return (
    <>
      <CardComponent {...rest}>{cardFn(rest.tag)}</CardComponent>
      <Bg></Bg>
    </>
  );
}

export default Card1;
