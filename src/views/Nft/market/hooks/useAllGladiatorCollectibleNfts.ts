import { useState, useEffect } from 'react'
import {
  getAllGladiatorCollectiblesLowestPrice,
  getAllGladiatorCollectiblesRecentUpdatedAt,
  getNftsFromCollectionApi,
} from 'state/nftMarket/helpers'
import { NftToken } from 'state/nftMarket/types'
import { gladiatorCollectiblesAddress } from '../constants'

// If collection is GladiatorCollectibles - gets all available bunnies, otherwise - null
const useAllGladiatorCollectibleNfts = (collectionAddress: string) => {
  const [allGladiatorCollectibleNfts, setAllGladiatorCollectibleNfts] = useState<NftToken[]>(null)

  const isPBCollection = collectionAddress === gladiatorCollectiblesAddress

  useEffect(() => {
    const fetchGladiatorCollectibles = async () => {
      // In order to not define special TS type just for GladiatorCollectibles display we're hacking a little bit into NftToken type.
      // On this page we just want to display all bunnies with their lowest prices and updates on the market
      // Since some bunnies might not be on the market at all, we don't refer to the redux nfts state (which stores NftToken with actual token ids)
      // We merely request from API all available bunny ids with their metadata and query subgraph for lowest price and latest updates.
      const { data } = await getNftsFromCollectionApi(gladiatorCollectiblesAddress)
      const bunnyIds = Object.keys(data)
      const lowestPrices = await getAllGladiatorCollectiblesLowestPrice(bunnyIds)
      const latestUpdates = await getAllGladiatorCollectiblesRecentUpdatedAt(bunnyIds)
      const allBunnies: NftToken[] = bunnyIds.map((bunnyId) => {
        return {
          // tokenId here is just a dummy one to satisfy TS. TokenID does not play any role in gird display below
          tokenId: data[bunnyId].name,
          name: data[bunnyId].name,
          description: data[bunnyId].description,
          collectionAddress: gladiatorCollectiblesAddress,
          collectionName: data[bunnyId].collection.name,
          image: data[bunnyId].image,
          attributes: [
            {
              traitType: 'bunnyId',
              value: bunnyId,
              displayType: null,
            },
          ],
          meta: {
            currentAskPrice: lowestPrices[bunnyId],
            updatedAt: latestUpdates[bunnyId],
          },
        }
      })
      setAllGladiatorCollectibleNfts(allBunnies)
    }
    if (isPBCollection && !allGladiatorCollectibleNfts) {
      fetchGladiatorCollectibles()
    }
  }, [isPBCollection, allGladiatorCollectibleNfts])

  return allGladiatorCollectibleNfts
}

export default useAllGladiatorCollectibleNfts
