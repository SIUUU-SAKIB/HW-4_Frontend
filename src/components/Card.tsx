import { Link } from "react-router"
const Card = ({book}) => {
   return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm  hover:shadow-lg transition duration-300">
      {/* Book Cover */}
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-64 object-cover"
      />

      {/* Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-secondary font-semibold text-gray-800">{book.title}</h2>
        <p className="text-gray-600 text-sm">by {book.author}</p>

        {/* Optional Info */}
        <div className="text-sm text-gray-500 flex flex-col gap-1 font-secondary">
          <span>Genre: {book.genre}</span>
          <span>Available: {book.available ? 'Yes' : 'No'}</span>
        </div>

        {/* Button */}
        <Link to={`/book/${book._id}`} className="mt-3 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm hover:bg-opacity-90">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default Card