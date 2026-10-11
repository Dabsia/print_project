import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-teal-500 rounded-md flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">YourSmartPrint</span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-400 mb-12 text-center">
          Modern printing for everyone—fast, secure, and convenient.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-gray-700/60 mb-6"></div>

        {/* Bottom Row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span>© 2026 YourSmartPrint</span>
          <div className="flex items-center gap-6">
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
