import { BookCard } from '../componet/BookCard';
import { useState, useEffect, useCallback } from 'react';

/**
 * @typedef {import('../app/page').Book} Book
 */

/**
 * @typedef {Object} BookListViewProps
 * @property {Book[]} books
 * @property {(book: Book) => void} onEdit
 * @property {(bookId: string) => void} onDelete
 * @property {(book: Book) => void} onView
 */

export function BookListView({ books, onEdit, onDelete, onView }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayMode, setDisplayMode] = useState('pagination'); // 'pagination' or 'infinite'
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const booksPerPage = 5;
  
  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);
  
  // Initialize displayed books for infinite scroll
  useEffect(() => {
    if (displayMode === 'infinite') {
      setDisplayedBooks(books.slice(0, booksPerPage));
      setCurrentPage(1);
    }
  }, [books, displayMode, booksPerPage]);
  
  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (displayMode !== 'infinite' || isLoading) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    
    // Load more when user is near bottom
    if (scrollTop + clientHeight >= scrollHeight - 500) {
      loadMoreBooks();
    }
  }, [displayMode, isLoading]);
  
  // Attach scroll event listener
  useEffect(() => {
    if (displayMode === 'infinite') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [displayMode, handleScroll]);
  
  const loadMoreBooks = () => {
    if (displayedBooks.length >= books.length) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const nextStartIndex = displayedBooks.length;
      const nextEndIndex = nextStartIndex + booksPerPage;
      const nextBooks = books.slice(nextStartIndex, nextEndIndex);
      
      setDisplayedBooks(prev => [...prev, ...nextBooks]);
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, 500);
  };
  
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
        <div className="flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-black animate-pulse"></div>
          <div className="h-2 w-2 rounded-full bg-black animate-pulse delay-75"></div>
          <div className="h-2 w-2 rounded-full bg-black animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Display Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {displayMode === 'pagination' 
            ? `Page ${currentPage} of ${totalPages} (${currentBooks.length} books)`
            : `Showing ${displayedBooks.length} of ${books.length} books`
          }
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setDisplayMode('pagination')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              displayMode === 'pagination'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Pagination
          </button>
          <button
            onClick={() => setDisplayMode('infinite')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              displayMode === 'infinite'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Infinite Scroll
          </button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {(displayMode === 'pagination' ? currentBooks : displayedBooks).map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
      
      {/* Loading indicator for infinite scroll */}
      {displayMode === 'infinite' && isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
      
      {/* Pagination Controls - Only show in pagination mode */}
      {displayMode === 'pagination' && totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8">
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
