import { Nft } from './types'
import { PINATA_CLOUD } from '../../index'

const Nfts: Nft[] = [
  {
    name: 'Gladiator One',
    description: 'Amazing Gladiator',
    images: {
      lg: 'gladiator0-lg.png',
      md: 'gladiator0-md.png',
      sm: 'gladiator0-sm.png',
      ipfs: `${PINATA_CLOUD}/QmSnHzZc6JczFBr8BQEQZQj6GdJJxEZ8sx6Ew7CGbHiD6k/0-gladiator-lg.png`,
      blur: 'gladiator0-blur.png',
    },
    identifier: 'gladiator0',
    id: 0,
  },
  {
    name: 'Gladiator Two',
    description: 'Amazing Gladiator Two',
    images: {
      lg: 'gladiator1-lg.png',
      md: 'gladiator1-md.png',
      sm: 'gladiator1-sm.png',
      ipfs: `${PINATA_CLOUD}/QmSnHzZc6JczFBr8BQEQZQj6GdJJxEZ8sx6Ew7CGbHiD6k/1-gladiator-lg.png`,
      blur: 'gladiator1-blur.png',
    },
    identifier: 'gladiator1',
    id: 1,
  },
  {
    name: 'Gladiator Three',
    description: 'Amazing Gladiator Three',
    images: {
      lg: 'gladiator2-lg.png',
      md: 'gladiator2-md.png',
      sm: 'gladiator2-sm.png',
      ipfs: `${PINATA_CLOUD}/QmSnHzZc6JczFBr8BQEQZQj6GdJJxEZ8sx6Ew7CGbHiD6k/2-gladiator-lg.png`,
      blur: 'gladiator2-blur.png',
    },
    identifier: 'gladiator2',
    id: 2,
  },
  {
    name: 'Gladiator Four',
    description: 'Amazing Gladiator Four',
    images: {
      lg: 'gladiator3-lg.png',
      md: 'gladiator3-md.png',
      sm: 'gladiator3-sm.png',
      ipfs: `${PINATA_CLOUD}/QmSnHzZc6JczFBr8BQEQZQj6GdJJxEZ8sx6Ew7CGbHiD6k/3-gladiator-lg.png`,
      blur: 'gladiator3-blur.png',
    },
    identifier: 'gladiator3',
    id: 3,
  }
]

export default Nfts
