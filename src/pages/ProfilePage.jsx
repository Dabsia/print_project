import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header/Header'

export default function ProfilePage() {
  const navigate = useNavigate()

  // Form state
  const [firstName, setFirstName] = useState('Dabo')
  const [surname, setSurname] = useState('Johnson')
  const [phoneNumber, setPhoneNumber] = useState('+234 812 345 6789')

  // Preference toggles
  const [defaultDoubleSided, setDefaultDoubleSided] = useState(false)
  const [bwEconomyMode, setBwEconomyMode] = useState(true)

  const handleSaveChanges = () => {
    console.log('Saved:', { firstName, surname, phoneNumber })
    // TODO: Send to backend
  }

  const handleSignOut = () => {
    console.log('Signing out...')
    // TODO: Clear auth
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        {/* Back Button */}
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-1 text-teal-600 font-bold text-xs tracking-wider hover:text-teal-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Profile Card + Logout */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <span className="text-3xl font-bold text-white tracking-wide">DJ</span>
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">Dabo Johnson</h2>

              {/* Email */}
              <p className="text-sm text-gray-500 mb-3">dabo.johnson@email.com</p>

              {/* User ID */}
              <p className="text-xs text-gray-500">
                USER ID: <span className="font-bold text-gray-900">YSP-8472-DJ</span>
              </p>
            </div>

            {/* Logout Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Log Out</h3>
              <p className="text-xs text-gray-500 mb-4">
                Sign out of your YourSmartPrint account on this device.
              </p>
              <button
                onClick={handleSignOut}
                className="w-full border border-red-300 text-red-500 font-semibold text-sm py-2.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>

          </div>

          {/* Right Column: Personal Info + Settings */}
          <div className="lg:col-span-2 space-y-6">

            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Surname */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Surname</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-600 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveChanges}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>

            {/* Security Settings Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-6">Security Settings</h2>

              <Link to="/change-password" className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity">
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">Change Password</p>
                  <p className="text-xs text-gray-500">Update your credentials regularly</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </Link>
            </div>

            {/* Print Preferences Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-base font-bold text-gray-900 mb-6">Print Preferences</h2>

              <div className="space-y-6">
                {/* Default Double-Sided Toggle */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">Default Double-Sided</p>
                    <p className="text-xs text-gray-500">Automatically select duplex if supported</p>
                  </div>
                  <button
                    onClick={() => setDefaultDoubleSided(!defaultDoubleSided)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      defaultDoubleSided ? 'bg-teal-600' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle double-sided printing"
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                        defaultDoubleSided ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* B&W Economy Mode Toggle */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-0.5">B&W Economy Mode</p>
                    <p className="text-xs text-gray-500">
                      Always default new documents to budget-friendly B&W
                    </p>
                  </div>
                  <button
                    onClick={() => setBwEconomyMode(!bwEconomyMode)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      bwEconomyMode ? 'bg-teal-600' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle B&W economy mode"
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${
                        bwEconomyMode ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}