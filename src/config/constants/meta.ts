import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Gladiators',
  description:
    'Gladiators brings 3D NFTs to Binance Smart Chain. Trade, earn, win crypto and have with our massive 3D ecosystem on the most popular decentralized platform.',
  image: 'https://gladiators.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Gladiators')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Gladiators')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Gladiators')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Gladiators')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Gladiators')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Gladiators')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Gladiators')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Gladiators')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Gladiators')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Gladiators')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Gladiators')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Gladiators')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Gladiators')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('Gladiators')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Gladiators')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Gladiators')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('Gladiators')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('Gladiators')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Gladiators')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Gladiators')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Gladiators')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Gladiators Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Gladiators Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Pools')} | ${t('Gladiators Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    default:
      return null
  }
}
