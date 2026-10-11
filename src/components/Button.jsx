export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick = () => console.log('Clicked'),
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
    <button onClick = {onClick} type={type} className={`btn-primary ${className}`} {...props}>
      {children}
    </button>
  )
}
