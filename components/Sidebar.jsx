import { Link } from 'react-router-dom';
import { Home, User, Users, Settings, Briefcase, UserPlus, FileText, X } from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: User, label: 'My Info', href: '/my-info' },
  { icon: Users, label: 'People', href: '/' },
  { icon: Users, label: 'Team Management', href: '/team-management' },
  { icon: Briefcase, label: 'Project Setup', href: '/project-setup' },
  { icon: UserPlus, label: 'Hiring', href: '/hiring' },
  { icon: FileText, label: 'Report', href: '/report' },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, mobileSidebarOpen, setMobileSidebarOpen, location }) {
  return (
    <div className={`${
      sidebarOpen ? 'w-64' : 'w-20'
    } bg-[#3D3936] text-white transition-all duration-300 flex flex-col fixed lg:relative h-full z-50 transform ${
      mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      {/* Logo */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className={`font-bold text-xl text-white ${!sidebarOpen && 'hidden'}`}>CORE</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded hover:bg-gray-700 transition-colors hidden lg:block"
            >
              <img src="/assets/arrow.png" alt="Arrow" className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-2 rounded hover:bg-gray-700 transition-colors lg:hidden"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  (item.label === 'People' && location.pathname === '/')
                    ? 'bg-white text-[#947550]'
                    : 'hover:bg-white hover:text-[#947550]'
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings */}
      <div className="p-4">
        <Link
          to="/settings"
          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors border border-white ${
            location.pathname === '/settings'
              ? 'bg-white text-[#947550]'
              : 'hover:bg-gray-700 text-gray-300'
          }`}
        >
          <Settings size={20} />
          {sidebarOpen && <span className="text-sm">Settings</span>}
        </Link>
      </div>
    </div>
  );
}
