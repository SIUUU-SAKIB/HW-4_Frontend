import React, { useEffect } from 'react'
import { useGetBooksQuery } from '../Redux/features/bookSlice/bookApi'
import Card from './Card'
import LoadintSpinner from './LoadintSpinner'

const AllBooks = () => {
  const { data, error, isLoading, refetch } = useGetBooksQuery()
  useEffect(() => {
    refetch()
  }, [refetch])
  
  if (isLoading) {
    return <LoadintSpinner />
  } else if (error) {
    return <p className="absolute inset-0 bg-red-500/50">Error Occured</p>
  }


  return (
    <div className='max-w-screen-2xl mx-auto items-center justify-center gap-8 py-16'>

      <h1 className='font-primary text-center md:text-left text-4xl lg:font-6xl font-semibold text-[var(--color-primary)] md:px-8 pb-8'>Discover The Ocean on Knowledge</h1>
      <div className='cards grid md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8'>
        {
          data?.map(books => <Card key={books._id} book={books} />)
        }
      </div>
    </div>
  )
}

export default AllBooks