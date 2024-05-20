import Image from 'next/image'
import Link from 'next/link'

export function HeaderLogo() {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image src="/logo.svg" width={28} height={28} alt="Logo" />
        <p className="ml-2.5 text-2xl font-semibold text-white">Finance</p>
      </div>
    </Link>
  )
}
