import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.gladiators.finance/contact-us',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/@gladiators.finance/',
      },
      {
        label: t('NRT token'),
        href: 'https://www.nftroyaltoken.com/',
      },
      {
        label: t('DENA token'),
        href: 'https://docs.gladiators.finance/tokenomics/denarius-dena',
      },
      // {
      //   label: '—',
      // },
      {
        label: t('Online Store'),
        href: '/nfts',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.gladiators.finance/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.gladiators.finance/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.gladiators.finance',
      },
      {
        label: t('Community'),
        href: 'https://docs.gladiators.finance/contact-us/telegram',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/gladiatorsfinance',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.gladiators.finance',
      },
      {
        label: t('Audits'),
        href: 'https://docs.gladiators.finance/',
      },
      
    ],
  },
]
