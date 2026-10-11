import { useState } from 'react'
import PublicNavbar from '../components/PublicNavbar/PublicNavbar'
import Footer from '../components/Footer/Footer'

const SECTIONS = [
  {
    id: 1,
    slug: 'information-we-collect',
    title: 'Information We Collect',
    content:
      'We collect necessary metrics to establish accounts, locate nearest print points, and secure transactions. This encompasses: full name, email coordinate, cell phone identifier (SMS updates), active location coordinates (solely while locating print terminals), and direct transaction tallies.',
  },
  {
    id: 2,
    slug: 'how-we-use-information',
    title: 'How We Use Your Information',
    content:
      'Collected details are put to work directly for: maintaining secure portal sessions, authorizing wallet allocations, routing map coordinates toward terminal hardware, sending paper jam alerts, and refining automated terminal diagnostic patterns.',
  },
  {
    id: 3,
    slug: 'document-handling',
    title: 'Document Handling (Zero-Retention Standard)',
    content:
      'Your uploaded PDFs, docs, and visual assets are fully encrypted in transit with SSL/TLS protocols and encrypted at rest with AES-256 standards. Our systems enforce a strict \'Zero-Retention Policy\': files are fully and permanently purged from server storage instantly upon successful physical print execution, or after 24 hours of inactivity. We never screen, share, review, or store document content.',
  },
  {
    id: 4,
    slug: 'payment-data',
    title: 'Payment Data (Paystack Direct)',
    content:
      'Fund transactions are securely processed directly by our integrated payment partner, Paystack. YourSmartPrint servers never witness, log, store, or transmit raw credit card details, CVV pins, or bank account credentials.',
  },
  {
    id: 5,
    slug: 'data-sharing',
    title: 'Data Sharing Restrictions',
    content:
      'We hold a strict policy of never selling, trading, or leasing your personal information to third-party ad brokers or tracking networks. Your details are shared exclusively with Paystack to complete payment authorization.',
  },
  {
    id: 6,
    slug: 'security-protocols',
    title: 'Security Protocols',
    content:
      'We implement state-of-the-art server protection and firewalls to secure active user credentials. Access to support tickets and system logs is guarded with strict role-based access controls and monitored audits.',
  },
  {
    id: 7,
    slug: 'your-rights',
    title: 'Your Legal Rights',
    content:
      'You possess full rights to access, amend, modify, restrict, or demand complete deletion of your account record and saved preferences at any time. Simply navigate to your Profile or open a quick support request.',
  },
  {
    id: 8,
    slug: 'cookies',
    title: 'Cookie Policy',
    content:
      'We deploy minimal cookie configurations strictly to authenticate your login sessions and protect secure states. We do not use persistent marketing tracking cookies.',
  },
  {
    id: 9,
    slug: 'policy-updates',
    title: 'Policy Updates',
    content:
      "We may modify this privacy policy as terminal features evolve. The revision timeline will always be visible via the 'Last Updated' indicator. Continued use constitutes full awareness of current protective terms.",
  },
  {
    id: 10,
    slug: 'privacy-contact',
    title: 'Privacy Contact',
    content:
      'For dedicated privacy inquiries or data removal claims, please send a message to our security engineers directly at support@yoursmartprint.com.',
  },
]

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState(3)

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
          <span className="inline-block text-xs font-bold tracking-widest text-teal-600 border border-teal-200 bg-teal-50 rounded px-3 py-1 mb-4">
            DATA PROTECTION
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Last Updated: August 2026</span>
            {' '}• Your document security and personal data integrity are our absolute highest priority.
          </p>
        </div>
      </div>

      {/* Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
            Policy Sections
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
                  <h2 className="text-base font-bold text-gray-900 mb-3">
                    {s.title}
                  </h2>
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
