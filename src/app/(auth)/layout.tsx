import { Icons } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import { BadgeCheckIcon } from 'lucide-react'

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <section className="grid w-full grid-cols-1 md:min-h-screen md:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-12 text-base md:border-r">
          <div className="mx-auto grid w-full max-w-prose gap-8 relative">
            <div className="flex items-center">
              <Icons.logo className="mr-2 h-6 w-6" />
              <span className="font-bold sm:inline-block">Finance App</span>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-medium tracking-tight">
                Alcance o controle total das suas finanças.
              </h1>
              <p className="text-muted-foreground">
                Uma ferramenta poderosa para gerenciar seu dinheiro com
                eficiência, combinando simplicidade e praticidade em um só
                lugar.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <BadgeCheckIcon className="size-6" />
                <p className="text-sm">
                  Visualize resumos detalhados com cards e gráficos
                  personalizáveis
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeCheckIcon className="size-6" />
                <p className="text-sm">
                  Organize suas transações criando contas e categorias
                  personalizadas
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeCheckIcon className="size-6" />
                <p className="text-sm">
                  Filtre suas finanças por período ou conta com facilidade
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeCheckIcon className="size-6" />
                <p className="text-sm">
                  Importe suas transações diretamente de arquivos CSV
                </p>
              </div>
            </div>
            <Separator />
            <blockquote className="italic text-muted-foreground">
              “A Finance App transformou a maneira como acompanho meu dinheiro.
              Com gráficos claros e ferramentas simples, minhas finanças nunca
              estiveram tão organizadas!”
            </blockquote>
          </div>
        </div>
        <div className="order-first flex items-center justify-center px-4 py-12 md:order-last bg-card">
          {children}
        </div>
      </section>
    </div>
  )
}
