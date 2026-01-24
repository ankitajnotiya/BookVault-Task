import { Button } from '../components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * @typedef {import('../app/page').Book} Book
 */

/**
 * @typedef {Object} BookTableViewProps
 * @property {Book[]} books
 * @property {(book: Book) => void} onEdit
 * @property {(bookId: string) => void} onDelete
 * @property {(book: Book) => void} onView
 */

export function BookTableView({ books, onEdit, onDelete, onView }) {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const navigate = useNavigate();
  
  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };
  
  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const handleView = (book) => {
    navigate(`/books/${book.id}`);
    if (onView) onView(book);
  };

  if (books.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border-2 border-black">
        <div className="mb-6">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="text-5xl">📚</div>
          </div>
        </div>
        <h3 className="mb-4 text-2xl font-bold text-black">No books found</h3>
        <p className="text-black text-lg mb-8 max-w-md mx-auto">
          Try adjusting your search or add a new book to get started with your inventory management.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-white rounded-3xl border-2 border-black overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-black">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">ISBN</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Genre</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{book.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{book.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">{book.isbn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      {book.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-700">${book.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      book.quantity > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.quantity} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleView(book)} 
                        className="p-2 rounded-md bg-gray-50 text-gray-600 hover:bg-green-600 hover:text-white transition-all duration-200"
                        title="View details"
                      >
                        <div className="h-4 w-4 flex items-center justify-center">👁️</div>
                      </button>
                      <button 
                        onClick={() => onEdit(book)} 
                        className="p-2 rounded-md bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                        title="Edit book"
                      >
                        <div className="h-4 w-4 flex items-center justify-center">✏️</div>
                      </button>
                      <button 
                        onClick={() => onDelete(book.id)} 
                        className="p-2 rounded-md bg-gray-50 text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-200"
                        title="Delete book"
                      >
                        <div className="h-4 w-4 flex items-center justify-center">🗑️</div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} ({currentBooks.length} books)
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div className="h-4 w-4 flex items-center justify-center">◀</div>
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show max 5 page numbers with ellipsis for many pages
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-green-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 || 
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            
            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <div className="h-4 w-4 flex items-center justify-center">▶</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
