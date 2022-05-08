import React, { useState, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Flex } from '@pancakeswap/uikit'
import orderBy from 'lodash/orderBy'
import Page from 'components/Layout/Page'
import { useFetchByGladiatorCollectibleIdAndUpdate, useGetAllGladiatorCollectibleByGladiatorCollectibleId } from 'state/nftMarket/hooks'
import { getNftsFromCollectionApi } from 'state/nftMarket/helpers'
import { NftToken } from 'state/nftMarket/types'
import PageLoader from 'components/Loader/PageLoader'
import usePreviousValue from 'hooks/usePreviousValue'
import { useFastFresh } from 'hooks/useRefresh'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { PANCAKE_BUNNIES_UPDATE_FREQUENCY } from 'config'
import { useGetCollectionDistributionPB } from 'views/Nft/market/hooks/useGetCollectionDistribution'
import MainGladiatorCollectibleCard from './MainGladiatorCollectibleCard'
import ManageGladiatorCollectibleCard from './ManageGladiatorCollectibleCard'
import PropertiesCard from '../shared/PropertiesCard'
import DetailsCard from '../shared/DetailsCard'
import MoreFromThisCollection from '../shared/MoreFromThisCollection'
import ForSaleTableCard from './ForSaleTableCard'
import { gladiatorCollectiblesAddress } from '../../../constants'
import { sortNFTsByPriceBuilder } from './ForSaleTableCard/utils'
import { SortType } from '../../../types'
import { TwoColumnsContainer } from '../shared/styles'
import usePrevious from '../../../../../../hooks/usePreviousValue'

interface IndividualGladiatorCollectiblePageProps {
  bunnyId: string
}

const IndividualGladiatorCollectiblePage: React.FC<IndividualGladiatorCollectiblePageProps> = ({ bunnyId }) => {
  const { account } = useWeb3React()
  const [nothingForSaleGladiatorCollectible, setNothingForSaleGladiatorCollectible] = useState<NftToken>(null)
  const allGladiatorCollectible = useGetAllGladiatorCollectibleByGladiatorCollectibleId(bunnyId)
  const [priceSort, setPriceSort] = useState<SortType>('asc')
  const previousPriceSort = usePreviousValue(priceSort)
  const { isUpdatingGladiatorCollectibles, latestGladiatorCollectiblesUpdateAt, fetchMoreGladiatorCollectibles } =
    useFetchByGladiatorCollectibleIdAndUpdate(bunnyId)
  const fastRefresh = useFastFresh()
  const isWindowVisible = useIsWindowVisible()
  const gladiatorCollectibleSortedByPrice = orderBy(allGladiatorCollectible, (nft) => parseFloat(nft.marketData.currentAskPrice))
  const allGladiatorCollectibleFromOtherSellers = account
    ? gladiatorCollectibleSortedByPrice.filter((bunny) => bunny.marketData.currentSeller !== account.toLowerCase())
    : gladiatorCollectibleSortedByPrice
  const cheapestGladiatorCollectible = gladiatorCollectibleSortedByPrice[0]
  const cheapestGladiatorCollectibleFromOtherSellers = allGladiatorCollectibleFromOtherSellers[0]
  const prevGladiatorCollectibleId = usePrevious(bunnyId)

  const {
    data: distributionData,
    total: totalGladiatorCollectibleCount,
    isFetching: isFetchingDistribution,
  } = useGetCollectionDistributionPB()

  useEffect(() => {
    // Fetch first 30 NFTs on page load
    // And then query every FETCH_NEW_NFTS_INTERVAL_MS in case some new (cheaper) NFTs were listed
    const msSinceLastUpdate = Date.now() - latestGladiatorCollectiblesUpdateAt
    // Check for last update is here to prevent too many request due to fetchMoreGladiatorCollectible updating too often
    // (it can't be reasonably wrapper in useCallback because the tokens are updated every time you call it, which is the whole point)
    // Since fastRefresh is 10 seconds and FETCH_NEW_NFTS_INTERVAL_MS is 8 seconds it fires every 10 seconds
    // The difference in 2 seconds is just to prevent some edge cases when request takes too long
    if (
      prevGladiatorCollectibleId !== bunnyId ||
      (msSinceLastUpdate > PANCAKE_BUNNIES_UPDATE_FREQUENCY && !isUpdatingGladiatorCollectibles && isWindowVisible)
    ) {
      fetchMoreGladiatorCollectibles(priceSort)
    }
  }, [
    bunnyId,
    prevGladiatorCollectibleId,
    priceSort,
    fetchMoreGladiatorCollectibles,
    isUpdatingGladiatorCollectibles,
    latestGladiatorCollectiblesUpdateAt,
    fastRefresh,
    isWindowVisible,
  ])

  useEffect(() => {
    // Fetch most expensive items if user selects other sorting
    if (previousPriceSort && previousPriceSort !== priceSort) {
      fetchMoreGladiatorCollectibles(priceSort)
    }
  }, [fetchMoreGladiatorCollectibles, priceSort, previousPriceSort])

  useEffect(() => {
    const fetchBasicGladiatorCollectibleData = async () => {
      const { data } = await getNftsFromCollectionApi(gladiatorCollectiblesAddress)
      setNothingForSaleGladiatorCollectible({
        // In this case tokenId doesn't matter, this token can't be bought
        tokenId: data[bunnyId].name,
        name: data[bunnyId].name,
        description: data[bunnyId].description,
        collectionName: data[bunnyId].collection.name,
        collectionAddress: gladiatorCollectiblesAddress,
        image: data[bunnyId].image,
        attributes: [
          {
            traitType: 'bunnyId',
            value: bunnyId,
            displayType: null,
          },
        ],
      })
    }
    // If bunny id has no listings on the market - get basic bunny info
    if (!cheapestGladiatorCollectible) {
      fetchBasicGladiatorCollectibleData()
    }
  }, [cheapestGladiatorCollectible, bunnyId])

  const sortedNfts = useMemo(() => allGladiatorCollectible.sort(sortNFTsByPriceBuilder({ priceSort })), [allGladiatorCollectible, priceSort])

  if (!cheapestGladiatorCollectible && !nothingForSaleGladiatorCollectible) {
    // TODO redirect to nft market page if collection or bunny id does not exist (came here from some bad url)
    // That would require tracking loading states and stuff...

    // For now this if is used to show loading spinner while we're getting the data
    return <PageLoader />
  }

  const togglePriceSort = () => {
    setPriceSort((currentValue) => (currentValue === 'asc' ? 'desc' : 'asc'))
  }

  const getGladiatorCollectibleIdCount = () => {
    if (distributionData && !isFetchingDistribution) {
      return distributionData[bunnyId].tokenCount
    }
    return null
  }

  const getGladiatorCollectibleIdRarity = () => {
    if (distributionData && !isFetchingDistribution) {
      return (distributionData[bunnyId].tokenCount / totalGladiatorCollectibleCount) * 100
    }
    return null
  }

  const properties = cheapestGladiatorCollectible?.attributes || nothingForSaleGladiatorCollectible?.attributes

  const propertyRarity = { bunnyId: getGladiatorCollectibleIdRarity() }

  return (
    <Page>
      <MainGladiatorCollectibleCard
        cheapestNft={cheapestGladiatorCollectible}
        cheapestNftFromOtherSellers={cheapestGladiatorCollectibleFromOtherSellers}
        nothingForSaleGladiatorCollectible={nothingForSaleGladiatorCollectible}
      />
      <TwoColumnsContainer flexDirection={['column', 'column', 'row']}>
        <Flex flexDirection="column" width="100%">
          <ManageGladiatorCollectibleCard bunnyId={bunnyId} lowestPrice={cheapestGladiatorCollectible?.marketData?.currentAskPrice} />
          <PropertiesCard properties={properties} rarity={propertyRarity} />
          <DetailsCard
            contractAddress={gladiatorCollectiblesAddress}
            ipfsJson={cheapestGladiatorCollectible?.marketData?.metadataUrl}
            rarity={propertyRarity?.bunnyId}
            count={getGladiatorCollectibleIdCount()}
          />
        </Flex>
        <ForSaleTableCard
          nftsForSale={sortedNfts}
          bunnyId={bunnyId}
          totalForSale={allGladiatorCollectible.length}
          loadMore={fetchMoreGladiatorCollectibles}
          priceSort={priceSort}
          togglePriceSort={togglePriceSort}
          isFetchingMoreNfts={isUpdatingGladiatorCollectibles}
        />
      </TwoColumnsContainer>
      <MoreFromThisCollection
        collectionAddress={gladiatorCollectiblesAddress}
        currentTokenName={cheapestGladiatorCollectible?.name || nothingForSaleGladiatorCollectible?.name}
      />
    </Page>
  )
}

export default IndividualGladiatorCollectiblePage
