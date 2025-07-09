import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useEditBookMutation, useGetBooksByIdQuery } from '../Redux/features/bookSlice/bookApi'
import LoadintSpinner from '../components/LoadintSpinner'
import toast, { Toaster } from 'react-hot-toast'

const EditBook = () => {
    const { id } = useParams()
    const { data, error, isLoading, refetch } = useGetBooksByIdQuery(id)
    useEffect(() => {
        refetch()
    }, [refetch])
    if (isLoading) {
        console.log("loading")
    }
    const book = data?.book || {};

    const [titlee, setTitle] = useState(book.title || '');
    const [authorr, setAuthor] = useState(book.author || '');
    const [genree, setGenre] = useState(book.genre || '');
    const [isbnn, setIsbn] = useState(book.isbn || '');
    const [descriptionn, setDescription] = useState(book.description || '');
    const [copiess, setCopies] = useState(book.copies || 0);
    const [imagee, setImage] = useState(book.image || '');
    const [publishedd, setPublished] = useState(book.published || 0);
    const [availablee, setAvailable] = useState(book.available ?? true);


    const [editBook, { isError, isSuccess }] = useEditBookMutation()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const updatedData = {
            title: titlee,
            author: authorr,
            genre: genree,
            isbn: isbnn,
            description: descriptionn,
            copies: copiess,
            image: imagee,
            published: publishedd,
            available: availablee,
        };
        try {
            const res = await editBook({ id: id, data: updatedData })
            console.log("Successfully Edited the book" + res)

        } catch (error) {
            console.log(`Failed to edit the book`, error)
        }
        setTitle("")
        setAvailable("")
        setGenre("")
        setImage("")
        setAuthor("")
        setCopies(0)
        setIsbn(0)
        setPublished(0)
        setDescription("")
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success('Book UPDATED successfully! 😍');
        }
    }, [isSuccess]);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {isLoading ? (
                <LoadintSpinner />
            ) : error ? (
                <div>ERROR</div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto space-y-6 my-8 md:my-16 ">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-primary">Edit/Update Book</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-secondary">
                        <div>
                            <label className="block text-gray-600 mb-1">Title</label>
                            <input
                                name="title"
                                value={titlee}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Author</label>
                            <input
                                name="author"
                                value={authorr}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full border px-3 py-2 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Genre</label>
                            <select
                                name="genre"
                                value={genree}
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

                        <div>
                            <label className="block text-gray-600 mb-1">ISBN</label>
                            <input
                                name="isbn"
                                value={isbnn}
                                onChange={(e) => setIsbn(+e.target.value)}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Copies</label>
                            <input
                                name="copies"
                                
                                value={copiess}
                                onChange={(e) => setCopies(+e.target.value)}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Available</label>
                            <div>

                                <select
                                    name="available"
                                    value={availablee.toString()}
                                    onChange={(e) => setAvailable(e.target.value === "true")}
                                    required
                                    
                                    className="w-full border px-3 py-2 rounded-md bg-white text-gray-700"
                                >
                                    <option value="true">true</option>
                                    <option value="false">false</option>

                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Image Link</label>
                            <input
                                name="image"
                                value={imagee}
                                onChange={(e) => setImage(e.target.value)}
                                required
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Published Year</label>
                            <input
                                name="publishedYear"
                                value={publishedd}
                                onChange={(e) => setPublished(+e.target.value)}
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
                            value={descriptionn}
                            onChange={(e) => setDescription(e.target.value)}
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
            )
            }

        </>
    );
}

export default EditBook