import { AlertCircle } from 'lucide-react';
import { useBorrowSummaryQuery } from '../Redux/features/bookSlice/bookApi';
import { useEffect } from 'react';
import LoadintSpinner from '../components/LoadintSpinner';


interface BorrowedSummary {
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  totalBorrowed: number;
}

const BorrowedSum: React.FC = () => {
  const {
    data,
    error,
    isLoading,
    refetch,
  } = useBorrowSummaryQuery(undefined); 
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-600 bg-red-100 p-4 rounded">
        <AlertCircle className="w-5 h-5" />
        <span>Error loading borrowed books.</span>
      </div>
    );
  }
  if(isLoading) return <LoadintSpinner/>

  return (
    <div className="max-w-4xl my-8 mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">Borrowed Books Summary</h2>
      <table className="w-full border border-gray-300 rounded text-xs sm:text-sm md:text-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left">ISBN</th>
            <th className="p-2 text-left">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e: BorrowedSummary) => (
            <tr key={e.bookId} className="border-t hover:bg-gray-50">
              <td className="p-2">{e.title}</td>
              <td className="p-2">{e.author}</td>
              <td className="p-2">{e.isbn}</td>
              <td className="p-2">{e.totalBorrowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedSum;
