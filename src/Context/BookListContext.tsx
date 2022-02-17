import { createContext, useState } from 'react';
import { Book } from '../Pages/interface';
import { Props } from './PropsInterface';

interface BookListContextInterface {
  bookList: Book[];
  setBookList: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const BookListContext = createContext({} as BookListContextInterface);

function BookListProvider({ children }: Props) {
  const [bookList, setBookList] = useState<Book[]>([]);

  return (
    <BookListContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BookListContext.Provider>
  );
}

export default BookListProvider;
