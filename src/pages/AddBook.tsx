import React, { useEffect, useState, type FormEvent } from 'react';
import { useSubmitFormMutation } from '../Redux/features/bookSlice/bookApi';
import toast, { Toaster } from 'react-hot-toast';
import LoadintSpinner from '../components/LoadintSpinner';
import { useNavigate } from 'react-router-dom'; 

// Define the input structure
interface BookInput {
  title: string;
  author: string;
  genre: string;
  isbn: number;
  description: string;
  copies: number;
  image: string;
  published: number;
  available: boolean;
}

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState(0);
  const [description, setDescription] = useState('');
  const [copies, setCopies] = useState(0);
  const [image, setImage] = useState('');
  const [published, setPublished] = useState(0);
  const [available, setAvailable] = useState(true);

  const navigate = useNavigate();

  const [submitForm, { isLoading, isError, isSuccess }] = useSubmitFormMutation();

  const bookData: BookInput = {
    title,
    author,
    genre,
    isbn,
    description,
    copies,
    image,
    published,
    available,
  };

  // Show success/error toast
  useEffect(() => {
    if (isSuccess) {
      toast.success('Book added successfully! 📚');
      setTimeout(() => {
        navigate('/all-books');
      }, 1000);
    }
    if (isError) {
      toast.error('Something went wrong 😔');
    }
  }, [isSuccess, isError, navigate]);

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setAuthor('');
      setGenre('');
      setIsbn(0);
      setDescription('');
      setCopies(0);
      setImage('');
      setPublished(0);
      setAvailable(true);
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await submitForm(bookData).unwrap();
    } catch (err) {
      console.error('Error submitting:', err);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {isLoading && <LoadintSpinner />}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto space-y-6 my-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-primary">Add New Book</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-secondary">
          {/* Title */}
          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-gray-600 mb-1">Author</label>
            <input
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-gray-600 mb-1">Genre</label>
            <select
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-md bg-white text-gray-700"
            >
              <option value="">Select Genre</option>
              <option value="Drama">Drama</option>
              <option value="History">History</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Adventure">Adventure</option>
              <option value="Biography">Biography</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-gray-600 mb-1">ISBN</label>
            <input
              name="isbn"
              type="number"
              value={isbn}
              onChange={(e) => setIsbn(Number(e.target.value))}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Copies */}
          <div>
            <label className="block text-gray-600 mb-1">Copies</label>
            <input
              name="copies"
              type="number"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Available */}
          <div>
            <label className="block text-gray-600 mb-1">Available</label>
            <select
              name="available"
              value={available.toString()}
              onChange={(e) => setAvailable(e.target.value === 'true')}
              required
              className="w-full border px-3 py-2 rounded-md bg-white text-gray-700"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-600 mb-1">Image Link</label>
            <input
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Published Year */}
          <div>
            <label className="block text-gray-600 mb-1">Published Year</label>
            <input
              name="publishedYear"
              type="number"
              value={published}
              onChange={(e) => setPublished(Number(e.target.value))}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition cursor-pointer text-xl"
        >
          Add Book
        </button>
      </form>
    </>
  );
};

export default AddBook;
