export default function TextInput({
  id,
  label,
  type = 'text',
  className = '',
  inputClassName = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="block text-[13px] font-semibold text-ink-label"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`h-[46px] w-full rounded-lg border border-slate-200 bg-white px-3.5 text-[15px] text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand ${inputClassName}`}
        {...props}
      />
    </div>
  )
}
