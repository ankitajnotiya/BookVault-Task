import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Star, Eye, Edit, Trash2 } from 'lucide-react';

/**
 * @typedef {import('../app/page').Book} Book
 */

/**
 * @typedef {Object} BookCardProps
 * @property {Book} book
 * @property {(book: Book) => void} onEdit
 * @property {(bookId: string) => void} onDelete
 * @property {(book: Book) => void} onView
 */

export function BookCard({ book, onEdit, onDelete, onView }) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/books/${book.id}`);
    if (onView) onView(book);
  };
  return (
    <Card className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:border-green-500 hover:border-2">
      {/* Image Container - Fixed Height */}
      <div className="relative h-32 w-full overflow-hidden bg-gray-100">
        <img
          src={book.coverUrl || `https://images.unsplash.com/photo-1543004471-2401c3bdb5db?q=80&w=400&h=250&auto=format&fit=crop`}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 py-0.5 flex items-center shadow-sm">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-bold text-gray-800">{book.rating || '4.5'}</span>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content - Tight Spacing */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5 group-hover:text-green-600 transition-colors duration-200">
          {book.title}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <span className="text-sm font-bold text-green-700">${book.price}</span>
          <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{book.pages} pgs</span>
        </div>

        {/* Stock Status */}
        <div className="mb-2">
          <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
            book.quantity > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {book.quantity > 0 ? `${book.quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Action Buttons - Visible on Hover (Desktop) or always (Mobile) */}
        <div className="flex gap-1.5 mt-3">
          <button 
            onClick={handleView} 
            className="p-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-green-600 hover:text-white transition-all duration-200 transform hover:scale-110"
            title="View details"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={() => onEdit(book)} 
            className="p-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-110"
            title="Edit book"
          >
            <Edit className="h-3.5 w-3.5" />
          </button>
          <button 
            onClick={() => onDelete(book.id)} 
            className="p-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-200 transform hover:scale-110 ml-auto"
            title="Delete book"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
