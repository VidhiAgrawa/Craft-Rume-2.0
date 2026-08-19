import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { Sun, Moon, Menu, X, LogOut } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme, downloadedFiles = [], user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
    { name: 'Downloads', path: '/download' },
    { name: 'About', path: '/about' },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="w-full max-w-6xl mx-auto px-4 py-4 sticky top-2 z-50 transition-all duration-300">
      {/* Floating Pill Container using Global.css shadow classes */}
      <div
        className={`w-full rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 relative ${
          isDarkMode
            ? 'small-box-shadow-black text-white bg-[#1e1e1e]'
            : 'white small-box-shadow text-slate-800'
        }`}
      >
        {/* Brand Logo & Name */}
        <Link 
          to="/"
          className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
        >
          <span 
            className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105 ${
              isDarkMode ? 'text-[#A5B4FC]' : 'text-[#534DB4]'
            }`}
          >
            CraftRume 2.0
          </span>
        </Link>

        {/* Desktop Navigation Links - Shown only if logged in */}
        {user ? (
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative py-1 text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? isDarkMode
                        ? 'text-[#A5B4FC]'
                        : 'text-[#534DB4]'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-[#534DB4]'
                  }`}
                >
                  <span>{item.name}</span>

                  {/* Badge for Downloads link */}
                  {item.path === '/download' && downloadedFiles.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                      {downloadedFiles.length}
                    </span>
                  )}

                  {/* Active Underline Indicator */}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2.5px] rounded-full transition-all duration-300 ${
                        isDarkMode ? 'bg-[#A5B4FC]' : 'bg-[#534DB4]'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="hidden md:block text-xs font-bold text-slate-400">
            Sign in to unlock website
          </div>
        )}

        {/* Right Section Actions: Theme Toggle & Logout */}
        <div className="hidden md:flex items-center gap-3 shrink-0 relative">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`p-2.5 rounded-full circle-box-shadow transition-all duration-300 cursor-pointer flex items-center justify-center ${
              isDarkMode ? 'bg-[#2a2a2a] text-amber-300 hover:bg-[#333]' : 'bg-slate-50 text-[#534DB4] hover:bg-slate-100'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 md:w-5 md:h-5 text-[#534DB4] transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
          </button>

          {user && (
            <button
              onClick={onLogout}
              title={`Log out (${user.name})`}
              className="px-3.5 py-1.5 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-slate-200 dark:border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-full circle-box-shadow flex items-center justify-center cursor-pointer ${
              isDarkMode ? 'bg-[#2a2a2a] text-amber-300' : 'bg-slate-100 text-[#534DB4]'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#534DB4]" />}
          </button>

          {user && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDarkMode ? 'text-white hover:bg-slate-800' : 'text-[#534DB4] hover:bg-slate-100'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Collapsible Drawer */}
      {isMobileMenuOpen && user && (
        <div
          className={`md:hidden mt-3 rounded-2xl p-4 transition-all duration-300 ${
            isDarkMode
              ? 'small-box-shadow-black text-white bg-[#1e1e1e]'
              : 'white medium-box-shadow text-slate-800'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    active
                      ? isDarkMode
                        ? 'bg-indigo-950/60 text-indigo-300'
                        : 'bg-indigo-50 text-[#534DB4]'
                      : 'hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.path === '/download' && downloadedFiles.length > 0 && (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                        {downloadedFiles.length}
                      </span>
                    )}
                  </div>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-[#534DB4]" />
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-red-500 hover:underline px-2 py-1 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
