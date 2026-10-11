import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Helper to check if a path is the current active route
  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white border-b border-gray-100 relative z-50">
      {/* Desktop & mobile top bar */}
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center">
        {/* Logo — left */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline flex-shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-[17px] font-bold text-gray-900 tracking-tight">
            YourSmartPrint
          </span>
        </Link>

        {/* Center nav links — hidden on mobile */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
          <Link
            to="/about"
            className={`text-[14px] transition-colors no-underline ${
              isActive('/about')
                ? 'font-semibold text-teal-500'
                : 'font-normal text-gray-500 hover:text-gray-800'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/help"
            className={`text-[14px] transition-colors no-underline ${
              isActive('/help')
                ? 'font-semibold text-teal-500'
                : 'font-normal text-gray-500 hover:text-gray-800'
            }`}
          >
            Help
          </Link>
        </nav>

        {/* Login — hidden on mobile */}
        <Link
          to="/login"
          className="hidden md:inline-flex bg-teal-500 hover:bg-teal-600 text-white text-[14px] font-semibold px-5 py-2 rounded-xl transition-colors no-underline flex-shrink-0"
        >
          Login
        </Link>

        {/* Hamburger — visible on mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden ml-auto flex flex-col gap-[5px] justify-center items-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 pb-5 gap-4 border-t border-gray-100 pt-4">
          <Link
            to="/about"
            className={`text-[15px] transition-colors no-underline ${
              isActive('/about')
                ? 'font-semibold text-teal-500'
                : 'font-normal text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/help"
            className={`text-[15px] transition-colors no-underline ${
              isActive('/help')
                ? 'font-semibold text-teal-500'
                : 'font-normal text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Help
          </Link>
          <Link
            to="/login"
            className="bg-teal-500 hover:bg-teal-600 text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl transition-colors no-underline text-center"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}