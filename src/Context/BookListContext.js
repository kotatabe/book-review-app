import {
  createContext,
  useState,
} from 'react';

export const BookListContext = createContext({
  bookList: [],
  setBookList: () => { },
});

function BookListProvider({ children }) {
  const [bookList, setBookList] = useState([]);

  return (
    <BookListContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BookListContext.Provider>
  );
}

export default BookListProvider;
