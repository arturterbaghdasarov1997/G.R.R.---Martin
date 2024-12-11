export interface IBook {
  isbn: string;
  name: string;
  authors: string[];
  numberOfPages: number;
  publisher: string;
  country: string;
  publishedDate?: string;
}
