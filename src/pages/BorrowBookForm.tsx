import React, { useEffect, useState, type FormEvent } from 'react';
import { useBorrowedBooksQuery, usePostBorrowedBookMutation } from '../Redux/features/bookSlice/bookApi';
import { useNavigate, useParams } from 'react-router-dom'; 
import LoadintSpinner from '../components/LoadintSpinner';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

interface BorrowedBook {
  title: string;
  copies: number;
}

interface BorrowedBooksData {
  borrowedBooks?: BorrowedBook;
}

const BorrowBookForm: React.FC<BorrowedBooksData> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useBorrowedBooksQuery(id ?? '');
  const [borrowBook, { isSuccess, isError }] = usePostBorrowedBookMutation();

  const [bookName, setBookName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [borrowerName, setBorrowerName] = useState('');

  // Set book name when data arrives
  useEffect(() => {
    if (data?.borrowedBooks?.title) {
      setBookName(data.borrowedBooks.title);
    }
  }, [data]);

  // Handle success/error feedback
  useEffect(() => {
    if (isSuccess) {
      toast.success('Book Borrowed successfully!😍');
      setTimeout(() => {
        navigate('/borrowed-summary');
      }, 1500);
    }
    if (isError) {
      toast.error('Something went wrong😔');
    }
  }, [isSuccess, isError, navigate]);

  // Refetch on mount/id change
  useEffect(() => {
    if (id) refetch();
  }, [id, refetch]);

  if (isLoading) return <LoadintSpinner />;

  if (error) return <div className="text-center text-red-600">Error loading book data.</div>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data?.borrowedBooks) return;

    if (quantity > data.borrowedBooks.copies) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Sorry, the book only has ${data.borrowedBooks.copies} copies available.`,
      });
      return;
    }

    try {
      await borrowBook({ bookId: id, quantity, dueDate, borrowerName }).unwrap();
      console.log('Borrow success');
    } catch (error) {
      console.error('Failed to borrow the book:', error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto my-10 space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800">Borrow Book</h2>

        <div>
          <label className="block text-gray-600 mb-1">Book Name</label>
          <input
            type="text"
            value={bookName}
            readOnly
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Borrower Name</label>
          <input
            type="text"
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default BorrowBookForm;
