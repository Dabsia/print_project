import { ArrowLeft, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../components/Header/Header'

// Updated data to match the screenshot
const TRANSACTIONS = [
  {
    id: 1,
    type: 'CREDIT',
    description: 'Wallet Funded via Paystack',
    amount: 1000,
    status: 'SUCCESS',
    date: 'Today • 10:24 AM'
  },
  {
    id: 2,
    type: 'DEBIT',
    description: 'Print Job: Report_Final.pdf',
    amount: -600,
    status: 'SUCCESS',
    date: 'Yesterday • 4:12 PM'
  },
  {
    id: 3,
    type: 'REFUND',
    description: 'Refund: Out of paper cancellation',
    amount: 150,
    status: 'REFUNDED',
    date: 'Oct 10, 2026 • 2:15 PM'
  }
]

const FILTERS = ['All', 'Credit', 'Debit', 'Refund']

export default function WalletPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [topUpAmount, setTopUpAmount] = useState('2000')

  const filteredTransactions = TRANSACTIONS.filter(transaction => {
    if (activeFilter === 'All') return true
    return transaction.type === activeFilter.toUpperCase()
  })

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'CREDIT':
        return <ArrowUpRight className="w-5 h-5 text-teal-600" />
      case 'DEBIT':
        return <ArrowDownLeft className="w-5 h-5 text-red-500" />
      case 'REFUND':
        return <RefreshCw className="w-5 h-5 text-teal-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-teal-50 text-teal-600'
      case 'REFUNDED':
        return 'bg-teal-50 text-teal-600'
      case 'FAILED':
        return 'bg-red-50 text-red-600'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const handleTopUp = () => {
    console.log('Top up amount:', topUpAmount)
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

        {/* Main Grid Layout - 1/3 for wallet, 2/3 for transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Wallet Info & Top Up */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Available Printing Credit Card - Dark Navy Background */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">
                AVAILABLE PRINTING CREDIT
              </p>
              <p className="text-4xl font-bold mb-8 tracking-tight">₦1,250.00</p>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">Account Owner</span>
                <span className="text-sm font-semibold text-white">Dabo Johnson</span>
              </div>
            </div>

            {/* Fast Top Up Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Fast Top Up via Paystack</h2>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 flex items-center">
                  <span className="text-gray-500 font-medium mr-1 text-sm">N</span>
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="w-full bg-transparent text-gray-900 font-semibold text-sm focus:outline-none"
                    placeholder="0"
                  />
                </div>
                <button 
                  onClick={handleTopUp}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
                >
                  Top Up
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
              
              {/* Header with Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-base font-bold text-gray-900">Transaction History</h2>
                
                {/* Filter Buttons */}
                <div className="flex gap-1.5 overflow-x-auto">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-colors border ${
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

              {/* Transactions List */}
              <div className="space-y-3">
                {filteredTransactions.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                    <p className="text-gray-500 text-sm">No transactions found.</p>
                  </div>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon Wrapper */}
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-100 shadow-sm">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{transaction.description}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{transaction.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`font-bold text-sm ${
                          transaction.amount > 0 ? 'text-teal-600' : 'text-red-500'
                        }`}>
                          {transaction.amount > 0 ? '+' : '-'}₦{Math.abs(transaction.amount).toLocaleString()}.00
                        </span>
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full tracking-wide ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}