import { Header } from '@/components/layouts/header'

type Props = Readonly<{
  children: React.ReactNode
}>

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  )
}
