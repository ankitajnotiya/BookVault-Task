import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../componet/header';

const faqData = [
  {
    category: "Getting Started",
    icon: "📚",
    questions: [
      {
        question: "How do I add my first book to the inventory?",
        answer: "To add your first book, click the 'Add Book' button on the main dashboard. Fill in the required information including title, author, ISBN, and other details. Click 'Save' to add the book to your inventory."
      },
      {
        question: "What information do I need to provide for each book?",
        answer: "For each book, you'll need to provide: Title, Author, ISBN, Publisher, Published Date, Genre, Number of Pages, Quantity, Price, and a brief description. The cover image is optional but recommended."
      },
      {
        question: "Can I import books from a spreadsheet?",
        answer: "Currently, you can add books individually through the form. We're working on a bulk import feature that will allow you to upload CSV or Excel files in a future update."
      }
    ]
  },
  {
    category: "Inventory Management",
    icon: "📚",
    questions: [
      {
        question: "How do I search for specific books?",
        answer: "Use the search bar at the top of the page to search by title, author, ISBN, or genre. The search results update in real-time as you type."
      },
      {
        question: "Can I edit book information after adding it?",
        answer: "Yes! Click on any book in your inventory to view its details, then click the 'Edit' button to modify any information. Don't forget to save your changes."
      },
      {
        question: "How do I delete a book from my inventory?",
        answer: "Open the book details and click the 'Delete' button. You'll be asked to confirm the deletion before the book is permanently removed from your inventory."
      },
      {
        question: "Is there a limit to how many books I can add?",
        answer: "There's no limit to the number of books you can add to your inventory. You can manage as many books as you need for your personal or professional library."
      }
    ]
  },
  {
    category: "Technical Support",
    icon: "❓",
    questions: [
      {
        question: "Is my data secure?",
        answer: "Yes, your data is stored locally in your browser and is not transmitted to any external servers. We recommend regularly backing up your inventory data to prevent data loss."
      },
      {
        question: "What browsers are supported?",
        answer: "BookVault works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience."
      },
      {
        question: "Can I access my inventory on multiple devices?",
        answer: "Currently, your inventory is stored locally on each device. We're working on cloud sync functionality that will allow you to access your inventory across multiple devices."
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about BookVault and managing your book inventory.
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Still need help?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a href="mailto:support@bookvault.com" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors">
                  <span className="text-sm">📧</span>
                  Email Support
                </a>
                <a href="tel:+15551234567" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-colors">
                  <span className="text-sm">📞</span>
                  Call Us
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => {
              const categoryStartIndex = categoryIndex * 100;
              
              return (
                <div key={categoryIndex} className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-lg sm:rounded-xl bg-white/20 p-1.5 sm:p-2">
                        <div className="h-4 w-4 sm:h-6 text-white flex items-center justify-center">{category.icon}</div>
                      </div>
                      <h2 className="text-lg sm:text-xl sm:text-2xl font-bold text-white">
                        {category.category}
                      </h2>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryStartIndex + itemIndex;
                      const isOpen = openItems.has(globalIndex);
                      
                      return (
                        <div key={itemIndex} className="p-3 sm:p-4 sm:p-6">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
                          >
                            <h3 className="text-sm sm:text-base sm:text-lg font-semibold text-gray-900 pr-4">
                              {item.question}
                            </h3>
                            <div className="flex-shrink-0">
                              {isOpen ? (
                                <span className="text-gray-500">▲</span>
                              ) : (
                                <span className="text-gray-500">▼</span>
                              )}
                            </div>
                          </button>
                          
                          {isOpen && (
                            <div className="mt-3 sm:mt-4 pl-2 pr-8">
                              <p className="text-xs sm:text-sm sm:text-base text-gray-600 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
