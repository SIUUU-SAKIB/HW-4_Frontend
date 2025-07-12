import React, { useEffect, useState } from 'react';
import { useBorrowedBooksQuery, usePostBorrowedBookMutation } from '../Redux/features/bookSlice/bookApi';
import { useNavigate, useParams } from 'react-router';
import LoadintSpinner from '../components/LoadintSpinner';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

const BorrowBookForm: React.FC  = () => {
    const { id } = useParams()
    const { data, isLoading, error, refetch } = useBorrowedBooksQuery(id)
    const [borrowBook, { isSuccess, isError }] = usePostBorrowedBookMutation()
    const [bookName, setBookName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [borrowerName, setBorrowerName] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            toast.success('Book Borrowed successfully!😍');
            setTimeout(() => {
                navigate('/borrowed-summary')
            }, 1500);

        }
        if (isError) {
            toast.error("Something went wrong😔")

        }
        if (isLoading) {
            <LoadintSpinner />
        }
    }, [isSuccess, isError, isLoading]);
console.log(error)
    useEffect(() => {
        if (data?.borrowedBooks?.title) {
            setBookName(data.borrowedBooks.title);
        }
    }, [data]);

    if (isLoading) {
        return <LoadintSpinner />
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (quantity > data.borrowedBooks.copies) {

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "sorry book dose have enough copies, you can get only get " + data.borrowedBooks.copies + " copies"
            });
            return
        }

        const formData = {
            bookId: id,
            quantity,
            dueDate,
            borrowerName
        };
        try {
            await borrowBook(formData).unwrap()
            console.log(`success`)
        } catch (error) {
            console.log(`Failed to borrow the book, ${error}`)
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
                        required
                        min={1}
                        readOnly
                        max={3}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(+e.target.value)}
                        min={1}
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
                        value={borrowerName}
                        type="text"
                        required
                        onChange={(e) => setBorrowerName(e.target.value)}
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
