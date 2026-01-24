import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Grid: Mobile par columns 2 rakhe hain taaki links side-by-side dikhen */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-4 md:grid-cols-2 grid-cols-2">
          
          {/* Brand - Mobile par full width lega (col-span-2) */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-1 md:col-span-2 col-span-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-2 sm:p-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-6 w-6 sm:h-8 sm:w-8 text-white flex items-center justify-center">📚</div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">BookVault</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Inventory Management System</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
              Manage your book collection with ease and efficiency. Our modern interface makes inventory management a breeze.
            </p>
          </div>

          {/* Quick Links - Mobile par Left side (col-span-1) */}
          <div className="space-y-4 sm:space-y-6 col-span-1 lg:col-start-2 lg:col-end-3">
            <h4 className="text-base sm:text-lg font-bold text-gray-800">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-xs sm:text-sm">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-xs sm:text-sm">
                  Add Book
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-xs sm:text-sm">
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-xs sm:text-sm">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Resources - Mobile par Right side (col-span-1) */}
          <div className="space-y-4 sm:space-y-6 col-span-1 lg:col-start-3 lg:col-end-4">
            <h4 className="text-base sm:text-lg font-bold text-gray-800">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-xs sm:text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-xs sm:text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-green-600 transition-colors font-medium text-xs sm:text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Mobile par full width (col-span-2) */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-1 md:col-span-2 col-span-2">
            <h4 className="text-base sm:text-lg font-bold text-gray-800">Get in Touch</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl bg-blue-100 p-1.5 sm:p-2">
                  <div className="h-3 w-3 sm:h-5 sm:w-5 text-blue-600 flex items-center justify-center">📧</div>
                </div>
                <span className="text-gray-600 font-medium text-xs sm:text-sm">support@bookvault.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl bg-green-100 p-1.5 sm:p-2">
                  <div className="h-3 w-3 sm:h-5 sm:w-5 text-green-600 flex items-center justify-center">📞</div>
                </div>
                <span className="text-gray-600 font-medium text-xs sm:text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl bg-purple-100 p-1.5 sm:p-2">
                  <div className="h-3 w-3 sm:h-5 sm:w-5 text-purple-600 flex items-center justify-center">📍</div>
                </div>
                <span className="text-gray-600 font-medium text-xs sm:text-sm">123 Book Street, Library City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <p className="text-gray-600 font-medium text-xs sm:text-sm text-center">
              © 2026 BookVault. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}