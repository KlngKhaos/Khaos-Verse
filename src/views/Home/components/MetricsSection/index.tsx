import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import GalleryNfts from 'config/constants/gallery/gallery'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import { usePools } from 'state/pools/hooks'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'
import { useGladiatorEquipment, useGladiatorNft } from 'hooks/useContract'
import useStore from '../../../../views/PoolTour3D/store'
import useStores from '../../../../views/Configurator/store/store'





// Values fetched from bitQuery effective 6/9/21
const txCount = 30841921
const addressCount = 2751624

const ImageWrapper = styled(Box)`
  img {
    height: 120px;
    width: auto;
    padding: 10px;
  }
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const Stats = () => {
  
  

  const {
    totalSupplies,
    setTotalSupplies
  } = useStore((state) => state)
  const { t } = useTranslation()
  // const data = useGetStats()
  const { pools } = usePools()
  const { theme } = useTheme()

  // const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'
  // const trades = formatLocalisedCompactNumber(txCount)
  // const users = formatLocalisedCompactNumber(addressCount)
  const gallery = formatLocalisedCompactNumber(GalleryNfts.length)
  const nftsMinted = formatLocalisedCompactNumber(12)
  const poolsCount = formatLocalisedCompactNumber(pools.length)

  // const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  // const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }

  const gladiatorNftContract = useGladiatorNft()
  const gladiatorEquipmentContract = useGladiatorEquipment()

console.log(gladiatorEquipmentContract)
useEffect(()=>{
  const resetColors=()=>{
    const resetting= {0:"#fdfdfd"}
    localStorage.removeItem('con_curColor')
    localStorage.removeItem('con_curName')
    localStorage.removeItem('con_curSpeed')
    localStorage.removeItem('con_curBack')
    localStorage.removeItem('con_colors')
  }
  resetColors()  
}, [])

const totalMinted = async () => {
  try {
    const totalGladiatorMinted = await gladiatorNftContract.totalSupply()
    const totalEquipmentMinted = await gladiatorEquipmentContract.totalSupply()
  const totalSupply = Number(parseInt(totalGladiatorMinted._hex, 16)) + Number(parseInt(totalEquipmentMinted._hex, 16))
  setTotalSupplies(totalSupply)

  // console.log(totalSupply)

  } catch (error) {
    console.log(error)
  }
  
}

useEffect(()=>{
  console.log('just onceeeeeeeeeeeee')
  totalMinted()
  // console.log(totalSupplies);
},[])
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <BgWrapper>
        <img src="/images/home/gladiators/5.png" alt={t('Gladiators Metrics')} width="100%" height="800px" />
      </BgWrapper>
      <ImageWrapper key="/logo.png">
        <img src="/nrtlogo.png" alt="nrt logo" />
        <img src="/logo.png" alt="dena logo" />
      </ImageWrapper>
      <Heading textAlign="center" scale="xl" color={theme.colors.secondary}>
        {t('Innovative.')}
      </Heading>
      <Heading textAlign="center" scale="xl" mb="32px" color={theme.colors.secondary}>
        {t('Play to Earn ecosystem.')}
      </Heading>
      <Text textAlign="center" color="textSubtle" fontSize="24px">
        {t('Gladiators.finance is being built from ground up to bring you the coolest decentralized platform ever.')}
      </Text>
      <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="textSubtle" mb="20px" fontSize="24px">
          {t('Looking forward to have you aboard this awesome adventure and coolness.')}
        </Text>
        {/* <Text display="inline" textAlign="center" color="textSubtle" mb="20px">
          {entrusting}
          <>{data ? <>{tvlString}</> : <Skeleton display="inline-block" height={16} width={70} mt="2px" />}</>
          {inFunds}
        </Text> */}
      </Flex>
      <Text textAlign="center" color="textSubtle" bold mb="32px" fontSize="20px">
        {t('Will you join us?')}
      </Text>

      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('%gallery%|3D models', { gallery })}
            bodyText={t('all time')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t(`%totalSupplies%|minted nfts `, {totalSupplies})}
            bodyText={t('minted in the last 30 days')}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('%poolsCount%|arenas', { poolsCount })}
            bodyText={t('available to stake')}
            highlightColor={theme.colors.failure}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
