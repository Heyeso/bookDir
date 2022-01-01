import React, { useEffect, useState } from "react";
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  box-sizing: border-box;
  max-width: 500px;
  margin: 0;
  padding: 20px;
  padding-bottom: 30px;
  background-color: ${COLORS.GRAY4};
  border-radius: 10px;
  @media (max-width: 500px) {
    max-width: 98vw;
  }
  .card-title {
    font-family: "Noto Sans medium";
    font-size: 24px;
    letter-spacing: -0.25px;
    color: ${COLORS.GRAY3};
    margin: 0 0 20px;
    @media (max-width: 500px) {
      font-size: 20px;
      letter-spacing: -0.3px;
      margin: 0 0 10px;
    }
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
      @media (max-width: 500px) {
        margin: 0 0 5px;
        font-size: 14px;
      }
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
      @media (max-width: 500px) {
        font-size: 14px;
      }
    }
    @media (max-width: 500px) {
      margin: 0 0 5px;
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
    width: 100%;
    max-width: 100px;
    @media (max-width: 500px) {
      margin-right: 5px;
    }
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

const Requirement = styled.div`
  background-color: ${COLORS.GRAY1};
  position: absolute;
  padding: 5px 0;
  bottom: 15px;
  left: 0;
  width: 100%;
  text-align: center;
  color: ${COLORS.RED1};
  font-family: "Noto Sans medium";
  font-size: 14px;
  margin: 0 auto;
`;

const EMPTY = "";
function Card1({ setOpen, setData, ...rest }: Props) {
  const [title, setTitle] = useState(EMPTY);
  const [author, setAuthor] = useState({ fname: EMPTY, lname: EMPTY });
  const [publisher, setPublisher] = useState(EMPTY);
  const [pages, setPages] = useState(EMPTY);
  const [isbn, setISBN] = useState(EMPTY);
  const [requirement, setRequirement] = useState(EMPTY);

  useEffect(() => {
    setTimeout(() => {
      setRequirement(EMPTY);
    }, 5000);
  }, [requirement]);

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
                maxLength={40}
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
                  maxLength={15}
                  type="text"
                  id="fname"
                  value={author.fname}
                  onChange={(e) =>
                    setAuthor((prev) => ({ ...prev, fname: e.target.value }))
                  }
                  placeholder="First name..."
                />
                <input
                  maxLength={15}
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
                maxLength={30}
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
                maxLength={5}
                type="text"
                id="pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
                placeholder="#"
              />
            </div>
            {card === CardType.NewBook ? (
              <div className="isbn">
                <label htmlFor="isbn">ISBN</label>
                <input
                  maxLength={13}
                  type="text"
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setISBN(e.target.value)}
                  placeholder="#"
                />
              </div>
            ) : (
              ""
            )}
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
        if (ConfirmRequiredNewBook()) {
          setData({
            isbn: isbn,
            title: title,
            author: author.lname + " " + author.fname,
            publisher: publisher,
            pages: pages,
            type: CardType.NewBook,
          });
          return setOpen(false);
        }
        return false;
      case CardType.EditBook:
        if (ConfirmRequiredEditBook()) {
          setData({
            title: title,
            author: author.lname + " " + author.fname,
            publisher: publisher,
            pages: pages,
            type: CardType.EditBook,
          });
          return setOpen(false);
        }
        return false;
      case CardType.DeleteBook:
        setOpen(false);
        return setData({
          delete: true,
          type: CardType.DeleteBook,
        });
      default:
        setData(null);
        return setOpen(false);
    }
  };

  const ConfirmRequiredNewBook = () => {
    if (title.length < 1) {
      setRequirement("Title's name cannot be empty.");
      return false;
    }
    if (publisher.length < 1) {
      setRequirement("Publisher's name cannot be empty.");
      return false;
    }
    if (author.fname.length < 1 || author.lname.length < 1) {
      setRequirement("Author's name cannot be empty.");
      return false;
    }
    if (isbn.length < 10) {
      setRequirement("ISBN # is not the complete length.");
      return false;
    }
    if (isNaN(Number(isbn))) {
      setRequirement("ISBN # must contain number characters. (eg. 1234)");
      return false;
    }
    if (isNaN(Number(pages))) {
      setRequirement("Pages # must contain number characters. (eg. 1234)");
      return false;
    }

    return true;
  };

  const ConfirmRequiredEditBook = () => {
    if (
      isbn.length < 1 &&
      pages.length < 1 &&
      publisher.length < 1 &&
      title.length < 1 &&
      (author.fname.length < 1 || author.lname.length < 1)
    ) {
      setRequirement("No change has been made.");
      return false;
    }
    if (isbn.length < 10 && isbn.length > 0) {
      setRequirement("ISBN # is not the complete length.");
      return false;
    }
    if (isNaN(Number(isbn)) && isbn.length > 0) {
      setRequirement("ISBN # must contain number characters. (eg. 1234)");
      return false;
    }
    if (isNaN(Number(pages)) && isbn.length > 0) {
      setRequirement("Pages # must contain number characters. (eg. 1234)");
      return false;
    }

    return true;
  };

  return (
    <>
      <CardComponent {...rest}>
        {cardFn(rest.tag)}
        {requirement !== EMPTY && <Requirement>{requirement}</Requirement>}
      </CardComponent>
      <Bg></Bg>
    </>
  );
}

export default Card1;
