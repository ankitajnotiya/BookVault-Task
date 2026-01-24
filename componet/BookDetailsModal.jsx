import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { X, BookOpen, DollarSign, Package, Calendar, Hash, User, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

/**
 * @typedef {import('../app/page').Book} Book
 */

/**
 * @typedef {Object} BookDetailsModalProps
 * @property {Book} book
 * @property {() => void} onClose
 * @property {(book: Book) => void} onEdit
 * @property {() => void} onDelete
 * @property {boolean} [autoEdit=false]
 */

export function BookDetailsModal({
  book,
  onClose,
  onEdit,
  onDelete,
  autoEdit = false,
}) {
  const [isEditing, setIsEditing] = useState(autoEdit);
  const [editedBook, setEditedBook] = useState(book);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDelete();
      onClose();
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedBook);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedBook(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formattedDate = new Date(book.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 rounded-3xl shadow-2xl border-0 overflow-hidden max-h-[90vh] lg:max-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {isEditing && (
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    EDITING
                  </span>
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedBook.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-xl lg:text-2xl font-bold mb-1 bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 w-full"
                  placeholder="Book Title"
                />
              ) : (
                <DialogTitle className="text-xl lg:text-2xl font-bold mb-1">{book.title}</DialogTitle>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editedBook.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="text-green-100 text-base lg:text-lg bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 w-full"
                  placeholder="Author"
                />
              ) : (
                <DialogDescription className="text-green-100 text-base lg:text-lg">by {book.author}</DialogDescription>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="relative h-64 lg:h-96 w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-green-100 to-emerald-100">
                  <img
                    src={book.coverUrl || `https://picsum.photos/seed/${book.title}/400/600.jpg`}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4">
                  <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-3 lg:p-4 shadow-xl">
                    <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              {/* Quick Info Cards */}
              <div className="grid gap-3 lg:gap-4 grid-cols-3">
                <div className="bg-white rounded-2xl p-3 lg:p-4 text-center border-2 border-green-200 shadow-lg">
                  <div className="rounded-full bg-green-100 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedBook.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent w-16 lg:w-20 text-center border-b-2 border-green-300 focus:border-green-500 outline-none"
                      step="0.01"
                    />
                  ) : (
                    <p className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${book.price}</p>
                  )}
                  <p className="text-xs lg:text-sm text-gray-600">Price</p>
                </div>
                <div className="bg-white rounded-2xl p-3 lg:p-4 text-center border-2 border-green-200 shadow-lg">
                  <div className="rounded-full bg-green-100 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2">
                    <Package className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedBook.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                      className={`text-lg lg:text-2xl font-bold w-12 lg:w-16 text-center border-b-2 ${editedBook.quantity > 0 ? 'text-green-600 border-green-300 focus:border-green-500' : 'text-red-600 border-red-300 focus:border-red-500'} outline-none`}
                      min="0"
                    />
                  ) : (
                    <p className={`text-lg lg:text-2xl font-bold ${book.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {book.quantity}
                    </p>
                  )}
                  <p className="text-xs lg:text-sm text-gray-600">In Stock</p>
                </div>
                <div className="bg-white rounded-2xl p-3 lg:p-4 text-center border-2 border-green-200 shadow-lg">
                  <div className="rounded-full bg-green-100 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2">
                    <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedBook.pages}
                      onChange={(e) => handleInputChange('pages', parseInt(e.target.value) || 0)}
                      className="text-base lg:text-lg font-bold text-gray-800 w-12 lg:w-16 text-center border-b-2 border-gray-300 focus:border-gray-500 outline-none"
                      min="1"
                    />
                  ) : (
                    <p className="text-base lg:text-lg font-bold text-gray-800">{book.pages}</p>
                  )}
                  <p className="text-xs lg:text-sm text-gray-600">Pages</p>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-3 lg:space-y-4">
                <div className="bg-white rounded-2xl p-4 lg:p-6 border-2 border-green-200 shadow-lg">
                  <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <Hash className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                    ISBN & Publisher
                  </h3>
                  <div className="grid gap-3 lg:gap-4 grid-cols-1">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">ISBN</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedBook.isbn}
                          onChange={(e) => handleInputChange('isbn', e.target.value)}
                          className="font-mono text-sm lg:text-base text-gray-800 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-green-300 focus:border-green-500 outline-none w-full"
                          placeholder="ISBN"
                        />
                      ) : (
                        <p className="font-mono text-sm lg:text-base text-gray-800 font-semibold bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                          {book.isbn}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Publisher</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedBook.publisher}
                          onChange={(e) => handleInputChange('publisher', e.target.value)}
                          className="text-sm lg:text-base text-gray-800 font-semibold px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-500 outline-none w-full"
                          placeholder="Publisher"
                        />
                      ) : (
                        <p className="text-sm lg:text-base text-gray-800 font-semibold">{book.publisher}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 lg:p-6 border-2 border-green-200 shadow-lg">
                  <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                    Author & Genre
                  </h3>
                  <div className="grid gap-3 lg:gap-4 grid-cols-1">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Author</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedBook.author}
                          onChange={(e) => handleInputChange('author', e.target.value)}
                          className="text-sm lg:text-base text-gray-800 font-semibold px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-500 outline-none w-full"
                          placeholder="Author"
                        />
                      ) : (
                        <p className="text-sm lg:text-base text-gray-800 font-semibold">{book.author}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Genre</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedBook.genre}
                          onChange={(e) => handleInputChange('genre', e.target.value)}
                          className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg border border-white/30 focus:border-white/50 outline-none w-full"
                          placeholder="Genre"
                        />
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
                          {book.genre}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 lg:p-6 border-2 border-green-200 shadow-lg">
                  <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <Calendar className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                    Publication Date
                  </h3>
                  <p className="text-sm lg:text-base text-gray-800 font-semibold">{formattedDate}</p>
                </div>

                {book.description && (
                  <div className="bg-white rounded-2xl p-4 lg:p-6 border-2 border-green-200 shadow-lg">
                    <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-3 lg:mb-4">Description</h3>
                    {isEditing ? (
                      <textarea
                        value={editedBook.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="text-sm lg:text-base text-gray-700 leading-relaxed w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-500 outline-none resize-none"
                        rows={3}
                        placeholder="Book description"
                      />
                    ) : (
                      <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{book.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="border-t border-green-200 p-4 lg:p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleEdit}
              className="flex-1 h-10 lg:h-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg transition-all text-sm lg:text-base"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditing ? 'Save Changes' : 'Edit Book'}
            </Button>
            {isEditing ? (
              <Button
                onClick={() => {
                  setEditedBook(book);
                  setIsEditing(false);
                }}
                className="flex-1 h-10 lg:h-12 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all text-sm lg:text-base"
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleDelete}
                className="flex-1 h-10 lg:h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all text-sm lg:text-base"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
