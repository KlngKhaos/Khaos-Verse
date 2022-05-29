import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://t.me/KhaosVerse',
      },
      // {
      //   label: t('Blog'),
      //   href: 'https://medium.com/@gladiators.finance/',
      // },
      {
        label: t('Khaos Token'),
        href: 'https://www.khaosverse.com/',
      },
      // {
      //   label: t('DENA token'),
      //   href: 'https://docs.gladiators.finance/tokenomics/denarius-dena',
      // },
      // {
      //   label: '—',
      // },
      // {
      //   label: t('Online Store'),
      //   href: '/nfts',
      //   isHighlighted: true,
      // },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Community'),
        href: 'https://t.me/KhaosVerse',
      },
    ],
  },
  // {
  //   label: t('Developers'),
  //   items: [
  //     {
  //       label: 'Github',
  //       href: 'https://github.com/khaosfinance',
  //     },
  //     {
  //       label: t('Documentation'),
  //       href: 'https://docs.khaos.finance',
  //     },
  //     // {
  //     //   label: t('Audits'),
  //     //   href: 'https://docs.khaos.finance/',
  //     // },
  //   ],
  // },
]
