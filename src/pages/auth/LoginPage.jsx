import { Link } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import TextInput from '../../components/auth/TextInput'
import PasswordInput from '../../components/auth/PasswordInput'
import Button from '../../components/Button'

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight text-ink">
          Welcome Back
        </h1>
        <p className="mt-2 text-[14px] leading-snug text-ink-muted">
          Log in to access your cloud print terminal
        </p>
      </div>

      <form
        className="mt-7 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <TextInput
          id="login-email"
          label="Email Address"
          type="email"
          placeholder="name@university.edu"
          autoComplete="email"
        />

        <div>
          <PasswordInput
            id="login-password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-[13px] font-medium text-brand hover:text-brand-hover"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="pt-1">
          <Button type="submit">Log In</Button>
        </div>
      </form>

      <p className="mt-6 text-center text-[14px] text-ink-muted">
        Don&apos;t have an account?{' '}
        <Link
          to="/signup"
          className="font-semibold text-brand hover:text-brand-hover"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  )
}
