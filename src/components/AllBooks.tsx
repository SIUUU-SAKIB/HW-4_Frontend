import React, { useEffect } from 'react';
import { useGetPaginatedBooksQuery } from '../Redux/features/bookSlice/bookApi';
import Card from './Card';
import LoadintSpinner from './LoadintSpinner';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, previousPage } from '../Redux/features/bookSlice/paginationSlice';
import type { RootState } from '../Redux/store';
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

interface PaginatedBookResponse {
  books: Book[];
  total: number;
}

const AllBooks: React.FC<PaginatedBookResponse> = () => {
  const dispatch = useDispatch();
  const { currentPage, limit } = useSelector((state: RootState) => state.pagination);

  const {
    data,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useGetPaginatedBooksQuery({ page: currentPage, limit });

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  useEffect(() => {
    refetch();
  }, [refetch, currentPage]);

  if (isLoading || isFetching) {
    return <LoadintSpinner />;
  }

  if (error) {
    return (
      <p className="absolute inset-0 bg-red-500/50 text-white p-4 text-center">
        Error Occurred
      </p>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto items-center justify-center gap-8 py-16">
      <h1 className="font-primary text-center md:text-left text-4xl lg:font-6xl font-semibold text-[var(--color-primary)] md:px-8 pb-8">
        Discover The Ocean of Knowledge
      </h1>

      <div className="cards grid md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8">
        {data?.books?.map((book: Book) => (
          <Card key={book._id} book={book} />
        ))}
      </div>
      <div className="w-full flex items-center justify-center gap-4 mt-8">
        <div
          onClick={() => currentPage > 1 && dispatch(previousPage())}
          className="px-8 py-4 flex items-center justify-center bg-white cursor-pointer shadow-sm hover:shadow-lg transition duration-100"
        >
          <FaArrowLeft />
        </div>
        <p className="text-xl font-semibold">{currentPage}</p>
        <div
          onClick={() => currentPage < totalPages && dispatch(nextPage())}
          className="px-8 py-4 flex items-center justify-center bg-white cursor-pointer shadow-sm hover:shadow-lg transition duration-100"
        >
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
