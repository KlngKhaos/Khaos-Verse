import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { Flex, Heading, Button, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import CompositeImage, { getSrcSet, CompositeImageProps } from './CompositeImage'

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }  
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: #000;
`

const BgImage = styled.img`
  height: 100%;
  width: 100%;
  /* margin-top: 95px; */
  object-fit: contain;
  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: -100px;
    object-fit: contain;
  }
  @media (min-width: 480px) and (max-width: 786px) {
    margin-top: 150px;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    height: auto;
    width: 100%;
    margin-top: 245px;
  }
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const HeroWrapper = styled(Flex)`
  width: 50%;
  min-height: 700px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    margin-top: 400px;
    min-height: 400px;
  }

  @media (min-width: 480px) and (max-width: 786px) {
    width: 100%;
    margin-top: 175px;
  }

  // @media (min-width:767px) {
  //   width: 50%;
  //   margin-left: 172px;
  //   margin-top: 35px;
  // }

  @media (min-width: 786px) and (max-width: 1024px) {
    margin-left: 32px;
  }
`

const HeroHeading = styled(Flex)`
  /* color: #ae3675; */
  font-family: 'Good Times';
  @media (min-width: 320px) {
    font-size: 32px;
  }
  @media (min-width: 520px) {
    font-size: 64px;
  }
`

const MidPage = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()

  return (
    <>
      <BgWrapper
        style={{
          backgroundSize: 'cover',
        }}
      >
        <BgImage src="/midpage.png" alt={t('Khaos')} />
      </BgWrapper>
      <HeroWrapper
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        // mt={[account ? '280px' : '50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column" height={['192px', null, null, '100%']}>
          <Heading scale="xxl" color="#7645D9" mb="0px">
            <HeroHeading>{t('Khaos Token')}</HeroHeading>
          </Heading>
          <Text fontSize="3rem" mb="24px" fontWeight={400}>
            {t('Easy to use token.........')}
          </Text>
          <Text fontSize="1rem" mb="24px" fontWeight={200} color="#7A6EAA">
            {t(
              'Khaos Verse is a decentralized crypto ecosystem providing the first bridge between ERC-20 and PulseChain Network',
            )}
          </Text>
          <Flex>
            <Link to="/swap">
              <Button variant="primary" color="#7645D9">
                {t('Buy Khaos')}
              </Button>
            </Link>
          </Flex>
        </Flex>
      </HeroWrapper>
    </>
  )
}

export default MidPage
