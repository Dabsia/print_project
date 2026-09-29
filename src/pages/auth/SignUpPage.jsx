import { Link } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import TextInput from '../../components/auth/TextInput'
import PasswordInput from '../../components/auth/PasswordInput'
import Button from '../../components/Button'

export default function SignUpPage() {
  return (
    <AuthLayout wide>
      <div className="text-center">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight text-ink">
          Create Your Account
        </h1>
        <p className="mt-2 text-[14px] leading-snug text-ink-muted">
          Join thousands of students printing smarter
        </p>
      </div>

      <form
        className="mt-7 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <TextInput
          id="signup-name"
          label="Full Name"
          type="text"
          placeholder="Chinedu Okafor"
          autoComplete="name"
        />
        <TextInput
          id="signup-email"
          label="Email Address"
          type="email"
          placeholder="c.okafor@university.edu"
          autoComplete="email"
        />
        <TextInput
          id="signup-phone"
          label="Phone Number"
          type="tel"
          placeholder="+234 812 345 6789"
          autoComplete="tel"
        />
        <PasswordInput
          id="signup-password"
          label="Password"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <label className="flex cursor-pointer items-start gap-2.5 pt-0.5">
          <input
            type="checkbox"
            defaultChecked
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand accent-brand focus:ring-brand"
            style={{ accentColor: 'var(--color-primary)' }}
          />
          <span className="text-[13px] leading-snug text-ink-muted">
            I agree to the{' '}
            <a href="#" className="font-medium text-brand hover:text-brand-hover">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-brand hover:text-brand-hover">
              Privacy Policy
            </a>
          </span>
        </label>

        <div className="pt-1">
          <Button type="submit">Create Account</Button>
        </div>
      </form>

      <p className="mt-6 text-center text-[14px] text-ink-muted">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-brand hover:text-brand-hover"
        >
          Log In
        </Link>
      </p>
    </AuthLayout>
  )
}
