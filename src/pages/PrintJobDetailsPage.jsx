import { ArrowLeft, Copy, Download, Printer } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header/header'

const DEFAULT_JOB = {
  id: 1,
  name: 'Project_Report_Final.pdf',
  fileType: 'PDF Document',
  fileSize: '2.4 MB',
  pages: 24,
  uploadDate: 'Oct 12, 2026 • 10:24 AM',
  status: 'PRINTED',
  colorMode: 'Black & White',
  paperSize: 'A4 Standard',
  copies: 1,
  pageRange: 'All Pages (1-24)',
  doubleSided: 'Off',
  costPerPage: 50,
  totalCost: 1200,
  otp: '8090572',
  terminalLocation: 'SmartPrint Terminal #12 — Block A, Ground Floor',
  collectionTime: 'Collected: Oct 12, 2026 • 2:35 PM'
}

export default function PrintJobDetailsPage() {
  const location = useLocation()
  
  const jobData = { ...DEFAULT_JOB, ...(location.state?.job || {}) }

  // ✅ SAFE: Compute OTP digits once. Handles null, undefined, numbers, empty strings.
  const otpString = String(jobData.otp ?? '0000000').trim() || '0000000'
  const otpDigits = otpString.split('')

  // ✅ SAFE: Compute total cost as a number
  const totalCost = Number(jobData.totalCost ?? 0)
  const costPerPage = Number(jobData.costPerPage ?? 0)

  const [copied, setCopied] = useState(false)

  const handleCopyOTP = () => {
    if (!otpString) return
    navigator.clipboard.writeText(otpString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PRINTED':   return 'bg-green-100 text-green-700'
      case 'PRINTING':  return 'bg-blue-100 text-blue-700'
      case 'PENDING':   return 'bg-yellow-100 text-yellow-700'
      case 'CANCELLED': return 'bg-red-100 text-red-700'
      default:          return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
        <Link 
          to="/print-history" 
          className="inline-flex items-center gap-1 text-teal-600 font-bold text-xs tracking-wider hover:text-teal-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Print Job Details</h1>
          <p className="text-gray-500 text-sm mt-1">
            View configuration, payment summary, and collection status for this print job
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Document Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-6">Document Information</h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">File Name</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">File Type</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.fileType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">File Size</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.fileSize}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Total Pages</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.pages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Upload Date</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.uploadDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Job Status</span>
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full tracking-wide ${getStatusColor(jobData.status)}`}>
                  {jobData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Print Configuration */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-6">Print Configuration</h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Color Mode</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.colorMode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Paper Size</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.paperSize}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Copies</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.copies} Copy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Page Range</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.pageRange}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Double-sided</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.doubleSided}</span>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-6">Cost Summary</h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Cost per Page</span>
                <span className="text-gray-900 font-semibold text-xs">N{costPerPage}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Number of Pages</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.pages}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Copies</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.copies}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold text-sm">Total Cost</span>
                  <span className="text-teal-600 font-bold text-lg">
                    N{totalCost.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* OTP & Collection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-base font-bold text-gray-900 mb-6">OTP & Collection</h2>
            
            <div className="mb-6">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-3 uppercase">PRINT COLLECTION OTP</p>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg p-3">
                <div className="flex gap-1.5">
                  {/* ✅ Safe render using precomputed otpDigits */}
                  {otpDigits.map((digit, index) => (
                    <span 
                      key={index} 
                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded text-sm font-bold text-gray-900"
                    >
                      {digit}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={handleCopyOTP}
                  className="flex items-center gap-1.5 text-teal-600 font-semibold text-[11px] hover:text-teal-700 transition-colors bg-teal-50 px-3 py-1.5 rounded-md"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Terminal Location</span>
                <span className="text-gray-900 font-semibold text-xs text-right">{jobData.terminalLocation}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs">Collection Time</span>
                <span className="text-gray-900 font-semibold text-xs">{jobData.collectionTime}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button className="border border-teal-500 text-teal-600 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 bg-white">
            <Download className="w-4 h-4" />
            Download Material
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" />
            Reprint Document
          </button>
        </div>
      </main>
    </div>
  )
}