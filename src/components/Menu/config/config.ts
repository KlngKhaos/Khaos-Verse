import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: 'Earn',
    items: [
      {
        label: t('Farms'),
        icon: 'FarmIcon',
        href: '/farms',
      },
      // {
      //   label: t('Room Pools'),
      //   icon: 'PoolIcon',
      //   href: '/room/pools',
      // },
      // {
      //   label: t('Gladiator Battles'),
      //   href: '/battles/join',
      // },
      // {
      //   label: t('Bet on Battles'),
      //   href: '/battles/bet',
      // },
    ],
  },
  // {
  //   label: t('NFT'),
  //   href: '/gallery',
  //   icon: 'NFT',
  //   showOnMobile: false,
  //   showItemsOnMobile: false,
  //   items: [
  //     {
  //       label: t('My Gladiators'),
  //       href: '/mygladiators',
  //     },
  //     {
  //       label: t('School'),
  //       href: '/school',
  //     },
  //     {
  //       label: t('Gallery'),
  //       href: '/gallery',
  //     },
  //     {
  //       label: t('Marketplace'),
  //       href: '/nfts',
  //     },
  //   ],
  // },
  // {
  //   label: t('Win'),
  //   href: '/prediction',
  //   icon: 'Trophy',
  //   items: [
  //     {
  //       label: t('Prediction (BETA)'),
  //       href: '/prediction',
  //     },
  //     {
  //       label: t('Lottery'),
  //       href: '/lottery',
  //     },
  //   ],
  // },
  // {
  //   label: t('NFT'),
  //   href: '/collectibles',
  //   icon: 'Nft',
  //   showOnMobile: false,
  //   showItemsOnMobile: false,
  //   items: [
  //     {
  //       label: t('Collectibles'),
  //       href: '/collectibles',
  //     },
  //   ],
  // },
  // {
  //   label: '',
  //   href: '/referrals',
  //   icon: 'More',
  //   hideSubNav: true,
  //   items: [
  //     // {
  //     //   label: t('Info'),
  //     //   href: '/info',
  //     // },
  //     {
  //       label: t('Docs'),
  //       href: 'https://docs.gladiators.finance',
  //       type: DropdownMenuItemType.EXTERNAL_LINK,
  //     },
  //     // {
  //     //   label: t('Referrals'),
  //     //   href: '/referrals',
  //     // },
  //     // {
  //     //   label: t('Voting'),
  //     //   href: '/voting',
  //     // },
  //     // {
  //     //   type: DropdownMenuItemType.DIVIDER,
  //     // },
  //     // {
  //     //   label: t('Leaderboard'),
  //     //   href: '/teams',
  //     // },
  //     // {
  //     //   type: DropdownMenuItemType.DIVIDER,
  //     // },
  //     // {
  //     //   label: t('Blog'),
  //     //   href: '	https://medium.com/@gladiators.finance',
  //     //   type: DropdownMenuItemType.EXTERNAL_LINK,
  //     // },
  //     // {
  //     //   label: t('Docs'),
  //     //   href: 'https://docs.gladiators.finance',
  //     //   type: DropdownMenuItemType.EXTERNAL_LINK,
  //     // },
  //   ],
  // },
]

export default config
