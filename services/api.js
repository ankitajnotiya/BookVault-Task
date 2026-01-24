/**
 * @typedef {import('../app/page').Book} Book
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class BookApiService {
  /**
   * Get all books
   * @returns {Promise<Book[]>}
   */
  async getBooks() {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      // Fallback to mock data for development
      return this.getMockBooks();
    }
  }

  /**
   * Get a single book by ID
   * @param {string} id
   * @returns {Promise<Book>}
   */
  async getBookById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      const books = this.getMockBooks();
      return books.find(book => book.id === id);
    }
  }

  /**
   * Create a new book
   * @param {Omit<Book, 'id'>} bookData
   * @returns {Promise<Book>}
   */
  async createBook(bookData) {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      // Fallback for development
      return {
        id: Date.now().toString(),
        ...bookData,
      };
    }
  }

  /**
   * Update an existing book
   * @param {string} id
   * @param {Partial<Book>} bookData
   * @returns {Promise<Book>}
   */
  async updateBook(id, bookData) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      // Fallback for development
      return {
        id,
        ...bookData,
      };
    }
  }

  /**
   * Delete a book
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deleteBook(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      // Fallback for development - just log the deletion
      console.log('Book deleted (fallback):', id);
    }
  }

  /**
   * Search books by query
   * @param {string} query
   * @returns {Promise<Book[]>}
   */
  async searchBooks(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching books:', error);
      // Fallback to client-side search
      const books = this.getMockBooks();
      const lowerQuery = query.toLowerCase();
      return books.filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.isbn.includes(query) ||
        book.genre.toLowerCase().includes(lowerQuery)
      );
    }
  }

  /**
   * Mock data for development/fallback
   * @returns {Book[]}
   */
  getMockBooks() {
    return [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '978-0-7432-7356-5',
        publisher: 'Scribner',
        publishedDate: '1925-04-10',
        genre: 'Fiction',
        pages: 180,
        quantity: 12,
        price: 12.99,
        description: 'A classic American novel set in the Jazz Age.',
        coverUrl: 'https://picsum.photos/seed/gatsby/200/300.jpg',
      },
      {
        id: '2',
        title: '1984',
        author: 'George Orwell',
        isbn: '978-0-451-52493-2',
        publisher: 'Signet Classics',
        publishedDate: '1949-06-08',
        genre: 'Dystopian',
        pages: 328,
        quantity: 8,
        price: 15.99,
        description: 'A dystopian social science fiction novel.',
        coverUrl: 'https://picsum.photos/seed/1984/200/300.jpg',
      },
      {
        id: '3',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0-06-112008-4',
        publisher: 'Harper Perennial',
        publishedDate: '1960-07-11',
        genre: 'Fiction',
        pages: 281,
        quantity: 15,
        price: 14.99,
        description: 'An American classic of modern literature.',
        coverUrl: 'https://picsum.photos/seed/mockingbird/200/300.jpg',
      },
      {
        id: '4',
        title: 'Atomic Habits',
        author: 'James Clear',
        isbn: '9780735211292',
        publisher: 'Avery',
        publishedDate: '2018-10-16',
        genre: 'Self-Help',
        pages: 320,
        quantity: 20,
        price: 18.99,
        description: 'Transform your life with tiny changes.',
        coverUrl: 'https://picsum.photos/seed/atomic/200/300.jpg',
      },
      {
        id: '5',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        isbn: '9780316769174',
        publisher: 'Little, Brown',
        publishedDate: '1951-07-16',
        genre: 'Fiction',
        pages: 277,
        quantity: 5,
        price: 13.99,
        description: 'A controversial novel about teenage alienation.',
        coverUrl: 'https://picsum.photos/seed/catcher/200/300.jpg',
      },
      {
        id: '6',
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        isbn: '9780439708180',
        publisher: 'Scholastic',
        publishedDate: '1997-06-26',
        genre: 'Fantasy',
        pages: 309,
        quantity: 25,
        price: 19.99,
        description: 'The magical journey of a young wizard.',
        coverUrl: 'https://picsum.photos/seed/harry/200/300.jpg',
      },
      {
        id: '7',
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        isbn: '9780618640157',
        publisher: 'Houghton Mifflin',
        publishedDate: '1954-07-29',
        genre: 'Fantasy',
        pages: 1216,
        quantity: 10,
        price: 24.99,
        description: 'Epic fantasy adventure in Middle-earth.',
        coverUrl: 'https://picsum.photos/seed/lotr/200/300.jpg',
      },
      {
        id: '8',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        isbn: '9780061122415',
        publisher: 'HarperOne',
        publishedDate: '1988-05-01',
        genre: 'Fiction',
        pages: 208,
        quantity: 18,
        price: 16.99,
        description: 'A mystical story about following your dreams.',
        coverUrl: 'https://picsum.photos/seed/alchemist/200/300.jpg',
      },
      {
        id: '9',
        title: 'Da Vinci Code',
        author: 'Dan Brown',
        isbn: '9780307474278',
        publisher: 'Doubleday',
        publishedDate: '2003-03-18',
        genre: 'Thriller',
        pages: 689,
        quantity: 12,
        price: 17.99,
        description: 'A thrilling mystery through art and history.',
        coverUrl: 'https://picsum.photos/seed/davinci/200/300.jpg',
      },
      {
        id: '10',
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        isbn: '9780439023528',
        publisher: 'Scholastic',
        publishedDate: '2008-09-14',
        genre: 'Dystopian',
        pages: 374,
        quantity: 22,
        price: 15.99,
        description: 'A dystopian survival competition.',
        coverUrl: 'https://picsum.photos/seed/hunger/200/300.jpg',
      },
      {
        id: '11',
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        isbn: '9781594480003',
        publisher: 'Riverhead Books',
        publishedDate: '2003-05-29',
        genre: 'Fiction',
        pages: 372,
        quantity: 14,
        price: 14.99,
        description: 'A story of friendship and redemption.',
        coverUrl: 'https://picsum.photos/seed/kite/200/300.jpg',
      },
      {
        id: '12',
        title: 'Life of Pi',
        author: 'Yann Martel',
        isbn: '9780156027328',
        publisher: 'Harcourt',
        publishedDate: '2001-09-11',
        genre: 'Adventure',
        pages: 326,
        quantity: 16,
        price: 13.99,
        description: 'An epic adventure of survival and faith.',
        coverUrl: 'https://picsum.photos/seed/pi/200/300.jpg',
      },
      {
        id: '13',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        isbn: '9780141439518',
        publisher: 'Penguin Classics',
        publishedDate: '1813-01-28',
        genre: 'Romance',
        pages: 432,
        quantity: 9,
        price: 12.99,
        description: 'A classic romance novel.',
        coverUrl: 'https://picsum.photos/seed/pride/200/300.jpg',
      },
      {
        id: '14',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        isbn: '9780618260300',
        publisher: 'Houghton Mifflin',
        publishedDate: '1937-09-21',
        genre: 'Fantasy',
        pages: 310,
        quantity: 20,
        price: 14.99,
        description: 'Bilbo Baggins unexpected adventure.',
        coverUrl: 'https://picsum.photos/seed/hobbit/200/300.jpg',
      },
      {
        id: '15',
        title: 'Brave New World',
        author: 'Aldous Huxley',
        isbn: '9780060850524',
        publisher: 'Harper Perennial',
        publishedDate: '1932-08-30',
        genre: 'Dystopian',
        pages: 288,
        quantity: 11,
        price: 15.99,
        description: 'A futuristic dystopian society.',
        coverUrl: 'https://picsum.photos/seed/brave/200/300.jpg',
      },
    ];
  }
}

export const bookApi = new BookApiService();
