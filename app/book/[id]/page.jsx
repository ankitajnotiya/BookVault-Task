import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { bookApi } from '../../../services/api';

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true);
        const bookData = await bookApi.getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error('Failed to load book:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBook();
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/books/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookApi.deleteBook(id);
        navigate('/');
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2">Book not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">{book.title}</h1>
              <p className="text-green-100 text-lg">by {book.author}</p>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              ← Back to Books
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Book Cover */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-green-100 to-emerald-100">
                <img
                  src={book.coverUrl || `https://picsum.photos/seed/${book.title}/400/600.jpg`}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-2xl p-4 text-center border-2 border-green-200 shadow-lg">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <div className="h-6 w-6 text-green-600 flex items-center justify-center">💰</div>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${book.price}</p>
                <p className="text-sm text-gray-600">Price</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center border-2 border-green-200 shadow-lg">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <div className="h-6 w-6 text-green-600 flex items-center justify-center">📦</div>
                </div>
                <p className={`text-2xl font-bold ${book.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {book.quantity}
                </p>
                <p className="text-sm text-gray-600">In Stock</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center border-2 border-green-200 shadow-lg">
                <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <div className="h-6 w-6 text-green-600 flex items-center justify-center">📄</div>
                </div>
                <p className="text-lg font-bold text-gray-800">{book.pages}</p>
                <p className="text-sm text-gray-600">Pages</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="h-5 w-5 text-green-600 flex items-center justify-center">#</div>
                  ISBN & Publisher
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">ISBN</p>
                    <p className="font-mono text-gray-800 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                      {book.isbn}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Publisher</p>
                    <p className="text-gray-800 font-semibold">{book.publisher}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="h-5 w-5 text-green-600 flex items-center justify-center">👤</div>
                  Author & Genre
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Author</p>
                    <p className="text-gray-800 font-semibold">{book.author}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Genre</p>
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
                      {book.genre}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="h-5 w-5 text-green-600 flex items-center justify-center">📅</div>
                  Publication Date
                </h3>
                <p className="text-gray-800 font-semibold">{formattedDate}</p>
              </div>

              {book.description && (
                <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{book.description}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-green-200">
              <Button
                onClick={handleEdit}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg transition-all"
              >
                <div className="mr-2 h-5 w-5 flex items-center justify-center">✏️</div>
                Edit Book
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all"
              >
                <div className="mr-2 h-5 w-5 flex items-center justify-center">🗑️</div>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
