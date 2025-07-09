
import { useDeleteBookMutation, useGetBooksByIdQuery } from '../Redux/features/bookSlice/bookApi';
import { Link, useNavigate, useParams } from 'react-router';
import LoadintSpinner from '../components/LoadintSpinner';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const BookDetails = () => {
    const { id } = useParams()
    const { data, isLoading, refetch } = useGetBooksByIdQuery(id)
const [deleteBook, {isSuccess, isError}] = useDeleteBookMutation()
const navigate = useNavigate()
    useEffect(() => {
        refetch()
    }, [refetch])
    if (isLoading) {
        return <LoadintSpinner />
    }
    return (



        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl py-16 p-6 flex flex-col md:flex-row gap-6 items-start my-8 lg:my-16">
            {/* Book Image */}
            <div className="w-full md:w-1/3">
                <img
                    src={data.book?.image}
                    alt={data.book?.title}
                    className="rounded-xl object-cover w-full h-full max-h-[400px]"
                />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
                <h2 className="font-primary text-2xl font-bold text-gray-800">{data.book?.title}</h2>
                <p className="text-gray-600 text-sm font-secondary">by {data.book?.author}</p>
                <p className="text-gray-700 text-base font-secondary">{data.book?.description}</p>
                <div className="text-sm text-gray-500 space-y-2 font-secondary ">
                    <p><strong>Genre:</strong> {data.book?.genre}</p>
                    <p><strong>Published:</strong> {data.book?.published}</p>

                </div>
                <div className='flex gap-2 items-center'>
                    {
                        data.book?.copies > 0 ? (
                            <>
                                <Link to={`/borrow-book/${data.book?._id}`} className="mt-3 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 font-semibold hover:bg-blue-900">
                                    Borrow Book
                                </Link>

                                <Link to={`/edit-book/${data.book?._id}`} className="mt-3 bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 font-semibold hover:bg-green-900">
                                    Edit Book
                                </Link>
                                <button onClick={() => {
                                    Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!"
                                    }).then(async(result) => {
                                        if (result.isConfirmed) {
                                            try{
                                                await deleteBook(id).unwrap();
                                                 Swal.fire({
                                                
                                                title: "Deleted!",
                                                text: "Your file has been deleted.",
                                                icon: "success"
                                            });
                                            navigate('/all-books')
                                            }catch(error) {
                                                Swal.fire({
                                                    title:"Error",
                                                    text:"Failed to delete book",
                                                    icon:"error"
                                                })
                                            }
                                           
                                        }
                                    });
                                }} className="mt-3 bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 font-semibold hover:bg-red-900 cursor-pointer">Delete Book</button>
                            </>
                        ) : (
                            <>
                                <div className="mt-3 bg-gray-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 font-semibold hover:bg-gray-600 cursor-not-allowed">Unavailable</div>
                                <Link to={`/edit-book/${data.book?._id}`} className="mt-3 bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 font-semibold hover:bg-green-900">
                                    Edit Book
                                </Link>
                            </>
                        )
                    }

                </div>
            </div>





        </div>


    );
};

export default BookDetails;
