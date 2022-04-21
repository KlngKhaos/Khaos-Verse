import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Card, Flex } from '@pancakeswap/uikit'
import { GalleryNft } from 'config/constants/gallery/types'
import { useTranslation } from 'contexts/Localization'
import { fetchWalletGalleryNfts } from 'state/gallery'
import { useAppDispatch } from 'state'
import NftCard from './NftCard'

const StyledCard = styled(Card)`
  align-self: baseline;
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

interface GalleryModelCardProps {
  nftModel: GalleryNft
  removed: boolean
  cakePrice?: BigNumber
  account?: string
}

const GalleryModelCard: React.FC<GalleryModelCardProps> = ({ nftModel, removed, cakePrice, account }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const isPromotedFarm = nftModel.isPromoted
  const handleRefresh = () => {
    dispatch(fetchWalletGalleryNfts(account))
  }

  return (
    <>
      
      <StyledCard isActive={isPromotedFarm} style={{ background: '#d9ab3a' }}>
        <div key={nftModel.name}>
          <NftCard nft={nftModel} refresh={handleRefresh} />
        </div>
      </StyledCard>
    </>
  )
}

export default GalleryModelCard
