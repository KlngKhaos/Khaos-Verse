import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Khaos',
  description:
    'Khaos brings 3D NFTs to Binance Smart Chain. Trade, earn, win crypto and have with our massive 3D ecosystem on the most popular decentralized platform.',
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
        title: `${t('Home')} | ${t('Khaos')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Khaos')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Khaos')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Khaos')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Khaos')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Khaos')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Khaos')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Khaos')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Khaos')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Khaos')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Khaos')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Khaos')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Khaos')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('Khaos')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Khaos')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Khaos')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('Khaos')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('Khaos')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Khaos')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Khaos')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Khaos')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Khaos Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Khaos Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Pools')} | ${t('Khaos Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    default:
      return null
  }
}
