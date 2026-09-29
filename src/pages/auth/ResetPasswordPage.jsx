import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import AuthLayout from '../../components/auth/AuthLayout'
import PasswordInput from '../../components/auth/PasswordInput'
import Button from '../../components/Button'

function RequirementItem({ met, children }) {
  const primaryStyle = met ? { color: 'var(--color-primary)' } : undefined

  return (
    <li
      className={`flex items-center gap-2.5 text-[13px] ${
        met ? 'font-medium' : 'text-slate-400'
      }`}
      style={primaryStyle}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${
          met ? '' : 'bg-slate-300'
        }`}
        style={
          met ? { backgroundColor: 'var(--color-primary)' } : undefined
        }
        aria-hidden
      />
      {children}
    </li>
  )
}

function getPasswordChecks(password) {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
  }
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const checks = useMemo(() => getPasswordChecks(newPassword), [newPassword])
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword
  const allRequirementsMet =
    checks.minLength && checks.uppercase && checks.number

  return (
    <AuthLayout wide>
      <div className="text-center">
        <h1 className="text-[26px] font-bold leading-tight tracking-tight text-ink">
          Reset Your Password
        </h1>
        <p className="mt-2 text-[14px] leading-snug text-ink-muted">
          Enter your new password below.
        </p>
      </div>

      <form
        className="mt-7 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <PasswordInput
          id="reset-new-password"
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
        />
        <div>
          <PasswordInput
            id="reset-confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="mt-1.5 text-[12px] text-red-500">
              Passwords do not match
            </p>
          )}
        </div>

        <div className="pt-1">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Password Requirements
          </p>
          <ul className="mt-2.5 space-y-1.5">
            <RequirementItem met={checks.minLength}>
              At least 8 characters long
            </RequirementItem>
            <RequirementItem met={checks.uppercase}>
              Contains at least one uppercase letter
            </RequirementItem>
            <RequirementItem met={checks.number}>
              Contains at least one number
            </RequirementItem>
          </ul>
        </div>

        <div className="pt-3">
          <Button
            type="submit"
            disabled={!allRequirementsMet || !passwordsMatch}
            aria-disabled={!allRequirementsMet || !passwordsMatch}
          >
            Reset Password
          </Button>
        </div>
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
