import { GladiatorsCollectionKey, GladiatorsCollections } from './types'

const gladiatorsCollections: GladiatorsCollections = {
  [GladiatorsCollectionKey.GLADIATORS]: {
    name: 'Gladiators Collectibles',
    slug: 'gladiators-collectibles',
    address: {
      56: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
      941: '0x047e4287bd7d922f3eea8473fd9adc39fe8aab45', //lower case
    },
  },
  [GladiatorsCollectionKey.SQUAD]: {
    name: 'Gladiators Squad',
    description: "GladiatorsSwap's first official generative NFT collection.. Join the squad.",
    slug: 'gladiators-squad',
    address: {
      56: '0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
      941: '0xEf12ef570300bFA65c4F022deAaA3dfF4f5d5c91',
    },
  },
}

export default gladiatorsCollections
