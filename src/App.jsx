import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import UploadDocumentPage from './pages/UploadDoc'
import ConfigurePrintJobPage from './pages/ConfigurePrintJobPage'
import PrinterTerminalsPage from './pages/PrinterTerminalsPage'
import PrintHistoryPage from './pages/PrintHistoryPage'
import PrintJobDetailsPage from './pages/PrintJobDetailsPage'
import WalletPage from './pages/WalletPage'
import ProfilePage from './pages/ProfilePage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import HelpPage from './pages/HelpPage'
import AboutUsPage from './pages/AboutUs'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload-doc" element={<UploadDocumentPage />} />
        <Route path="/configure-print" element={<ConfigurePrintJobPage />} />
        <Route path="/printer-terminals" element={<PrinterTerminalsPage />} />
        <Route path="/print-history" element={<PrintHistoryPage />} />
        <Route path="/print-job-details" element={<PrintJobDetailsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/about" element={<AboutUsPage />} />

      </Routes>
    </BrowserRouter>
  )
}
