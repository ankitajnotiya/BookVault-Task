import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Download, Filter, Plus, Grid3X3, List, ChevronLeft, ChevronRight, Home, User, Users, Settings, Briefcase, UserPlus, FileText, Menu, X, Share2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PersonCard from '../components/PersonCard';

const peopleData = [
  { id: 1, name: 'Ethan Lee', title: 'IT Specialist', avatarImage: '/assets/IT_Specialist_Img.png', rightIcon: '/assets/IT_Specialist_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 2, name: 'Emily Baker', title: 'Marketing Manager', avatarImage: '/assets/Marketing_Manager_img.png', rightIcon: '/assets/Marketing_Manager_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 3, name: 'Micheal Shaun', title: 'Sales Director', avatarImage: '/assets/Sales_Director_Img.png', rightIcon: '/assets/Sales_Director_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 4, name: 'Liam Carter', title: 'Product Designer', avatarImage: '/assets/Product_Designer_Img.png', rightIcon: '/assets/Product_Designer_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 5, name: 'Grace Kim', title: 'Customer Lead', avatarImage: '/assets/Customer_Lead_Img.png', rightIcon: '/assets/Customer_Lead_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 6, name: 'Noah Williams', title: 'Finance Head', avatarImage: '/assets/Finance_Head_Img.png', rightIcon: '/assets/Finance_Head_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 7, name: 'Isabella Rossi', title: 'Operations Manager', avatarImage: '/assets/Operations_Manager_Img.png', rightIcon: '/assets/Operations_Manager_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 8, name: 'Ava Thompson', title: 'HR Executive', avatarImage: '/assets/HR_Executive_Img.png', rightIcon: '/assets/HR_Executive_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 9, name: 'James Wilson', title: 'Software Engineer', avatarImage: '/assets/IT_Specialist_Img.png', rightIcon: '/assets/IT_Specialist_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 10, name: 'Sophia Martinez', title: 'UX Designer', avatarImage: '/assets/Product_Designer_Img.png', rightIcon: '/assets/Product_Designer_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 11, name: 'Oliver Brown', title: 'Data Analyst', avatarImage: '/assets/Finance_Head_Img.png', rightIcon: '/assets/Finance_Head_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
  { id: 12, name: 'Emma Davis', title: 'Project Manager', avatarImage: '/assets/Operations_Manager_Img.png', rightIcon: '/assets/Operations_Manager_Badges.png', dotColors: ['#FFC83E', '#70D32E', '#6194EC', '#FB8C3D'] },
];

const OrgChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="4" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
    <line x1="12" y1="7" x2="12" y2="12" stroke="currentColor" strokeWidth="1"/>
    <line x1="12" y1="12" x2="6" y2="16" stroke="currentColor" strokeWidth="1"/>
    <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="1"/>
    <line x1="12" y1="12" x2="18" y2="16" stroke="currentColor" strokeWidth="1"/>
    <circle cx="6" cy="18" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
    <circle cx="12" cy="18" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
    <circle cx="18" cy="18" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
  </svg>
);


export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 w-screen">
      {/* Mobile Menu Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        mobileSidebarOpen={mobileSidebarOpen} 
        setMobileSidebarOpen={setMobileSidebarOpen}
        location={location}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 rounded hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: '#947550' }}>People</h2>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-3">
                  <span className="text-sm font-medium" style={{ color: '#3D3936' }}>MST</span>
                </div>
                <div className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-1">
                  <img src="/assets/Plus 2.png" alt="Plus" className="w-6 h-6" />
                  <span className="text-sm font-medium" style={{ color: '#3D3936' }}>02:03:02</span>
                  <img src="/assets/edit.png" alt="Edit" className="w-10 h-10" />
                </div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center">
                  <img src="/assets/notification.png" alt="Notification" className="w-full h-full" />
                  <span className="absolute top-1 right-1 sm:top-2 sm:right-2 block w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <img src="/assets/profile.png" alt="Profile" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" />
              </div>
              {/* Mobile Profile */}
              <div className="flex sm:hidden items-center space-x-2">
                <div className="relative w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                  <img src="/assets/notification.png" alt="Notification" className="w-full h-full" />
                  <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <img src="/assets/profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-3 sm:p-6">
          {/* Search Bar and Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            {/* Search Bar */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by Employee Name or Number" 
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 border border-[#E5E5E4] rounded-lg transition-colors hover:bg-[#3D3936]">
                <Download size={20} className="text-[#3D3936] hover:text-white" />
              </button>
              <button className="p-2 border border-[#E5E5E4] rounded-lg transition-colors hover:bg-[#3D3936]">
                <Filter size={20} className="text-[#3D3936] hover:text-white" />
              </button>
              <button className="p-2 border border-[#E5E5E4] rounded-lg transition-colors hover:bg-[#3D3936]">
                <Plus size={20} className="text-[#3D3936] hover:text-white" />
              </button>
              <div className="flex items-center border border-[#E5E5E4] rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#3D3936]' : 'hover:bg-[#3D3936]'} rounded-l-lg transition-colors border-r border-[#E5E5E4]`}
                >
                  <Grid3X3 size={20} className={`${viewMode === 'grid' ? 'text-white' : 'text-[#3D3936] hover:text-white'}`} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#3D3936]' : 'hover:bg-[#3D3936]'} transition-colors border-r border-[#E5E5E4]`}
                >
                  <List size={20} className={`${viewMode === 'list' ? 'text-white' : 'text-[#3D3936] hover:text-white'}`} />
                </button>
                <button
                  onClick={() => setViewMode('orgchart')}
                  className={`p-2 ${viewMode === 'orgchart' ? 'bg-[#3D3936]' : 'hover:bg-[#3D3936]'} rounded-r-lg transition-colors`}
                >
                  <OrgChartIcon className={`${viewMode === 'orgchart' ? 'text-white' : 'text-[#3D3936] hover:text-white'}`} />
                </button>
              </div>
            </div>
          </div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {peopleData.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {peopleData.map((person) => (
                    <tr key={person.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-2 sm:mr-3 text-xs sm:text-sm">
                            {person.avatar}
                          </div>
                          <span className="font-medium text-gray-900 text-sm sm:text-base">{person.name}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {person.title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* Footer Pagination */}
        <footer className="bg-white border-t border-gray-200 px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2" style={{ fontSize: '12px sm:14px', color: '#3D3936' }}>
              <span className="text-xs sm:text-sm">1-100 of 500</span>
              <button className="p-1 hover:bg-gray-100 rounded border border-gray-300" style={{ color: '#3D3936' }}>
                <ChevronLeft size={16} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded border border-gray-300" style={{ color: '#3D3936' }}>
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-2" style={{ fontSize: '12px sm:14px', color: '#3D3936' }}>
              <span>Rows per page:</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm" style={{ fontSize: '12px sm:14px', color: '#3D3936' }}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option selected>100</option>
              </select>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
