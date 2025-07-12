import { Link } from "react-router-dom";
import React from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: number;
  image: string;
  published: number;
}

interface CardProps {
  book: Book;
}

const Card: React.FC<CardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm hover:shadow-lg transition duration-300">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-secondary font-semibold text-gray-800">
          {book.title}
        </h2>
        <p className="text-gray-600 text-sm">by {book.author}</p>

        <div className="text-sm text-gray-500 flex flex-col gap-1 font-secondary">
          <span>Genre: {book.genre}</span>
          <span>Available: {book.copies > 0 ? "Yes" : "No"}</span>
        </div>

        <Link
          to={`/book/${book._id}`}
          className="mt-3 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
