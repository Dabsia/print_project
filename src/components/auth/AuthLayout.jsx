import Logo from './Logo'

export default function AuthLayout({ children, wide = false }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9] px-4 py-10">
      <div
        className={`w-full rounded-2xl border border-slate-200/80 bg-white px-8 py-9 shadow-card sm:px-10 sm:py-10 ${
          wide ? 'max-w-[440px]' : 'max-w-[400px]'
        }`}
      >
        <div className="mb-7">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  )
}
