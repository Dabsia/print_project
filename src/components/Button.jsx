export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  if (variant === 'ghost') {
    return (
      <button
        type={type}
        className={`btn-ghost ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button type={type} className={`btn-primary ${className}`} {...props}>
      {children}
    </button>
  )
}
