import { Printer } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center justify-center gap-2.5 no-underline">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
        <Printer className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />
      </span>
      <span className="text-[17px] font-bold tracking-tight text-ink">
        YourSmartPrint
      </span>
    </Link>
  )
}
