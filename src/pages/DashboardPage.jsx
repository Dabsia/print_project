import { ArrowRight, FileText, Image as ImageIcon } from 'lucide-react'
import Button from '../components/Button'
import Header from '../components/Header/header'
import { Link, useNavigate } from 'react-router-dom'

// 1. Define the documents data array outside the component
const RECENT_DOCUMENTS = [
  {
    id: 1,
    name: 'Project_Proposal_Draft_v2.pdf',
    date: 'Oct 12, 2026',
    pages: 24,
    status: 'PRINTED',
    type: 'pdf',
  },
  {
    id: 2,
    name: 'Final_Thesis_Revision.docx',
    date: 'Oct 11, 2026',
    pages: 112,
    status: 'PENDING',
    type: 'doc',
  },
  {
    id: 3,
    name: 'Passport_Photo_Scan.jpg',
    date: 'Oct 10, 2026',
    pages: 1,
    status: 'PRINTED',
    type: 'image',
  },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Dabo</h1>
          <p className="text-gray-500 mt-2">Manage your prints, wallet, and documents from a single workspace.</p>
        </div>

        {/* Upload Document Card */}
        <div
          onClick={() => navigate('/upload-doc')}
          className="bg-white rounded-xl p-6 mb-8 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-teal-600 rotate-[-45deg]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Upload Document</h2>
              <p className="text-gray-500 text-sm">Upload and configure your print job</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Recent Documents */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Documents</h2>
                <Link to="/print-history" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {/* 2. Map over the documents array */}
                {RECENT_DOCUMENTS.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 bg-white rounded border border-gray-200 flex items-center justify-center flex-shrink-0">
                        {/* 3. Conditionally render icon based on file type */}
                        {doc.type === 'image' ? (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <FileText className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{doc.name}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {doc.date} • {doc.pages} {doc.pages === 1 ? 'page' : 'pages'}
                        </p>
                      </div>
                    </div>

                    {/* 4. Conditionally style status badge */}
                    <span
                      className={`self-start sm:self-auto px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0 ${
                        doc.status === 'PRINTED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Wallet Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Wallet Overview</h2>

              <div className="bg-gray-900 rounded-lg p-6 mb-6 text-white">
                <p className="text-xs font-medium text-gray-400 tracking-wider mb-2">
                  AVAILABLE PRINTING CREDIT
                </p>
                <p className="text-3xl font-bold">N1,250.00</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/wallet')}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors border-none"
                >
                  Top Up Wallet
                </Button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Get Help Button */}
      <div className="fixed bottom-8 right-8">
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors flex items-center gap-2 border-none"
        >
          Get Help
        </Button>
      </div>
    </div>
  )
}