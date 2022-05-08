import { Activity, NftToken, TokenIdWithCollectionAddress } from 'state/nftMarket/types'
import { getNftsFromCollectionApi, getNftsFromDifferentCollectionsApi } from 'state/nftMarket/helpers'
import { uniqBy } from 'lodash'
import { gladiatorCollectiblesAddress } from '../../constants'

export const fetchActivityNftMetadata = async (activities: Activity[]): Promise<NftToken[]> => {
  const hasPBCollections = activities.some(
    (activity) => activity.nft.collection.id.toLowerCase() === gladiatorCollectiblesAddress.toLowerCase(),
  )
  let bunniesMetadata
  if (hasPBCollections) {
    bunniesMetadata = await getNftsFromCollectionApi(gladiatorCollectiblesAddress)
  }

  const pbNfts = activities
    .filter((activity) => activity.nft.collection.id.toLowerCase() === gladiatorCollectiblesAddress.toLowerCase())
    .map((activity) => {
      const { name: collectionName } = bunniesMetadata.data[activity.nft.otherId].collection
      return {
        ...bunniesMetadata.data[activity.nft.otherId],
        tokenId: activity.nft.tokenId,
        attributes: [{ traitType: 'bunnyId', value: activity.nft.otherId }],
        collectionAddress: activity.nft.collection.id,
        collectionName,
      }
    })

  const activityNftTokenIds = uniqBy(
    activities
      .filter((activity) => activity.nft.collection.id.toLowerCase() !== gladiatorCollectiblesAddress.toLowerCase())
      .map((activity): TokenIdWithCollectionAddress => {
        return { tokenId: activity.nft.tokenId, collectionAddress: activity.nft.collection.id }
      }),
    'tokenId',
  )
  const nfts = await getNftsFromDifferentCollectionsApi(activityNftTokenIds)
  return nfts.concat(pbNfts)
}
