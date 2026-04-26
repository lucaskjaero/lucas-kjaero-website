import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'Lucas Kjaero-Zhang',
  description:
    'The official website of Lucas Kjaero-Zhang, full stack engineer focused on data, automation, and reliable systems.',
  href: 'https://www.lucaskjaerozhang.com',
  author: 'Lucas Kjaero-Zhang',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 5,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'work',
  },
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/resume-landing',
    label: 'resume',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/lucaskjaero',
    label: 'GitHub',
  },
  {
    href: 'mailto:lucas@lucaskjaerozhang.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
