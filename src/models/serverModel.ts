import { CardType } from "../pages/Home/reusable/card1";

export interface AddBookVM {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pages: number;
  publish: Date;
}
export interface UpdateBookVM {
  title: string;
  author: string;
  publisher: string;
  pages: number;
}
export interface FindBookVM {
  isbn: string;
  title: string;
}
export interface DeleteBookVM {
  isbn: string;
}

