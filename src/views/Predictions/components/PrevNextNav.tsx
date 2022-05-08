import React,{useEffect} from 'react'
import { ArrowBackIcon, ArrowForwardIcon, BunnyCardsIcon, Flex, IconButton } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useGetCurrentEpoch, useGetSortedRounds } from 'state/predictions/hooks'
import useSwiper from '../hooks/useSwiper'

const StyledPrevNextNav = styled(Flex)`
  align-items: center;
  display: none;
  justify-content: space-between;
  overflow: initial;
  position: relative;
  width: 300px;
  height: 40px;

  box-shadow: ${({ theme }) => theme.shadows.level1};
  // border-radius: ${({ theme }) => theme.radii.default};
  border-radius: 50px;
  // background-color: ${({ theme }) => theme.card.background};
  background-color: #D9AB3A;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
  }
`

const Icon = styled.div`
  cursor: pointer;
  left: 50%;
  margin-left: -32px;
  position: absolute;
`
const GladiatorImage = styled.img`
  width: 64px;
`
const PrevNextButton = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  &:hover {
    cursor: pointer;
  }
`

const PrevNextNav = ({liveCard}) => {
  const { swiper } = useSwiper()
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()

  const handlePrevSlide = () => {
    swiper.slidePrev()
  }

  const handleNextSlide = () => {
    swiper.slideNext()
  }

  const handleSlideToLive = () => {
    swiper.slideTo(liveCard)
    swiper.update()
  }

  useEffect(() => {
    if(swiper && liveCard){
      setTimeout(() => {
        swiper.slideTo(liveCard)
        swiper.update() 
      }, 100);
    }
  }, [swiper, liveCard])
  return (
    <StyledPrevNextNav>
      <PrevNextButton onClick={handlePrevSlide}>
        {/* <ArrowBackIcon color="textSubtle" width="24px" /> */}
        <img src="/images/battles/prev-button.png" alt="Previous Button" style={{ marginRight: "10px", height: "30px" }} />
        Expired
      </PrevNextButton>
      <Icon onClick={handleSlideToLive}>
        {/* <BunnyCardsIcon width="64px" /> */}
        <GladiatorImage src="/images/tokens/dena.svg" alt="Gladiator" />
      </Icon>
      <PrevNextButton onClick={handleNextSlide}>
        {/* <ArrowForwardIcon color="textSubtle" width="24px" /> */}
        Next
        <img src="/images/battles/next-button.png" alt="Next Button" style={{ marginLeft: "10px", height: "30px" }} />
      </PrevNextButton>
    </StyledPrevNextNav>
  )
}

export default PrevNextNav
