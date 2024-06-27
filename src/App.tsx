import React, { useReducer, useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import useLocalStorage from './hooks/useLocalStorage';

interface Book {
  title: string;
  author: string;
  year: number;
}

type ActionType =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: { index: number; book: Book } }
  | { type: 'DELETE_BOOK'; payload: number }
  | { type: 'SET_BOOKS'; payload: Book[] };

const bookReducer = (state: Book[], action: ActionType): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'UPDATE_BOOK':
      return state.map((book, index) =>
        index === action.payload.index ? action.payload.book : book
      );
    case 'DELETE_BOOK':
      return state.filter((_, index) => index !== action.payload);
    case 'SET_BOOKS':
      return action.payload;
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('books', []);
  const [books, dispatch] = useReducer(bookReducer, storedBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    setStoredBooks(books);
  }, [books, setStoredBooks]);

  const handleAddBook = (book: Book) => {
    if (editingIndex !== null) {
      dispatch({ type: 'UPDATE_BOOK', payload: { index: editingIndex, book } });
      setEditingIndex(null);
    } else {
      dispatch({ type: 'ADD_BOOK', payload: book });
    }
  };

  const handleEditBook = (index: number) => {
    setEditingIndex(index);
  };

  const handleDeleteBook = (index: number) => {
    dispatch({ type: 'DELETE_BOOK', payload: index });
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Book Repository</h1>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <BookForm onSubmit={handleAddBook} initialData={editingIndex !== null ? books[editingIndex] : undefined} />
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full p-3 border border-gray-300 rounded-md mt-4 text-black"
      />
      <BookList books={filteredBooks} onEdit={handleEditBook} onDelete={handleDeleteBook} />
    </div>
  </div>
  );
};

export default App;
