import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'

// 1. Define the printer terminals data
const PRINTER_TERMINALS = [
  {
    id: 1,
    name: 'SmartPrint Terminal #12',
    location: 'Block A, Ground Floor, University of Lagos',
    status: 'ONLINE',
    isSelected: true, // This one has the teal border in the screenshot
  },
  {
    id: 2,
    name: 'SmartPrint Terminal #08',
    location: 'Faculty of Engineering, Library Wing, UNILAG',
    status: 'ONLINE',
    isSelected: false,
  },
  {
    id: 3,
    name: 'SmartPrint Terminal #05',
    location: 'Student Union Building, Food Court Entrance',
    status: 'OFFLINE',
    isSelected: false,
  },
  {
    id: 4,
    name: 'SmartPrint Terminal #15',
    location: 'New Hall Block C, Ground Floor Study Center',
    status: 'ONLINE',
    isSelected: false,
  },
]

export default function PrinterTerminalsPage() {
  const navigate = useNavigate()

  const handleSelectPrinter = (printer) => {
    if (printer.status === 'OFFLINE') {
      alert('This printer is currently offline. Please select another terminal.')
      return
    }
    // Navigate to the configure page with the selected printer ID
    // navigate('/configure-print', { state: { printerId: printer.id } })
    console.log('Selected printer:', printer.name)
  }

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Printer Terminals</h1>
        </div>

        {/* Printer List */}
        <div className="space-y-4">
          {PRINTER_TERMINALS.map((printer) => (
            <div
              key={printer.id}
              onClick={() => handleSelectPrinter(printer)}
              className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer transition-all hover:shadow-md ${
                printer.isSelected ? 'border-l-4 border-l-teal-500' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div>
                <h2 className="font-bold text-gray-900 text-base mb-1">
                  {printer.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  {printer.location}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  printer.status === 'ONLINE'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {printer.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}