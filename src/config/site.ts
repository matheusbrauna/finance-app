export const links = {
  linkedin: 'https://www.linkedin.com/in/matheus-brauna',
  github: 'https://github.com/matheusbrauna',
}

export const siteConfig = {
  name: 'Finance App',
  url: 'https://matheusbrauna.dev',
  email: 'contato@matheusbrauna.dev',
  phone: '+5561993260021',
  description: 'Aplicação de controle de finanças',
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
