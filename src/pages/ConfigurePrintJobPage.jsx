import { ArrowLeft, X, Plus, ArrowRight, Camera, FileText } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import { useState, useEffect, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { get, set, del } from 'idb-keyval'
import { Html5Qrcode } from 'html5-qrcode'

export default function ConfigurePrintJobPage() {
  const navigate = useNavigate()

  const [documents, setDocuments] = useState([])  // ← Array of {file, name, size, pages}
  const [isLoading, setIsLoading] = useState(true)
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [showScannerModal, setShowScannerModal] = useState(false)

  const fileInputRef = useRef(null)
  const fileUrlRef = useRef(null)
  const scannerRef = useRef(null)

  const [colorMode, setColorMode] = useState('bw')
  const [paperSize, setPaperSize] = useState('a4')
  const [copies, setCopies] = useState(1)
  const [pageRange, setPageRange] = useState('All pages')
  const [doubleSided, setDoubleSided] = useState(false)

  // Helper: read a File and extract metadata (pages etc.)
  const extractFileInfo = async (file) => {
    let pages = 0
    if (file.type === 'application/pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        pages = pdfDoc.getPageCount()
      } catch (err) {
        console.error('Error reading PDF:', err)
        pages = 1
      }
    } else {
      pages = 1 // For images
    }

    return {
      name: file.name,
      size: file.size,
      sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      pages,
      type: file.type,
      file, // Keep the original File object
    }
  }

  // Load documents on mount
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        // Support both old format (single file) and new format (array)
        const stored = await get('uploadedFiles')
        const legacyFile = await get('uploadedFile')

        if (stored && Array.isArray(stored) && stored.length > 0) {
          setDocuments(stored)
        } else if (legacyFile) {
          // Migrate old single file format to new array format
          const info = await extractFileInfo(legacyFile)
          const migrated = [{ ...info, id: Date.now() }]
          setDocuments(migrated)
          await set('uploadedFiles', migrated)
          await del('uploadedFile')
        } else {
          alert('No document found. Please upload a file first.')
          navigate('/upload-doc')
          return
        }
      } catch (error) {
        console.error('Error loading documents:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadDocuments()
  }, [navigate])

  // Handle Add More Documents
  const handleAddMoreClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newDocs = []
    for (const file of files) {
      // Validate type
      const isValidType = file.type === 'application/pdf' || file.type.startsWith('image/')
      if (!isValidType) {
        alert(`"${file.name}" is not a supported file type. Only PDF and images allowed.`)
        continue
      }
      // Validate size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`"${file.name}" exceeds 10MB limit.`)
        continue
      }

      const info = await extractFileInfo(file)
      newDocs.push({ ...info, id: `${Date.now()}-${file.name}` })
    }

    if (newDocs.length === 0) return

    // Merge with existing documents and save to IndexedDB
    const updatedDocs = [...documents, ...newDocs]
    setDocuments(updatedDocs)
    await set('uploadedFiles', updatedDocs)

    // Reset the input so the same file can be picked again
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Remove a document
  const handleRemoveDocument = async (id) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id)
    setDocuments(updatedDocs)

    if (updatedDocs.length === 0) {
      await del('uploadedFiles')
      navigate('/upload-doc')
    } else {
      await set('uploadedFiles', updatedDocs)
    }
  }

  // View a specific file
  const handleViewFile = (doc) => {
    const url = URL.createObjectURL(doc.file)
    window.open(url, '_blank')
    // Revoke after a short delay so the new tab has time to load
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  // Scanner lifecycle
  useEffect(() => {
    if (showScannerModal) {
      const html5QrCode = new Html5Qrcode("qr-reader")
      scannerRef.current = html5QrCode

      const config = { fps: 10, qrbox: { width: 250, height: 250 } }
      
      html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          console.log(`QR Code detected: ${decodedText}`)
          alert(`QR Code Scanned! Value: ${decodedText}`)
          html5QrCode.stop().then(() => {
            setShowScannerModal(false)
          }).catch(console.error)
          // TODO: send print job to backend with decodedText and documents
        },
        (errorMessage) => {
          console.log(`QR scan error: ${errorMessage}`)
        }
      ).catch((err) => {
        console.error("Error starting scanner", err)
        alert("Unable to access camera. Please ensure camera permissions are granted.")
        setShowScannerModal(false)
      })

      return () => {
        if (html5QrCode.isScanning) {
          html5QrCode.stop().catch(console.error)
        }
      }
    }
  }, [showScannerModal])

  // Pricing
  const colorModePrice = colorMode === 'bw' ? 50 : 100
  const totalPagesPerDoc = documents.reduce((sum, doc) => sum + (doc.pages || 0), 0)
  const totalPages = totalPagesPerDoc * copies
  const totalCost = totalPages * colorModePrice

  const handleProceed = () => setShowPrintModal(true)

  const handleOpenScanner = () => {
    setShowPrintModal(false)
    setShowScannerModal(true)
  }

  const handleConfirmPrint = async () => {
    console.log('Proceeding to print...')
    await del('uploadedFiles')
    setShowPrintModal(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading documents...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col relative">
      <Header />
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <Link to="/upload-doc" className="inline-flex items-center gap-1 text-teal-600 font-bold text-xs tracking-wider hover:text-teal-700 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configure Print Job</h1>
          <p className="text-gray-500 text-sm">Choose how you want your document printed and view immediate cost estimations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">

            {/* Hidden Input for Add More Documents */}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,image/*"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Documents List */}
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      {doc.type.startsWith('image/') ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      ) : (
                        <FileText className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{doc.name}</p>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {doc.sizeFormatted} • {doc.pages} {doc.pages === 1 ? 'Page' : 'Pages'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleViewFile(doc)}
                      className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors"
                    >
                      View File
                    </button>
                    <button
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Documents */}
            <button
              onClick={handleAddMoreClick}
              className="w-full border-2 border-dashed border-teal-300 rounded-xl p-4 flex items-center justify-center gap-2 text-teal-600 font-semibold hover:bg-teal-50 transition-colors bg-white"
            >
              <Plus className="w-5 h-5" /> Add More Documents
            </button>

            {/* Print Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Print Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Mode</label>
                  <select value={colorMode} onChange={(e) => setColorMode(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="bw">Black & White (N50/page)</option>
                    <option value="color">Color (N100/page)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paper Size</label>
                  <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                    <option value="a4">A4 Standard</option>
                    <option value="a3">A3</option>
                    <option value="letter">Letter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Pages</label>
                  <input type="number" value={totalPagesPerDoc} readOnly className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Copies</label>
                  <input type="number" value={copies} onChange={(e) => setCopies(parseInt(e.target.value) || 1)} min="1" className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Range</label>
                  <input type="text" value={pageRange} onChange={(e) => setPageRange(e.target.value)} placeholder="e.g., 1-5, 8, 11-13" className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Double-Sided Printing</label>
                  <div className="flex items-center h-[50px] px-4 border border-gray-200 rounded-lg bg-gray-50">
                    <button onClick={() => setDoubleSided(!doubleSided)} className={`relative w-12 h-6 rounded-full transition-colors ${doubleSided ? 'bg-teal-600' : 'bg-gray-300'}`}>
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${doubleSided ? 'left-7' : 'left-1'}`} />
                    </button>
                    <span className="ml-3 text-sm text-gray-600">{doubleSided ? 'On' : 'Off'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Price Details</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Color mode fee</span><span className="text-gray-900 font-medium">N{colorModePrice}.00 / pg</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Documents</span><span className="text-gray-900 font-medium">{documents.length} files</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Total pages</span><span className="text-gray-900 font-medium">{totalPagesPerDoc} pages</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Number of copies</span><span className="text-gray-900 font-medium">x {copies}</span></div>
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex justify-between items-center"><span className="text-gray-900 font-semibold">Total Cost</span><span className="text-teal-600 font-bold text-2xl">N{totalCost.toLocaleString()}.00</span></div>
                </div>
              </div>
              <button onClick={handleProceed} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                Proceed to Print <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Print Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
            <button onClick={() => setShowPrintModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            <div className="mb-6">
              <p className="text-xs font-bold text-teal-600 tracking-wider mb-1">DOCUMENT DETAILS</p>
              <h2 className="text-2xl font-bold text-gray-900">{documents.length} Document{documents.length !== 1 ? 's' : ''}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">Use this ID at any nearby printer or scan the QR code below to print your documents.</p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-gray-500 tracking-wider">YOUR USER ID</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">ACTIVE</span>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg py-3 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 tracking-widest">8090572</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs font-medium text-gray-400">or</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <div className="space-y-3">
              <button onClick={handleOpenScanner} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" /> Scan QR Code
              </button>
              <button onClick={() => navigate('/printer-terminals')} className="w-full bg-white border border-teal-600 text-teal-600 font-semibold py-3.5 rounded-lg hover:bg-teal-50 transition-colors">Locate nearest printer</button>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Modal */}
      {showScannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setShowScannerModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Scan QR Code</h2>
              <p className="text-sm text-gray-500">Point your camera at the QR code on the printer.</p>
            </div>
            <div id="qr-reader" className="w-full rounded-xl overflow-hidden border-2 border-dashed border-gray-200"></div>
            <p className="text-center text-xs text-gray-400 mt-4">
              Make sure the QR code is well-lit and within the frame.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}