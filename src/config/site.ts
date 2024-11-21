export const links = {
  linkedin: 'https://www.linkedin.com/in/matheus-brauna',
  github: 'https://github.com/matheusbrauna',
}

export const siteConfig = {
  name: 'Finance App',
  url: 'https://matheusbrauna.dev',
  email: 'contato@matheusbrauna.dev',
  phone: '+5561993260021',
  description:
    'Domine suas finanças com nossa aplicação inovadora, simplificando o controle de gastos, transações e muito mais.',
  links,
  mainNav: [
    {
      href: '/',
      label: 'Geral',
    },
    {
      href: '/transactions',
      label: 'Transações',
    },
    {
      href: '/accounts',
      label: 'Contas',
    },
    {
      href: '/categories',
      label: 'Categorias',
    },
  ],
}

export type SiteConfig = typeof siteConfig
