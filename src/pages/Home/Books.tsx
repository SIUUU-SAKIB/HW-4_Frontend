import Card from "../../components/Card";
import LoadintSpinner from "../../components/LoadintSpinner";
import { useGetBooksQuery } from "../../Redux/features/bookSlice/bookApi";
import { Link } from "react-router-dom";
import { FC } from "react";


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

const AllBooks: FC = () => {
  const { data, error, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <LoadintSpinner />;
  } else if (error) {
    return (
      <p className="absolute inset-0 bg-red-500/50 text-white p-4 text-center">
        Error Occurred
      </p>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col justify-center py-8 px-4">
      <div className="flex flex-col items-center justify-between py-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-8 w-full">
          <h1 className="font-primary text-center md:text-left text-4xl lg:font-6xl font-semibold text-[var(--color-primary)] md:px-8">
            Discover The Ocean of Knowledge
          </h1>
          <Link
            to="/all-books"
            className="text-2xl underline font-secondary text-center md:text-right text-[var(--color-accent)] mt-2 md:px-8 cursor-pointer font-semibold"
          >
            All Books
          </Link>
        </div>
        <p className="text-2xl font-semibold text-[var(--color-primary)]">
          Recent Listings
        </p>
      </div>

      <div className="cards grid md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8">
        {data?.slice(0, 8).map((book: Book) => (
          <Card key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
