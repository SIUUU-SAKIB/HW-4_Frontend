
import { useGetBooksByIdQuery } from '../Redux/features/bookSlice/bookApi';
import { Link, useParams } from 'react-router';
import LoadintSpinner from './LoadintSpinner';

const BookDetails = ({ book }) => {
    const { id } = useParams()
    const { data, isLoading } = useGetBooksByIdQuery(id)
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
                <Link to={`/book/${data.book?._id}`} className="mt-3 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90 font-semibold hover:bg-blue-900">
                    Borrow Book
                </Link>
            </div>





        </div>


    );
};

export default BookDetails;
