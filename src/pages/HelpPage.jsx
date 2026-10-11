import { useState } from 'react'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar/PublicNavbar'
import Footer from '../components/Footer/Footer'

const FAQS = [
  {
    id: 1,
    question: 'How do I upload a document?',
    answer:
      "Simply log into your dashboard, click on 'Upload New Document', drag-and-drop your files or select them from your local device, configure your preferences (Color, B&W, copies), and confirm.",
  },
  {
    id: 2,
    question: 'What file formats are supported?',
    answer:
      'We support all standard doc types including PDF, Microsoft Word (.docx), PowerPoint (.pptx), Excel (.xlsx), JPG, and PNG formats. The maximum size per file is 25MB.',
  },
  {
    id: 3,
    question: 'How do I fund my wallet?',
    answer:
      "Navigate to the 'Wallet' tab on your dashboard, enter your top-up amount (minimum ₦200), and pay securely through our integrated Paystack gateway using cards, bank transfers, or USSD.",
  },
  {
    id: 4,
    question: 'How do I find a nearby terminal?',
    answer:
      "Go to the 'Locate' map tab. It will request location access and display all smart print terminals closest to you, including real-time status (Online/Offline) and current paper capacity.",
  },
  {
    id: 5,
    question: 'What happens to my documents after printing?',
    answer:
      'For strict user privacy, documents are encrypted during upload and automatically deleted forever instantly after execution, or after 24 hours of inactivity.',
  },
  {
    id: 6,
    question: 'How do I get a refund for a failed print?',
    answer:
      'If a terminal runs out of ink/paper or experiences a hardware issue mid-job, our terminal detects the failure and instantly credits the exact unprinted value back into your print wallet.',
  },
]

const TOPICS = [
  'General Support / Troubleshooting',
  'Wallet & Payments',
  'Document Upload Issues',
  'Terminal / Hardware Issues',
  'Account & Profile',
  'Privacy & Data Requests',
  'Other',
]

export default function HelpPage() {
  const navigate = useNavigate()

  const [openFaqs, setOpenFaqs] = useState(new Set())

  const toggleFaq = (id) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', topic: TOPICS[0], message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <PublicNavbar />

      {/* ── TOP: FAQ Section ── */}
      <section className="flex-1 px-6 pt-10 pb-16 bg-white">
        <div className="max-w-3xl mx-auto">

          {/* Back Button - Wider Style */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-teal-600 hover:bg-teal-50 text-sm font-semibold mb-16 bg-white border border-gray-200 hover:border-teal-400 cursor-pointer px-5 py-2.5 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h1>

          {/* FAQ List */}
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => {
              const isOpen = openFaqs.has(faq.id)
              return (
                <div
                  key={faq.id}
                  className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left bg-transparent border-none cursor-pointer gap-4"
                  >
                    <span className="text-sm font-bold text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 bg-white ${
                      isOpen ? 'max-h-60 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 py-4 text-xs text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MIDDLE: Send a Message Form ── */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl px-12 py-10 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Send a Message</h2>
          <p className="text-sm text-gray-500 mb-8">
            Fill out this form and our support engineers will review your request.
          </p>

          {submitted && (
            <div className="mb-6 bg-teal-50 border border-teal-200 text-teal-700 text-sm rounded-lg px-4 py-3">
              ✓ Inquiry submitted! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Tunde Adewale"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-gray-50/50"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. tunde@yoursmartprint.com"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-gray-50/50"
              />
            </div>

            {/* Topic */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Inquiry Topic</label>
              <div className="relative">
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-gray-50/50 appearance-none cursor-pointer"
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Message / Issues Description
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Explain your scenario in detail. If referencing a failed terminal job, please include the terminal ID number."
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all bg-gray-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 rounded-lg transition-colors text-sm border-none cursor-pointer mt-2"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}