import {
	createContext,
	useState,
} from 'react';

export const BookListContext = createContext({
	bookList: [],
	setBookList: () => {},
});

const BookListProvider = (props) => {
	const [ bookList, setBookList ] = useState([]);

	return (
		<BookListContext.Provider value={{bookList, setBookList}}>
			{ props.children }
		</BookListContext.Provider>
	);
}

export default BookListProvider;
