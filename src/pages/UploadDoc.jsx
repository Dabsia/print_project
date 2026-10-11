import { ArrowLeft, UploadCloud } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { set } from 'idb-keyval'
import { PDFDocument } from 'pdf-lib'
import Header from '../components/Header/Header'

export default function UploadDocumentPage() {
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = async (file) => {
    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.')
      return
    }

    setSelectedFile(file)
    setIsSaving(true)

    try {
      // Extract page count from the PDF
      let pages = 1
      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        pages = pdfDoc.getPageCount()
      } catch (err) {
        console.error('Error reading PDF pages:', err)
        pages = 1
      }

      // Build the document object matching the new array format
      const documentInfo = {
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        size: file.size,
        sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        pages,
        type: file.type,
        file, // Store the original File object
      }

      // Save as an array (even if it's just one file)
      await set('uploadedFiles', [documentInfo])

      // Navigate to configure page
      navigate('/configure-print')
    } catch (error) {
      console.error('Error saving file:', error)
      alert('There was an error saving your file. Please try again.')
      setIsSaving(false)
    }
  }

  const handleBrowseClick = () => {
    if (!isSaving) {
      fileInputRef.current?.click()
    }
  }

  const handleFileInputChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="flex items-center gap-1 text-teal-600 font-bold text-xs tracking-wider hover:text-teal-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK
        </Link>

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-lg mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Upload Document</h1>
          <p className="text-gray-500 text-sm">
            Upload your files safely to our encrypted servers. Configurations and payments will follow.
          </p>
        </div>

        {/* Upload Drop Zone */}
        <div className="w-full max-w-2xl">
          <div
            className={`border-2 border-dashed rounded-2xl bg-white p-12 flex flex-col items-center justify-center text-center cursor-pointer group transition-colors ${
              isDragging ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'
            } ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isSaving}
            />

            {/* Icon Circle */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
                isDragging ? 'bg-teal-100' : 'bg-teal-50 group-hover:bg-teal-100'
              }`}
            >
              <UploadCloud className="w-8 h-8 text-teal-600" />
            </div>

            {/* Text */}
            {isSaving ? (
              <div>
                <p className="text-lg font-bold text-gray-900 mb-2">Saving file...</p>
                <p className="text-sm text-gray-500">
                  Please wait while we prepare your document.
                </p>
              </div>
            ) : selectedFile ? (
              <div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                </p>
              </div>
            ) : (
              <>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Drag & drop your file here
                </p>
                <p className="text-sm text-gray-500">
                  or{' '}
                  <span className="text-teal-600 font-semibold hover:underline">
                    browse files
                  </span>{' '}
                  from your device
                </p>
              </>
            )}
          </div>

          {/* Supported Formats Note */}
          <p className="text-center text-xs text-gray-400 mt-6 font-medium">
            Supported Formats: PDF • Max 10MB each
          </p>
        </div>
      </main>
    </div>
  )
}