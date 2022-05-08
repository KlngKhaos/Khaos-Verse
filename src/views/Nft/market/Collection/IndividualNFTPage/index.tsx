import React from 'react'
import { useParams } from 'react-router'
import { gladiatorCollectiblesAddress } from '../../constants'
import IndividualGladiatorCollectiblePage from './GladiatorCollectiblePage'
import IndividualNFTPage from './OneOfAKindNftPage'

const IndividualNFTPageRouter = () => {
  // For GladiatorCollectibles tokenId in url is really bunnyId
  const { collectionAddress, tokenId } = useParams<{ collectionAddress: string; tokenId: string }>()

  const isPBCollection = collectionAddress.toLowerCase() === gladiatorCollectiblesAddress.toLowerCase()
  if (isPBCollection) {
    return <IndividualGladiatorCollectiblePage bunnyId={tokenId} />
  }

  return <IndividualNFTPage collectionAddress={collectionAddress} tokenId={tokenId} />
}

export default IndividualNFTPageRouter
