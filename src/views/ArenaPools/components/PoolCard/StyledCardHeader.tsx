import React from 'react'
import { CardHeader, Heading, Text, Flex, IconButton, Link } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import styled, { keyframes } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { TokenPairImage } from 'components/TokenImage'
// import { DeserializedPool } from 'state/types'
import CakeVaultTokenPairImage from '../CakeVaultCard/CakeVaultTokenPairImage'
// import AprRow from './AprRow'
import View3DIcon from './Svg/View3DIcon'

const Wrapper = styled(CardHeader) <{ isFinished?: boolean; background?: string }>`
  background: ${({ background }) => `url(${background})`} no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;  
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-3px, -3px);
  }
  to {
    transform: translate(0, 0px);
  }  
`

const StyledIconButton = styled(IconButton)`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => `${theme.radii.circle}`};
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
  background: black;
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
  arenaId?: string
  cardTextColor?: string
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false, arenaId, cardTextColor }) => {
  const { t } = useTranslation()
  const isCakePool = earningToken.symbol === 'NRT' && stakingToken.symbol === 'NRT'
  // const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isCakePool) {
      // manual cake
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    if (isCakePool) {
      return t('Earn DENA, stake DENA')
    }
    // console.log(stakingToken.symbol)
    return t('Stake NRT',
      // { symbol: stakingToken.symbol }
    )
  }

  return (
    <Wrapper isFinished={isFinished} background={`/images/gallery/${arenaId}-bg.jpg`}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={cardTextColor} scale="lg">
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          <Text color={cardTextColor}>{getSubHeading()}</Text>
        </Flex>
        {isAutoVault ? (
          <CakeVaultTokenPairImage width={64} height={64} />
        ) : (
          <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={64} height={64} />
        )}
      </Flex>
      <Flex flexDirection="row-reverse" >
        <Link href={`/tour/${arenaId}`}>
          {/* <StyledIconButton >
            <View3DIcon />
          </StyledIconButton> */}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
