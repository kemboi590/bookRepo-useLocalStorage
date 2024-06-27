// src/components/BookForm.tsx
import React, { useRef } from 'react';

interface BookFormProps {
  onSubmit: (book: { title: string; author: string; year: number }) => void;
  initialData?: { title: string; author: string; year: number };
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (titleRef.current && authorRef.current && yearRef.current) {
      onSubmit({
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: parseInt(yearRef.current.value),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        ref={titleRef}
        defaultValue={initialData?.title}
        className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

      />
      <input
        type="text"
        placeholder="Author"
        ref={authorRef}
        defaultValue={initialData?.author}
        className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

      />
      <input
        type="number"
        placeholder="Publication Year"
        ref={yearRef}
        defaultValue={initialData?.year?.toString()}
        className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">

        Submit
      </button>
    </form>
  );
};

export default BookForm;
