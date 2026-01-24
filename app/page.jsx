import { useState, useMemo, useEffect, Suspense } from 'react';
import { BookListView } from '../componet/BookListView';
import { BookTableView } from '../componet/BookTableView';
import { BookFormModal } from '../componet/BookFormModal';
import { BookDetailsModal } from '../componet/BookDetailsModal';
import { Header } from '../componet/header';
import { Footer } from '../componet/footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Plus, Grid, Table } from 'lucide-react';
import { bookApi } from '../services/api';
import Loading from './loading';

/**
 * @typedef {Object} Book
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {string} isbn
 * @property {string} publisher
 * @property {string} publishedDate
 * @property {string} genre
 * @property {number} pages
 * @property {number} quantity
 * @property {number} price
 * @property {string} description
 * @property {string} coverUrl
 */

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

  // Load books from API on component mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const booksData = await bookApi.getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  const handleAddBook = async (book) => {
    try {
      const newBook = await bookApi.createBook(book);
      setBooks([...books, newBook]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleEditBook = async (updatedBook) => {
    try {
      const savedBook = await bookApi.updateBook(updatedBook.id, updatedBook);
      setBooks(books.map((book) => (book.id === savedBook.id ? savedBook : book)));
      setEditingBook(null);
      setSelectedBook(savedBook);
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await bookApi.deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
      setSelectedBook(null);
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  const handleOpenForm = (book) => {
    if (book) {
      setEditingBook(book);
    } else {
      setEditingBook(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="container mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading books...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
          {/* Top Section - REMOVED Add Book Button */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-200">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-[22px] lg:text-[36px] font-bold text-black mb-3">
                  Book Inventory
                </h1>
                <p className="text-[14px] lg:text-[18px] text-black font-medium">
                  Manage your book collection with ease and style
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-black">{books.length} Total Books</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-black">{filteredBooks.length} Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar - REMOVED */}

          {/* Books List */}
          <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-2xl border border-green-200">
            <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-black">Your Collection</h3>
                <p className="text-black mt-1 text-sm lg:text-base">
                  Showing {filteredBooks.length} of {books.length} books
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                {/* View Toggle Buttons */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'card'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="hidden sm:inline">Card View</span>
                    <span className="sm:hidden">Cards</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'table'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Table className="h-4 w-4" />
                    <span className="hidden sm:inline">Table View</span>
                    <span className="sm:hidden">Table</span>
                  </button>
                </div>
                <Button
                  onClick={() => handleOpenForm()}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl text-sm font-bold shadow-lg shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-green-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Add Book</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
            {/* Conditional Rendering based on view mode */}
            {viewMode === 'card' ? (
              <BookListView
                books={filteredBooks}
                onEdit={handleOpenForm}
                onDelete={handleDeleteBook}
                onView={setSelectedBook}
              />
            ) : (
              <BookTableView
                books={filteredBooks}
                onEdit={handleOpenForm}
                onDelete={handleDeleteBook}
                onView={setSelectedBook}
              />
            )}
          </div>
        </div>
        )}
      </main>

      <Footer />

      {/* Modals */}
      {isFormOpen && (
        <BookFormModal
          book={editingBook}
          onClose={handleCloseForm}
          onSave={editingBook ? handleEditBook : handleAddBook}
        />
      )}

      {selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onEdit={() => handleOpenForm(selectedBook)}
          onDelete={() => handleDeleteBook(selectedBook.id)}
        />
      )}
    </div>
  );
}
