import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from '@pancakeswap/uikit'
import { GalleryNft } from 'config/constants/gallery/types'

export interface ExpandableSectionProps {
  nftModel: GalleryNft
  // infoAddress?: string
  // removed?: boolean
  // totalValueFormatted?: string
  // lpLabel?: string
  // addLiquidityUrl?: string
}

const Wrapper = styled.div`
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  nftModel,
}) => {
  const { t } = useTranslation()
  const sizeFormatted = `${nftModel.size.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${nftModel.sizeMeasure}`
  const weightFormatted = `${nftModel.weight.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${nftModel.weightMeasure}`

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{t('Rarity')}:</Text>
        <Text>{nftModel.rarity}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{t('Supply')}:</Text>
        <Text>{nftModel.supply}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{t('Size')}:</Text>
        {sizeFormatted ? <Text>{sizeFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{t('Weight')}:</Text>
        {weightFormatted ? <Text>{weightFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
