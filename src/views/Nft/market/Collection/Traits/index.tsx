import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Container from 'components/Layout/Container'
import { useAppDispatch } from 'state'
import { useGetCollection } from 'state/nftMarket/hooks'
import { fetchCollection } from 'state/nftMarket/reducer'
import Header from '../Header'
import GladiatorCollectiblesTraits from './GladiatorCollectibleTraits'
import { gladiatorCollectiblesAddress } from '../../constants'
import CollectionTraits from './CollectionTraits'

const Traits = () => {
  const { collectionAddress } = useParams<{ collectionAddress: string }>()
  const dispatch = useAppDispatch()
  const collection = useGetCollection(collectionAddress)

  useEffect(() => {
    if (collectionAddress) {
      dispatch(fetchCollection(collectionAddress))
    }
  }, [collectionAddress, dispatch])

  return (
    <>
      <Header collection={collection} />
      <Container py="40px">
        {collectionAddress === gladiatorCollectiblesAddress ? (
          <GladiatorCollectiblesTraits collectionAddress={collectionAddress} />
        ) : (
          <CollectionTraits collectionAddress={collectionAddress} />
        )}
      </Container>
    </>
  )
}

export default Traits
