import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import TextInput from '../../components/auth/TextInput'
import Button from '../../components/Button'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight text-ink">
          Forgot Password?
        </h1>
        <p className="mx-auto mt-2 max-w-[280px] text-[14px] leading-relaxed text-ink-muted">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <form
        className="mt-7 space-y-5"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <TextInput
          id="forgot-email"
          label="Email Address"
          type="email"
          placeholder="name@university.edu"
          autoComplete="email"
        />

        <Button type="submit">Send Reset Link</Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-brand hover:text-brand-hover"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back
        </Link>
      </div>
    </AuthLayout>
  )
}
