import gladiatorsProfileCollectibles from './gladiatorsProfileCollectibles'
import { CollectionKey, Nfts } from './types'

const nfts: Nfts = {
  [CollectionKey.GLADIATORS]: gladiatorsProfileCollectibles,
}

export default nfts
export { default as collections } from './collections'
