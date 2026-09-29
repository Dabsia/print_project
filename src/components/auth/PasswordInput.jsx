import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({ id, label, className = '', ...props }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="block text-[13px] font-semibold text-ink-label"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="h-[46px] w-full rounded-lg border border-slate-200 bg-white py-2 pl-3.5 pr-11 text-[15px] text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <Eye className="h-[18px] w-[18px]" strokeWidth={1.75} />
          ) : (
            <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.75} />
          )}
        </button>
      </div>
    </div>
  )
}
