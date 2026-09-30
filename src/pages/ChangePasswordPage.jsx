import { Eye, EyeOff, Lock, Info, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header/header'

export default function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdatePassword = () => {
    console.log('Update password:', { currentPassword, newPassword, confirmPassword })
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-12 w-full flex flex-col items-center">
        
        {/* Breadcrumb Navigation */}
        <div className="w-full max-w-md flex items-center gap-1 text-xs mb-6">
          <Link to="/profile" className="text-gray-500 hover:text-gray-700 transition-colors">
            Profile
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-teal-600 font-semibold">Change Password</span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-full max-w-md">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h1>
            <p className="text-gray-500 text-sm">
              Update your account password to keep your wallet and documents secure.
            </p>
          </div>

          {/* Current Password */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Requirements Hint */}
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
            <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Must be at least 8 characters with one uppercase, one number, and one special character.
            </p>
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdatePassword}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm py-3.5 rounded-lg transition-colors"
          >
            Update Password
          </button>

        </div>
      </main>
    </div>
  )
}