import { User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            {/* Simple SVG icon to mimic the printer/check logo */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">YourSmartPrint</span>
        </Link>

        {/* Profile Section */}
        <div className="w-10 h-10 rounded-full border-2 border-teal-100 flex items-center justify-center overflow-hidden">
             <div className="bg-teal-50 w-full h-full flex items-center justify-center">
                <User className="w-5 h-5  cursor-pointer text-teal-600" />
             </div>
        </div>
      </div>
    </header>
  )
}