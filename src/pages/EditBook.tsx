import React, { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useEditBookMutation, useGetBooksByIdQuery } from '../Redux/features/bookSlice/bookApi';
import LoadintSpinner from '../components/LoadintSpinner';
import toast, { Toaster } from 'react-hot-toast';

interface Book {
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

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useGetBooksByIdQuery(id ?? '');
  const [editBook, { isError, isSuccess }] = useEditBookMutation();

  // Form state
  const [form, setForm] = useState<Book>({
    title: '',
    author: '',
    genre: '',
    isbn: 0,
    description: '',
    copies: 0,
    image: '',
    published: 0,
    available: true,
  });

  // When data loads, set the form fields
  useEffect(() => {
    if (data?.book) {
      setForm({
        title: data.book.title || '',
        author: data.book.author || '',
        genre: data.book.genre || '',
        isbn: data.book.isbn || 0,
        description: data.book.description || '',
        copies: data.book.copies || 0,
        image: data.book.image || '',
        published: data.book.published || 0,
        available: data.book.available ?? true,
      });
    }
  }, [data]);

  useEffect(() => {
    if (id) refetch();
  }, [refetch, id]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Book updated successfully! 😍');
      setTimeout(() => navigate('/all-books'), 1500);
    }
    if (isError) {
      toast.error('Failed to update book.');
    }
  }, [isSuccess, isError, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'isbn' || name === 'copies' || name === 'published'
          ? Number(value)
          : name === 'available'
          ? value === 'true'
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    try {
      await editBook({ id, data: form }).unwrap();
    } catch (err) {
      console.error('Failed to edit the book:', err);
    }
  };

  if (isLoading) return <LoadintSpinner />;
  if (error) return <div className="text-center text-red-600">Error loading book data.</div>;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto space-y-6 my-8 md:my-16"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-primary">Edit/Update Book</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-secondary">
          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Genre</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
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

          <div>
            <label className="block text-gray-600 mb-1">ISBN</label>
            <input
              name="isbn"
              type="number"
              value={form.isbn}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Copies</label>
            <input
              name="copies"
              type="number"
              value={form.copies}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Available</label>
            <select
              name="available"
              value={form.available.toString()}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md bg-white text-gray-700"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Image Link</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Published Year</label>
            <input
              name="published"
              type="number"
              value={form.published}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition cursor-pointer text-xl"
        >
          Update Book
        </button>
      </form>
    </>
  );
};

export default EditBook;
