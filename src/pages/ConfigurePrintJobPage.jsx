import { ArrowLeft, X, Plus, ArrowRight, Camera } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header/header'
import { useState, useEffect, useRef } from 'react'
import { PDFDocument } from 'pdf-lib'
import { get, del } from 'idb-keyval'
import { Html5QrcodeScanner } from 'html5-qrcode' // Import the scanner

export default function ConfigurePrintJobPage() {
  const navigate = useNavigate()
  
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [numPages, setNumPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [showScannerModal, setShowScannerModal] = useState(false) // New state for scanner
  
  const fileUrlRef = useRef(null)
  const scannerRef = useRef(null) // Ref for the scanner instance

  const [colorMode, setColorMode] = useState('bw')
  const [paperSize, setPaperSize] = useState('a4')
  const [copies, setCopies] = useState(1)
  const [pageRange, setPageRange] = useState('All pages')
  const [doubleSided, setDoubleSided] = useState(false)

  // Load file from storage
  useEffect(() => {
    const loadFileFromStorage = async () => {
      try {
        const file = await get('uploadedFile')
        if (!file) {
          alert('No document found. Please upload a file first.')
          navigate('/upload-doc')
          return
        }
        setFileName(file.name)
        setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`)
        const blobUrl = URL.createObjectURL(file)
        fileUrlRef.current = blobUrl
        if (file.type === 'application/pdf') {
          const arrayBuffer = await file.arrayBuffer()
          const pdfDoc = await PDFDocument.load(arrayBuffer)
          setNumPages(pdfDoc.getPageCount())
        }
      } catch (error) {
        console.error('Error loading file:', error)
        setNumPages(1)
      } finally {
        setIsLoading(false)
      }
    }
    loadFileFromStorage()
    return () => {
      if (fileUrlRef.current) URL.revokeObjectURL(fileUrlRef.current)
    }
  }, [navigate])

  // Handle the scanner lifecycle
  useEffect(() => {
    if (showScannerModal) {
      // Initialize the scanner when the modal opens
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader", 
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        /* verbose= */ false
      )

      scannerRef.current.render(
        (decodedText, decodedResult) => {
          // Success callback
          console.log(`QR Code detected: ${decodedText}`)
          alert(`QR Code Scanned! Value: ${decodedText}`)
          
          // Clear the scanner and close the modal
          if (scannerRef.current) {
            scannerRef.current.clear().catch(err => console.error(err))
          }
          setShowScannerModal(false)
          
          // Here, you would typically verify the decodedText with your backend
        },
        (error) => {
          // Error callback (optional, often noisy)
          // console.warn(`QR Scan Error: ${error}`)
        }
      )

      // Cleanup function
      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err))
        }
      }
    }
  }, [showScannerModal])

  const colorModePrice = colorMode === 'bw' ? 50 : 100
  const totalPages = numPages * copies
  const totalCost = totalPages * colorModePrice

  const handleViewFile = () => {
    if (fileUrlRef.current) window.open(fileUrlRef.current, '_blank')
  }

  const handleProceed = () => setShowPrintModal(true)

  // Triggered by the modal's "Scan QR Code" button
  const handleOpenScanner = () => {
    setShowPrintModal(false) // Close the ID modal
    setShowScannerModal(true) // Open the scanner modal
  }

  const handleConfirmPrint = async () => {
    console.log('Proceeding to print...')
    await del('uploadedFile')
    setShowPrintModal(false)
  }

  const handleRemoveFile = async () => {
    await del('uploadedFile')
    navigate('/upload-doc')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading document...</p>
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
          <div className="lg:col-span-2 space-y-6">
            {/* File Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{fileName}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{fileSize} • {numPages} Pages</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={handleViewFile} className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">View File</button>
                  <button onClick={handleRemoveFile} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full border-2 border-dashed border-teal-300 rounded-xl p-4 flex items-center justify-center gap-2 text-teal-600 font-semibold hover:bg-teal-50 transition-colors bg-white">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Pages</label>
                  <input type="number" value={numPages} readOnly className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none" />
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
                <div className="flex justify-between text-sm"><span className="text-gray-600">Document pages</span><span className="text-gray-900 font-medium">{numPages} pages</span></div>
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

      {/* --- PRINT MODAL (ID Card) --- */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowPrintModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-5 h-5" /></button>
            <div className="mb-6">
              <p className="text-xs font-bold text-teal-600 tracking-wider mb-1">DOCUMENT DETAILS</p>
              <h2 className="text-2xl font-bold text-gray-900">{fileName}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">Use this ID at any nearby printer or scan the QR code below to print your document.</p>
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

      {/* --- SCANNER MODAL --- */}
      {showScannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowScannerModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Scan QR Code</h2>
              <p className="text-sm text-gray-500">Point your camera at the QR code on the printer.</p>
            </div>

            {/* The html5-qrcode library injects the camera feed into this div */}
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