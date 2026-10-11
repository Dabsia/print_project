import { useState } from 'react'
import PublicNavbar from '../components/PublicNavbar/PublicNavbar'
import Footer from '../components/Footer/Footer'

const SECTIONS = [
  {
    id: 1,
    title: 'Acceptance of Terms',
    content:
      "By accessing or using YourSmartPrint's website, applications, or public self-service printing terminals, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not attempt to access or use our services. These terms constitute a legally binding agreement between you and YourSmartPrint.",
  },
  {
    id: 2,
    title: 'Description of Service',
    content:
      'YourSmartPrint provides a modern cloud-based printing ecosystem. Our platform allows users to upload digital documents from any compatible device, customize print preferences (e.g., color/grayscale, double-sided, copy counts), securely fund a digital wallet, locate nearby physical hardware terminals via live interactive mapping, and execute the printing job by scanning a dynamic terminal-specific QR code.',
  },
  {
    id: 3,
    title: 'User Accounts',
    content:
      'To utilize wallet funding and save print queues, you must register for an account. You agree to provide accurate, current, and complete details during signup and keep your credentials secure. You are entirely responsible for all actions occurring under your authorized account credential.',
  },
  {
    id: 4,
    title: 'Payments & Wallet',
    content:
      'YourSmartPrint functions on a prepaid digital wallet system. To trigger any print hardware, your account must hold sufficient cleared balance. All processing is securely executed via our integration with Paystack. The minimum deposit increment is ₦200. Unused wallet balances are non-refundable except upon specialized, approved support ticket requests.',
  },
  {
    id: 5,
    title: 'Document Upload & Privacy',
    content:
      'We strictly accept PDF, Microsoft Word (.docx), PowerPoint (.pptx), Excel (.xlsx), and standard image configurations (JPG, PNG) up to a hard cap of 25MB per individual file. For absolute data privacy, files are securely encrypted in transit and permanently deleted from our active servers immediately upon successful paper printout execution, or automatically after 24 hours of inactivity.',
  },
  {
    id: 6,
    title: 'Acceptable Use',
    content:
      'You represent and warrant that you possess all legal copyrights or execution permissions for any files routed through our network. You may not print illegal, highly offensive, malicious, fraudulent, or strictly unauthorized confidential materials. We reserve the absolute right to lock accounts violating safe usage paradigms.',
  },
  {
    id: 7,
    title: 'Terminal Usage',
    content:
      'Our physical smart kiosks are shared self-service terminals. You agree to treat physical equipment with reasonable care, follow displayed on-screen loading guidelines, and report any systemic hardware malfunctions, paper empty warnings, or jammed rollers instantly through our Support portals.',
  },
  {
    id: 8,
    title: 'Limitation of Liability',
    content:
      "YourSmartPrint is provided on an 'as-is' basis. We exclude all warranties, express or implied, regarding physical terminal availability, temporary power grid dropouts, network timeouts, or immediate local print qualities. Our cumulative liability shall never exceed the raw value of the specific failed printing session.",
  },
  {
    id: 9,
    title: 'Changes to Terms',
    content:
      "We reserve the exclusive right to alter or replace these Terms of Service periodically. We will signal update events by shifting the 'Last Updated' date at the document header. Continued access of any system layer after alterations signifies total consent.",
  },
  {
    id: 10,
    title: 'Contact',
    content:
      'If you have questions, disputes, or seek specific clarity regarding any portion of this contractual agreement, please communicate with our administrative counsel directly at support@yoursmartprint.com.',
  },
]

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState(1)

  const scrollTo = (id) => {
    setActiveSection(id)
    const el = document.getElementById(`section-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <PublicNavbar />

      {/* Hero header */}
      <div className="border-b border-gray-200 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-xs font-bold tracking-widest text-teal-600 border border-teal-200 bg-teal-50 rounded px-3 py-1 mb-4 uppercase">
            Legal Documents
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Last Updated: August 2026</span>
            {' '}• Please read these terms carefully before using our platform.
          </p>
        </div>
      </div>

      {/* Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
            Document Index
          </p>
          <nav className="flex flex-col gap-1">
            {SECTIONS.map((s) => {
              const isActive = activeSection === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`text-left text-sm px-0 py-1 border-none bg-transparent cursor-pointer transition-colors ${
                    isActive
                      ? 'text-teal-600 font-semibold'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {s.id}. {s.title}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Sections */}
        <div className="flex flex-col divide-y divide-gray-200">
          {SECTIONS.map((s) => (
            <section
              key={s.id}
              id={`section-${s.id}`}
              className="py-8 scroll-mt-6"
            >
              <div className="flex items-start gap-5">
                <span className="text-gray-400 text-sm font-semibold w-5 flex-shrink-0 pt-0.5">
                  {s.id}
                </span>
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-3">{s.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
