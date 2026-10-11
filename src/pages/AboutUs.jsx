import { ArrowLeft, Zap, Shield, MapPin, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar/PublicNavbar'
import Footer from '../components/Footer/Footer'

export default function AboutUsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen font-sans text-gray-900 flex flex-col bg-white">
      <PublicNavbar />

      {/* ── SECTION 1: HERO ── */}
      <section className="bg-white pt-6 pb-24 px-6 flex-1">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
         
          {/* Hero Content */}
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-50 px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">
                Our Origins
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight max-w-4xl mb-6">
              We're building the future of document services
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed">
              YourSmartPrint is a Nigerian-built hardware & software ecosystem engineered to
              replace the friction, queues, and unreliability of traditional print centers.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MISSION ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">
              Our Mission
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-3xl mb-8">
            Making printing as seamless as ordering a ride
          </h2>

          {/* Body Paragraphs */}
          <div className="flex flex-col gap-5 max-w-4xl text-sm md:text-base text-gray-600 leading-relaxed">
            <p>
              For decades, document printing across African institutions and workspaces has
              remained manual, insecure, and incredibly slow. We believe physical document
              processing shouldn't require a USB drive, a long queue, or cash hand-offs.
            </p>
            <p>
              Our mission is to democratize fast, secure, and affordable printing by deploying
              cloud-connected, self-service terminals right where you need them.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR STORY ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">
              Our Story
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-12">
            How it all started
          </h2>

          {/* Two Column Story Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Problem */}
            <div>
              <h3 className="text-lg font-bold text-teal-600 mb-4">The Problem We Saw</h3>
              <div className="flex flex-col gap-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  In 2024, our founders were running out of time trying to print academic
                  resources and business briefs. They experienced a frustrating loop: corrupted
                  USB storage sticks, virus-laden print shop PCs, overcharged pricing, and long
                  queues on Nigerian university campuses and co-working hubs.
                </p>
                <p>
                  Everyone was suffering from the same broken printer system. It was time for a
                  complete overhaul.
                </p>
              </div>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-lg font-bold text-teal-600 mb-4">The Automated Solution</h3>
              <div className="flex flex-col gap-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  We asked: What if you could upload a PDF directly from your phone, pay with
                  standard local options like Paystack, and print securely at any nearby box by
                  scanning a QR code?
                </p>
                <p>
                  That's when YourSmartPrint was born. We designed and built our first
                  proprietary self-service terminals right here in Lagos, tailored for resilient,
                  high-speed, local deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHAT MAKES US DIFFERENT ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Center Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
              <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">
                The New Way
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              What makes us different
            </h2>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <Zap className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Technology-First</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Custom IoT print nodes connect directly to the cloud. Upload and configure prints
                from any device.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <FileText className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                No hidden fees or rounding up. Pay exact prices per page seamlessly from your
                secure paystack-enabled digital wallet.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <Shield className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Security-First</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Documents are encrypted in-transit and permanently auto-deleted immediately after
                printing or 24 hours of inactivity.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2">Available Everywhere</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Terminals are placed at campuses, hubs, and transport terminals nationwide,
                running round-the-clock for unlimited accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: STATS ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-bold text-gray-500 tracking-widest uppercase mb-12">
            Our Growing Footprint in Nigeria
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">250,000+</p>
              <p className="text-xs text-gray-500 font-medium">Documents printed</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">120+</p>
              <p className="text-xs text-gray-500 font-medium">Live terminals</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">30,000+</p>
              <p className="text-xs text-gray-500 font-medium">Active users</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">99.9%</p>
              <p className="text-xs text-gray-500 font-medium">Terminal uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FUTURE ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">
              Our Future
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-4xl mb-8">
            Powering pan-African document infrastructure
          </h2>

          {/* Body Paragraphs */}
          <div className="flex flex-col gap-5 max-w-4xl text-sm md:text-base text-gray-600 leading-relaxed">
            <p>
              Starting with automatic terminals on campuses, our goal is to build a borderless
              framework for document operations across the entire continent.
            </p>
            <p>
              From smart document verification to localized physical output, we are developing the
              software and secure hardware systems to keep individuals and organizations moving at
              lightning speeds.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}