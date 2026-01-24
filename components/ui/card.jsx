import * as React from "react"
import { cn } from "../../lib/utils"

// --- Components (Wahi original structure, better design ke saath) ---
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1 p-3 sm:p-4", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-bold leading-tight text-gray-800 line-clamp-1", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-xs text-gray-500", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-3 sm:px-4 pb-2", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2 px-3 sm:px-4 pb-3 sm:pb-4", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

// --- Main Page (Responsive Grid, Book Images, and Pagination) ---
export default function BookGallery() {
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: "4.5", price: "₹299" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", rating: "4.8", price: "₹399" },
    { id: 3, title: "1984", author: "George Orwell", rating: "4.6", price: "₹349" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", rating: "4.7", price: "₹299" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", rating: "4.2", price: "₹399" },
    { id: 6, title: "Animal Farm", author: "George Orwell", rating: "4.4", price: "₹249" },
    { id: 7, title: "Brave New World", author: "Aldous Huxley", rating: "4.3", price: "₹349" },
    { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", rating: "4.9", price: "₹499" },
    { id: 9, title: "Harry Potter", author: "J.K. Rowling", rating: "4.8", price: "₹599" },
    { id: 10, title: "The Lord of the Rings", author: "J.R.R. Tolkien", rating: "4.9", price: "₹699" },
    { id: 11, title: "The Alchemist", author: "Paulo Coelho", rating: "4.1", price: "₹299" },
    { id: 12, title: "Da Vinci Code", author: "Dan Brown", rating: "4.3", price: "₹349" },
    { id: 13, title: "The Hunger Games", author: "Suzanne Collins", rating: "4.4", price: "₹399" },
    { id: 14, title: "The Kite Runner", author: "Khaled Hosseini", rating: "4.7", price: "₹349" },
    { id: 15, title: "Life of Pi", author: "Yann Martel", rating: "4.2", price: "₹299" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Responsive Grid: Mobile 1, Tablet 2, Desktop 3, Large Desktop 5 */}
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {books.map((book) => (
          <Card key={book.id} className="flex flex-col h-fit transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            {/* Book Image with Rating Badge */}
            <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-gray-100">
              <img 
                src={`https://picsum.photos/seed/book${book.id}/300/200`} 
                alt={book.title} 
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
              {/* Rating Badge */}
              <div className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-semibold text-gray-800 shadow-md">
                ⭐ {book.rating}
              </div>
            </div>
            
            <CardHeader className="pb-1">
              <CardTitle className="text-xs sm:text-sm font-semibold line-clamp-1">{book.title}</CardTitle>
              <CardDescription className="text-xs text-gray-500">{book.author}</CardDescription>
            </CardHeader>

            <CardContent className="pb-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-600">{book.price}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">({Math.floor(Math.random() * 500) + 100})</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="gap-1">
              <button className="flex-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                View
              </button>
              <button className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500">
                Compare
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Responsive Pagination */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        <button className="rounded-lg border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors">Prev</button>
        <button className="rounded-lg border bg-blue-600 px-3 py-1.5 text-xs sm:text-sm font-medium text-white">1</button>
        <button className="rounded-lg border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors">2</button>
        <button className="rounded-lg border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors">3</button>
        <button className="rounded-lg border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors">Next</button>
      </div>
    </div>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }