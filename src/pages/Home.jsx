import { 
  UploadCloud, 
  CreditCard, 
  MapPin, 
  SlidersHorizontal, 
  Check, 
  ArrowRight
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar/PublicNavbar'
import Footer from '../components/Footer/Footer'

const FAQS = [
  {
    id: 1,
    question: 'What file types can I upload?',
    answer: 'We support PDF, Microsoft Word (.docx), PowerPoint (.pptx), Excel (.xlsx), JPG, and PNG formats. Maximum size allowed is 25MB per document.',
  },
  {
    id: 2,
    question: 'How do I find a terminal nearest to me?',
    answer: "Once logged in, click 'Locate' to view live terminal maps. The tracker displays printer status and queue length.",
  },
  {
    id: 3,
    question: 'What is the minimum wallet top-up?',
    answer: 'The minimum top-up on YourSmartPrint is just ₦200, making it easy to fund on demand.',
  },
  {
    id: 4,
    question: 'What happens if a printer runs out of paper mid-job?',
    answer: 'Our smart terminal automatically cancels execution. Any unprinted pages are immediately refunded back into your digital wallet instantly.',
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen font-sans text-gray-900 flex flex-col bg-white">
      <PublicNavbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="bg-white pt-20 pb-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-teal-50 px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
              Modern Printing For Everyone
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight max-w-3xl mb-6">
            Print Smarter. Pick Up Faster.
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed mb-10">
            Upload from any device, pay securely, and collect your prints at a nearby terminal.
            No queues, no USB drives, no hassle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm"
            >
              Start Printing
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm">
              Find a Terminal
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: STATS ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-10">
            Trusted by Professionals Across the Country
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">100,000+</p>
              <p className="text-xs text-gray-500 font-medium">Documents printed</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">500+</p>
              <p className="text-xs text-gray-500 font-medium">Terminals nationwide</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">50,000+</p>
              <p className="text-xs text-gray-500 font-medium">Users</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">24/7</p>
              <p className="text-xs text-gray-500 font-medium">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: FEATURES ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
                Key Features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Designed for speed and convenience
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <UploadCloud className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Upload from Any Device</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Send PDF, Word, slides, or images from your phone, laptop, or tablet. No USB drives required.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <CreditCard className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Secure Digital Payments</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pay with Paystack, bank transfer, or USSD. Your wallet is secure and easy to top up.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Find Nearby Terminals</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Locate the closest print point on the map and scan a QR code to collect your prints instantly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <SlidersHorizontal className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Flexible Print Settings</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Choose color or B&W, single or double-sided, page ranges, and copies—right from your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Print in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-3xl font-extrabold text-teal-600 mb-4">1</p>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Upload Your Document</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Send your files from any device. We support PDF, Word, images, and more.
              </p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-teal-600 mb-4">2</p>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Pay Securely</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Fund your wallet with Paystack, bank transfer, or USSD. Your payment is encrypted and safe.
              </p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-teal-600 mb-4">3</p>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Pick Up Your Print</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Scan the QR code at a nearby terminal and collect your prints in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: USERS ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
                Professional Reviews
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Loved by professionals, students and small businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12 max-w-4xl mx-auto">
            {['Freelancers', 'Small businesses', 'Marketing teams', 'Remote teams', 'Agencies', 'Entrepreneurs'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                <span className="text-sm font-semibold text-gray-900">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: OLD WAY VS NEW WAY ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
                Why Choose YourSmartPrint
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              The old way vs the new way
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'No more queuing', desc: 'Upload, pay, and scan—your prints are ready when you arrive.' },
              { title: 'No USB drives needed', desc: 'Print from phone, laptop, or tablet—anywhere, anytime.' },
              { title: 'No print shop hassles', desc: 'Digital payments and automated terminals mean less friction.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mb-5">
                  <Check className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: SECURITY ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
                Security & Trust
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Your documents are completely secure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Encrypted Documents', desc: 'Files are protected in transit and at rest. We don’t store sensitive print data after execution.' },
              { title: 'Auto-Delete Privacy System', desc: 'Documents are permanently expunged immediately after printing or 24 hours of inactivity.' },
              { title: 'Paystack-Secured Payments', desc: 'Every fund deposit goes through standard Paystack gateways. We never save card credentials or bank codes.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mb-5">
                  <Check className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FAQ (Static, not dropdown) ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-[10px] font-bold text-teal-600 tracking-widest uppercase">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Got Questions? We Have Answers
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {FAQS.map((faq) => (
              <div
                key={faq.id}
                className="bg-gray-100/70 rounded-xl border border-gray-100 px-6 py-5"
              >
                <h3 className="text-sm font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: CTA + FOOTER ── */}
      <section className="bg-slate-900 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight max-w-2xl mb-6">
            Ready to ditch the old way of printing?
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-lg leading-relaxed mb-10">
            Join thousands of professionals printing smarter. Upload, fund, scan, and pick up—anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
            <button 
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center justify-center bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-sm">
              Find a Terminal
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}