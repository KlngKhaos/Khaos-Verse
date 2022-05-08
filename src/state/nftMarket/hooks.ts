import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { gladiatorCollectiblesAddress } from 'views/Nft/market/constants'
import { isAddress } from 'utils'
import { FetchStatus } from 'config/constants/types'
import { fetchCollection, fetchCollections, fetchNewPBAndUpdateExisting } from './reducer'
import { State } from '../types'
import { NftActivityFilter, NftFilter, NftToken, UserNftsState } from './types'

const MAX_GEN0_ID = 4

export const useFetchCollections = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCollections())
  }, [dispatch])
}

export const useFetchCollection = (collectionAddress: string) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCollection(collectionAddress))
  }, [dispatch, collectionAddress])
}

// Returns a function that fetches more NFTs for specified bunny id
// as well as updating existing PB NFTs in state
// Note: GladiatorCollectible specific
export const useFetchByGladiatorCollectibleIdAndUpdate = (bunnyId: string) => {
  const dispatch = useAppDispatch()

  const { latestGladiatorCollectiblesUpdateAt, isUpdatingGladiatorCollectibles } = useSelector(
    (state: State) => state.nftMarket.data.loadingState,
  )

  // Extra guard in case market data shifts
  // we don't wanna fetch same tokens multiple times
  const existingGladiatorCollectibleInState = useGetAllGladiatorCollectibleByGladiatorCollectibleId(bunnyId)
  const existingTokensWithGladiatorCollectibleId = existingGladiatorCollectibleInState ? existingGladiatorCollectibleInState.map((nft) => nft.tokenId) : []

  const allGladiatorCollectibles = useNftsFromCollection(gladiatorCollectiblesAddress)
  const allExistingPBTokenIds = allGladiatorCollectibles ? allGladiatorCollectibles.map((nft) => nft.tokenId) : []

  const firstGladiatorCollectible = existingGladiatorCollectibleInState.length > 0 ? existingGladiatorCollectibleInState[0] : null

  // If we already have NFT with this bunny id in state - we can reuse its metadata without making API request
  const existingMetadata = useMemo(() => {
    return firstGladiatorCollectible
      ? {
          name: firstGladiatorCollectible.name,
          description: firstGladiatorCollectible.description,
          collection: { name: firstGladiatorCollectible.collectionName },
          image: firstGladiatorCollectible.image,
        }
      : null
  }, [firstGladiatorCollectible])

  // This fetches more bunnies when called
  const fetchMoreGladiatorCollectibles = (orderDirection: 'asc' | 'desc') => {
    dispatch(
      fetchNewPBAndUpdateExisting({
        bunnyId,
        existingTokensWithGladiatorCollectibleId,
        allExistingPBTokenIds,
        existingMetadata,
        orderDirection,
      }),
    )
  }

  return { isUpdatingGladiatorCollectibles, latestGladiatorCollectiblesUpdateAt, fetchMoreGladiatorCollectibles }
}

export const useLoadingState = () => {
  return useSelector((state: State) => state.nftMarket.data.loadingState)
}

export const useGetCollections = () => {
  return useSelector((state: State) => state.nftMarket.data.collections)
}

export const useGetCollection = (collectionAddress: string) => {
  const checksummedCollectionAddress = isAddress(collectionAddress) || ''
  const collections = useGetCollections()
  return collections[checksummedCollectionAddress]
}

export const useNftsFromCollection = (collectionAddress: string) => {
  const checksummedCollectionAddress = isAddress(collectionAddress) || ''
  const nfts: NftToken[] = useSelector((state: State) => state.nftMarket.data.nfts[checksummedCollectionAddress])
  return nfts
}

export const useGetAllGladiatorCollectibleByGladiatorCollectibleId = (bunnyId: string) => {
  const nfts: NftToken[] = useSelector((state: State) => state.nftMarket.data.nfts[gladiatorCollectiblesAddress])
  return nfts ? nfts.filter((nft) => nft.attributes[0].value === bunnyId && nft.marketData.isTradable) : []
}

export const useGetNFTInitializationState = () => {
  return useSelector((state: State) => state.nftMarket.initializationState)
}

export const useUserNfts = (): UserNftsState => {
  return useSelector((state: State) => state.nftMarket.data.user)
}

export const useHasGen0Nfts = (): boolean => {
  const userNfts = useSelector((state: State) => state.nftMarket.data.user)
  return userNfts.nfts.some((nft) => nft.attributes && Number(nft.attributes[0]?.value) <= MAX_GEN0_ID)
}

export const useGetNftFilters = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.activeFilters : {}
}

export const useGetNftFilterLoadingState = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.loadingState : FetchStatus.Idle
}

export const useGetNftOrdering = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.ordering : { field: 'currentAskPrice', direction: 'asc' as 'asc' | 'desc' }
}

export const useGetNftShowOnlyOnSale = (collectionAddress: string) => {
  const collectionFilter: NftFilter = useSelector((state: State) => state.nftMarket.data.filters[collectionAddress])
  return collectionFilter ? collectionFilter.showOnlyOnSale : true
}

export const useGetNftActivityFilters = (collectionAddress: string) => {
  const collectionFilter: NftActivityFilter = useSelector(
    (state: State) => state.nftMarket.data.activityFilters[collectionAddress],
  )
  return collectionFilter || { typeFilters: [], collectionFilters: [] }
}
