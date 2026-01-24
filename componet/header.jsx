import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';
import { ProfileFormModal } from './ProfileFormModal';

export function Header({ searchQuery, setSearchQuery }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileModalOpen && !event.target.closest('.profile-modal')) {
        setIsProfileModalOpen(false);
      }
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileModalOpen, isProfileDropdownOpen]);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand Section */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h2 className="text-[22px] lg:text-[36px] font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent leading-none">
                  BookVault
                </h2>
                <p className="text-[14px] lg:text-[18px] uppercase tracking-[0.15em] text-slate-500 font-bold mt-1">
                  Inventory System
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a 
                href="/" 
                className="text-black hover:text-black font-medium transition-colors"
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-black hover:text-black font-medium transition-colors"
              >
                Books
              </a>
              <a 
                href="#" 
                className="text-black hover:text-black font-medium transition-colors"
              >
                Settings
              </a>
              {/* Search Input */}
              <div className="relative">
                <Input
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-48 text-sm border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                />
              </div>
            </nav>

            {/* Status Section & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Profile Icon Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="hidden md:block p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        window.location.href = '/profile';
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Profile
                    </button>
                  </div>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <span className="text-sm"></span> : <span className="text-sm"></span>}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-slate-200/50">
              <div className="flex flex-col gap-3">
                <a 
                  href="/" 
                  className="text-black hover:text-black font-medium transition-colors p-2 rounded-lg hover:bg-gray-50"
                >
                  Home
                </a>
                <a 
                  href="#" 
                  className="text-black hover:text-black font-medium transition-colors p-2 rounded-lg hover:bg-gray-50"
                >
                  Books
                </a>
                <a 
                  href="#" 
                  className="text-black hover:text-black font-medium transition-colors p-2 rounded-lg hover:bg-gray-50"
                >
                  Settings
                </a>
                <a 
                  href="/profile" 
                  className="text-black hover:text-black font-medium transition-colors p-2 rounded-lg hover:bg-gray-50"
                >
                  Profile
                </a>
                {/* Mobile Search */}
                <div className="relative pt-2">
                  <Input
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-full text-sm border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg"
                  />
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
      
      {/* Profile Modal */}
      {isProfileModalOpen && (
        <ProfileFormModal 
          onClose={() => setIsProfileModalOpen(false)}
          onSave={(data) => {
            console.log('Profile saved:', data);
          }}
        />
      )}
    </>
  );
}