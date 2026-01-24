import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookDetailsModal } from '../../../componet/BookDetailsModal';
import { bookApi } from '../../../services/api';

export default function BookEditPage() {
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

  const handleClose = () => {
    navigate(`/books/${id}`);
  };

  const handleEdit = async (updatedBook) => {
    try {
      await bookApi.updateBook(id, updatedBook);
      navigate('/');
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await bookApi.deleteBook(id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading book for editing...</p>
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
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BookDetailsModal
        book={book}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        autoEdit={true}
      />
    </div>
  );
}
