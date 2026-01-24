import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

export function BookFormModal({ book, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publishedDate: '',
    genre: '',
    pages: 0,
    quantity: 0,
    price: 0,
    description: '',
    coverUrl: '',
    authorEmail: '',
    authorAge: '',
    ...(book && book),
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Title validation - required, min 2, max 200 characters
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    // Author validation - required, min 2, max 100 characters, letters only
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    } else if (formData.author.trim().length < 2) {
      newErrors.author = 'Author must be at least 2 characters';
    } else if (formData.author.trim().length > 100) {
      newErrors.author = 'Author must be less than 100 characters';
    } else if (!/^[a-zA-Z\s\.\-']+$/.test(formData.author.trim())) {
      newErrors.author = 'Author can only contain letters, spaces, dots, and hyphens';
    }
    
    // ISBN validation - required, proper ISBN format
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    } else if (!/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/.test(formData.isbn.replace(/[-\s]/g, ''))) {
      newErrors.isbn = 'Invalid ISBN format';
    }
    
    // Publisher validation - required, min 2, max 100 characters
    if (!formData.publisher.trim()) {
      newErrors.publisher = 'Publisher is required';
    } else if (formData.publisher.trim().length < 2) {
      newErrors.publisher = 'Publisher must be at least 2 characters';
    } else if (formData.publisher.trim().length > 100) {
      newErrors.publisher = 'Publisher must be less than 100 characters';
    }
    
    // Published date validation - required, not future, not too old
    if (!formData.publishedDate) {
      newErrors.publishedDate = 'Published date is required';
    } else {
      const pubDate = new Date(formData.publishedDate);
      const today = new Date();
      if (pubDate > today) {
        newErrors.publishedDate = 'Published date cannot be in the future';
      } else if (pubDate < new Date('1800-01-01')) {
        newErrors.publishedDate = 'Published date seems too old';
      }
    }
    
    // Genre validation - required, min 2, max 50 characters
    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    } else if (formData.genre.trim().length < 2) {
      newErrors.genre = 'Genre must be at least 2 characters';
    } else if (formData.genre.trim().length > 50) {
      newErrors.genre = 'Genre must be less than 50 characters';
    }
    
    // Pages validation - positive integer, max 10000
    if (!formData.pages || formData.pages <= 0) {
      newErrors.pages = 'Pages must be greater than 0';
    } else if (formData.pages > 10000) {
      newErrors.pages = 'Pages must be less than 10,000';
    } else if (!Number.isInteger(Number(formData.pages))) {
      newErrors.pages = 'Pages must be a whole number';
    }
    
    // Quantity validation - non-negative integer, max 10000
    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    } else if (formData.quantity > 10000) {
      newErrors.quantity = 'Quantity must be less than 10,000';
    } else if (!Number.isInteger(Number(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a whole number';
    }
    
    // Price validation - non-negative number, max 10000, 2 decimal places
    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    } else if (formData.price > 10000) {
      newErrors.price = 'Price must be less than $10,000';
    } else if (formData.price && !/^\d+(\.\d{1,2})?$/.test(formData.price.toString())) {
      newErrors.price = 'Price can have maximum 2 decimal places';
    }
    
    // Description validation - optional, max 1000 characters
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    // Author Email validation - optional, proper email format
    if (formData.authorEmail && formData.authorEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.authorEmail.trim())) {
        newErrors.authorEmail = 'Invalid email format';
      }
    }

    // Author Age validation - optional, positive integer, reasonable range
    if (formData.authorAge && formData.authorAge.trim()) {
      const age = parseInt(formData.authorAge);
      if (isNaN(age) || age < 0) {
        newErrors.authorAge = 'Age must be a positive number';
      } else if (age > 150) {
        newErrors.authorAge = 'Age seems unrealistic';
      } else if (!Number.isInteger(age)) {
        newErrors.authorAge = 'Age must be a whole number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const bookData = book ? { ...formData, id: book.id } : (({ id, ...rest }) => rest)(formData);
    onSave(bookData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'pages' || name === 'quantity' ? parseInt(value) || 0 : 
               name === 'price' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-2xl border bg-white overflow-hidden shadow max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-lg font-semibold">
                {book ? 'Edit Book' : 'Add New Book'}
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm mt-1">
                Fill in the book details below.
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Book Title *</Label>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="The Great Gatsby"
                className={`h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.title ? 'border-red-500' : ''}`} />
              {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Author *</Label>
              <Input name="author" value={formData.author} onChange={handleChange} placeholder="F. Scott Fitzgerald"
                className={`h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.author ? 'border-red-500' : ''}`} />
              {errors.author && <span className="text-xs text-red-500">{errors.author}</span>}
            </div>

            {/* Genre & ISBN */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Genre *</Label>
                <Input name="genre" value={formData.genre} onChange={handleChange} placeholder="Classic Fiction"
                  className={`h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.genre ? 'border-red-500' : ''}`} />
                {errors.genre && <span className="text-xs text-red-500">{errors.genre}</span>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">ISBN *</Label>
                <Input name="isbn" value={formData.isbn} onChange={handleChange} placeholder="978-3-16-148410-0"
                  className={`h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.isbn ? 'border-red-500' : ''}`} />
                {errors.isbn && <span className="text-xs text-red-500">{errors.isbn}</span>}
              </div>
            </div>

            {/* Publisher */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Publisher *</Label>
              <Input name="publisher" value={formData.publisher} onChange={handleChange} placeholder="Penguin Books"
                className={`h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.publisher ? 'border-red-500' : ''}`} />
              {errors.publisher && <span className="text-xs text-red-500">{errors.publisher}</span>}
            </div>

            {/* Stats Grid: Pages, Qty, Price */}
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Pages</Label>
                    <Input type="number" name="pages" value={formData.pages} onChange={handleChange} className="h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Qty</Label>
                    <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Price ($)</Label>
                    <Input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
            </div>

            {/* Published Date */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Published Date *</Label>
              <Input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange}
                className="h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              {errors.publishedDate && <span className="text-xs text-red-500">{errors.publishedDate}</span>}
            </div>

            {/* Description - Full Width */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Summary of the book..."
                rows={4} className="bg-white border resize-none p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
            </div>

            {/* Author Email & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Author Email</Label>
                <Input type="email" name="authorEmail" value={formData.authorEmail} onChange={handleChange} placeholder="author@example.com"
                  className={`h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.authorEmail ? 'border-red-500' : ''}`} />
                {errors.authorEmail && <span className="text-xs text-red-500">{errors.authorEmail}</span>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Author Age</Label>
                <Input type="number" name="authorAge" value={formData.authorAge} onChange={handleChange} placeholder="35"
                  className={`h-10 bg-white border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${errors.authorAge ? 'border-red-500' : ''}`} />
                {errors.authorAge && <span className="text-xs text-red-500">{errors.authorAge}</span>}
              </div>
            </div>

          {/* Footer Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t">
            <Button type="submit" 
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium">
              {book ? 'Save Changes' : 'Add Book'}
            </Button>
          </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}