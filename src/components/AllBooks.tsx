import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../Redux/store'
import { nextPage, previousPage } from '../Redux/features/bookSlice/paginationSlice'
import { useGetPaginatedBooksQuery } from '../Redux/features/bookSlice/bookApi'
import Card from './Card'
import LoadintSpinner from './LoadintSpinner'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// 👇 Define book type (adjust fields if needed)
interface Book {
  _id: string
  title: string
  author: string
  genre: string
  isbn: number
  description: string
  copies: number
  available: boolean
  image: string
  published: number
}

interface PaginatedBooksResponse {
  books: Book[]
  total: number
}

const AllBooks: React.FC = () => {
  const dispatch = useDispatch()
  const { currentPage, limit } = useSelector((state: RootState) => state.pagination)

  const {
    data,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useGetPaginatedBooksQuery({ page: currentPage, limit }) as {
    data: PaginatedBooksResponse | undefined
    error: unknown
    isLoading: boolean
    isFetching: boolean
    refetch: () => void
  }

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1

  useEffect(() => {
    refetch()
  }, [refetch, currentPage])

  if (isLoading || isFetching) {
    return <LoadintSpinner />
  }

  if (error) {
    return <p className="absolute inset-0 bg-red-500/50">Error occurred</p>
  }

  return (
    <div className="max-w-screen-2xl mx-auto items-center justify-center gap-8 py-16">
      <h1 className="font-primary text-center md:text-left text-4xl lg:font-6xl font-semibold text-[var(--color-primary)] md:px-8 pb-8">
        Discover The Ocean on Knowledge
      </h1>

      <div className="cards grid md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8">
        {data?.books?.map((book) => <Card key={book._id} book={book} />)}
      </div>

      {/* Pagination */}
      <div className="w-full flex items-center justify-center gap-4 mt-8">
        <div
          onClick={() => currentPage > 1 && dispatch(previousPage())}
          className="px-8 py-4 flex items-center justify-center bg-white cursor-pointer shadow-sm hover:shadow-lg transition duration-100"
        >
          <FaArrowLeft />
        </div>
        <p className="text-xl font-semibold">{currentPage}</p>
        <div
          onClick={() => {
            if (currentPage < totalPages) {
              dispatch(nextPage())
            }
          }}
          className="px-8 py-4 flex items-center justify-center bg-white cursor-pointer shadow-sm hover:shadow-lg transition duration-100"
        >
          <FaArrowRight />
        </div>
      </div>
    </div>
  )
}

export default AllBooks
