import { ArrowLeft, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from "../components/Header/Header"

// Exact data from the screenshot
const PRINT_JOBS = [
  {
    id: 1,
    name: 'Project_Report_Final.pdf',
    date: 'Oct 12, 2026',
    pages: 24,
    colorMode: 'B&W',
    status: 'PRINTED'
  },
  {
    id: 2,
    name: 'Syllabus_Handout.docx',
    date: 'Oct 12, 2026',
    pages: 8,
    colorMode: 'Color',
    status: 'PRINTING'
  },
  {
    id: 3,
    name: 'Flyer_Design_v2.png',
    date: 'Oct 11, 2026',
    pages: 1,
    colorMode: 'Color',
    status: 'PENDING'
  },
  {
    id: 4,
    name: 'Term_Paper_Draft.pdf',
    date: 'Oct 10, 2026',
    pages: 45,
    colorMode: 'B&W',
    status: 'PRINTED'
  },
  {
    id: 5,
    name: 'Passport_Photo_Backup.jpg',
    date: 'Oct 08, 2026',
    pages: 1,
    colorMode: 'Color',
    status: 'CANCELLED'
  }
]

const FILTERS = ['All', 'Pending', 'Printing', 'Printed', 'Cancelled']

export default function PrintHistoryPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredJobs = PRINT_JOBS.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === 'All' || 
      job.status.toUpperCase() === activeFilter.toUpperCase()
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'PRINTED':
        return 'bg-green-100 text-green-700'
      case 'PRINTING':
        return 'bg-blue-100 text-blue-700'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'
      case 'CANCELLED':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Icon to mimic the file icon in the screenshot (a document with a folded corner)
  const FileIcon = () => (
    <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        {/* Back Button */}
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-1 text-teal-600 font-bold text-xs tracking-wider hover:text-teal-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Print History</h1>
          <p className="text-gray-500 text-sm mt-1">Track all your past and current print jobs</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium text-xs whitespace-nowrap transition-colors border ${
                  activeFilter === filter
                    ? 'bg-teal-50 text-teal-700 border-teal-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Print Jobs List */}
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
              <p className="text-gray-500">No print jobs found matching your criteria.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:border-teal-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <FileIcon />

                  {/* Job Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{job.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {job.date} • {job.pages} {job.pages === 1 ? 'page' : 'pages'} • {job.colorMode}
                    </p>
                  </div>
                </div>

                {/* Status Badge & Details Button */}
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full tracking-wide ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <button 
                    onClick={() => navigate('/print-job-details', { state: { job } })}
                    className="text-teal-600 font-semibold text-xs hover:text-teal-700 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}