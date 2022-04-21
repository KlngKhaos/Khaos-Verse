import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Card, Flex } from '@pancakeswap/uikit'
import { GalleryNft } from 'config/constants/gallery/types'
import { useTranslation } from 'contexts/Localization'
import { fetchWalletGalleryNfts } from 'state/gallery'
import { useAppDispatch } from 'state'
import HomeNftCard from './NftCard/HomeNFTCard'

const StyledCard = styled(Card)`
  background-color: #d9ab3a;
  align-self: baseline;
  &:nth-child(3) {
      margin-bottom: 0;
  }
    min-width: 558px !important;
    @media (min-width: 320px) and (max-width: 480px) {
      min-width: 377px !important;
      &:nth-child(1) {
        margin-top: 32px;
    }
    }
}
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
  setNft?: any
  selectedCard?: any
  setSelectedCard?: any
}

const GalleryModelCard: React.FC<GalleryModelCardProps> = ({ nftModel, removed, cakePrice, account, setNft, selectedCard, setSelectedCard }) => {
  const [clicked, setClicked] = useState(false);
  
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const isPromotedFarm = nftModel.isPromoted
  const handleRefresh = () => {
    dispatch(fetchWalletGalleryNfts(account))
  }

  const handleColor = () => {
    setClicked(true)
    setSelectedCard(nftModel.name)
  }

  return (
    <StyledCard isActive={isPromotedFarm} style={{backgroundColor: clicked && selectedCard === nftModel.name ? '#8a2b13' : "", border: clicked && selectedCard === nftModel.name ? "1px solid #8a2b13" : ""}} onClick={handleColor}>
      <div key={nftModel.name}>
        <HomeNftCard nft={nftModel} refresh={handleRefresh} setNft={setNft} />
      </div>
    </StyledCard>
  )
}

export default GalleryModelCard
