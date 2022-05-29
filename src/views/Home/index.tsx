import React, { useMemo, useState, useEffect } from 'react'
import { Route, useRouteMatch, useLocation, NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import { orderBy, union } from 'lodash'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { Heading, Text, Box, Flex, Button, useModal } from '@pancakeswap/uikit'
import { CommunityTag, CoreTag, PartnerTag } from 'components/Tags'
import {
  useUserFarmStakedOnly,
  useUserFarmsViewMode,
  useUserGalleryFreshwaterOnly,
  useUserGallerySaltwaterOnly,
} from 'state/user/hooks'
import { GalleryNft, NftToken } from 'config/constants/gallery/types'
import HomeGallery from 'views/Gallery/HomeGallery'
import ViewerSolo from 'views/Configurator/components/ViewerSolo'

import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'

import { tokensData } from './components/TokensData/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import TokenData from './components/TokensData'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import NrtDenaData from './components/NrtDenaData'
import UserBanner from './components/UserBanner'
import Configurator3DNftModal from '../Gallery/components/Configurator3DNftModal'
import Hero from './components/Hero'
import MidPage from './components/MidPage'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;
  padding-bottom: 0;

  /* ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  } */
`
const HeroHome = styled.div`
  background-color: #000000;
`

const StyledMetricsSection = styled(PageSection)`
  padding-top: 0;
  margin-top: 100px;
  background-color: #000000;
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 20px;
    padding-right: 20px;
  }
`
const GladiatorGallery = styled.div`
  background-image: url(images/decorations/BG.png);
  display: flex;
  flex-direction: column;
  padding: 0px 280px;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0px 32px;
  }
`
const GladiatorSlider = styled.div`
  background-color: #000000;
  display: flex;
  flex-direction: column;
  padding: 0px 280px;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 0px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    padding: 0px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0px 32px;
  }
`

const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    flex-direction: column;
  }
`

const SliderBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 48px;
`

const Left = styled.div`
  margin-bottom: 50px;
  & svg:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 100px;
  }
`
const Right = styled.div`
  margin-bottom: 50px;
  & svg:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 100px;
  }
`

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 640px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 324px;
  }
`
const SliderImage = styled.div`
  background-image: url(images/decorations/BG.png);
  border-radius: 24px;
  border: 3px solid #d9ab3a;
  width: 640px;
  height: 440px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 324px;
  }
`
const Slide = styled.img`
  width: 640px;
  margin-top: 50px;
`
const GladiatorContent = styled.div`
  flex-direction: column;
  flex: 1;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

const GladiatorImg = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 0.5;
  & img {
    height: 50%;
    width: 50%;
    max-height: 330px;
    margin-top: 24px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & img {
      height: auto;
      width: auto;
    }
  }
`
const GladiatorImages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
`
const MainImage = styled.div`
  background-color: #000;
  padding: 10px 24px;
  border 3px solid #d9ab3a;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin-right:24px;
  @media (min-width: 320px) and (max-width : 480px) {
    width: 100%;
    margin-right: 0px;
  }
`
const NewButton = styled(Button)`
  margin-top: 100px;
  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`
const gladiatorImages = [
  '/images/decorations/gladiator.png',
  '/images/decorations/gladiator2.jpg',
  '/images/decorations/gladiator3.jpg',
  // '/images/decorations/gladiator3.jpg',
]

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  const { t } = useTranslation()

  const [nft, setNft] = useState<GalleryNft | null>(null)
  const [curColor, setCurColor] = useState(
    localStorage.getItem('con_curColor') ? localStorage.getItem('con_curColor') : '#ffffff',
  )
  const [curName, setCurName] = useState(
    localStorage.getItem('con_curName') ? localStorage.getItem('con_curName') : 'None selected.',
  )
  const [curSpeed, setCurSpeed] = useState(
    localStorage.getItem('con_curSpeed') ? localStorage.getItem('con_curSpeed') : 1,
  )
  const [curBack, setCurBack] = useState(localStorage.getItem('con_curBack') ? localStorage.getItem('con_curBack') : 0)
  const [colors, setColors] = useState(
    JSON.parse(localStorage.getItem('con_colors')) ? JSON.parse(localStorage.getItem('con_colors')) : {},
  )

  const [gladiatorImage, setImage] = useState(gladiatorImages[0])
  const [indexImage, setImageIndex] = useState(0)

  // useEffect(() => {
  //   const resetColors=()=>{
  //     const resetting= {0:"#fdfdfd"}
  //     localStorage.removeItem('con_curColor')
  //     localStorage.removeItem('con_curName')
  //     localStorage.removeItem('con_curSpeed')
  //     localStorage.removeItem('con_curBack')
  //     localStorage.removeItem('con_colors')
  //   }
  //   resetColors()
  // },[])

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }
  return (
    <>
      <HeroHome>
        <PageMeta />
        <StyledHeroSection
          innerProps={{ style: { margin: '0', width: '100%', paddingBottom: '0' } }}
          index={2}
          hasCurvedDivider={false}
        >
          {/* <UserBannerWrapper>{account && <UserBanner />}</UserBannerWrapper> */}
          <Hero />
        </StyledHeroSection>
        {/* <StyledMetricsSection
          innerProps={{ style: { margin: '0', width: '100%', paddingBottom: '50px' } }}
          index={2}
          hasCurvedDivider={false}
        >
          <MetricsSection />
        </StyledMetricsSection> */}
        {/* <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          background={theme.colors.backgroundAlt}
          index={2}
          hasCurvedDivider={false}
        >
          <SalesSection {...swapSectionData} />
        </PageSection> */}
        {/* <GladiatorGallery>
          <PageSection index={2} hasCurvedDivider={false} background="transparent">
            <GalleryHeader>
              <GladiatorContent>
                <Heading scale="xl" color="secondary" mb="24px">
                  {t('Gladiators 3D Gallery')}
                </Heading>
                <Text textAlign="left" color="white">
                  {t(
                    'This is where you will find our ecosystems 3D models for purchase. Browse, personalize and buy,as simple as 1,2,3. Click on Personalize & Buy to visualize and personalize,you wont be charged until you make up your mind. Make sure you visit your creatures evolution lifecycle',
                  )}
                </Text>
              </GladiatorContent>
              <GladiatorImg>
                <img
                  src="/images/decorations/gladiator.png"
                  alt={t('gallery gladiator')}
                  width="auto"
                  height="300px"
                  style={{ maxWidth: '350px' }}
                />
              </GladiatorImg>
              <Link to="/gallery">
                <Button variant={!account ? 'secondary' : 'primary'}>{t('Explore Gallery')}</Button>
              </Link>
            </GalleryHeader>
            <GladiatorImages>
              <MainImage>
                {nft && (
                  <ViewerSolo
                    nft={nft}
                    curColor={curColor}
                    curName={curName}
                    setCurName={(name) => ''}
                    curSpeed={curSpeed}
                    curBack={curBack}
                    colors={colors}
                    home="true"
                    setModel={(scene, anim) => ''}
                    showToast={(type, content) => ''}
                  />
                )}
              </MainImage>
              <HomeGallery setNft={setNft} nft={nft} />
            </GladiatorImages>
          </PageSection>
        </GladiatorGallery>
        <GladiatorSlider>
          <PageSection index={2} hasCurvedDivider={false} background="#000000">
            <GalleryHeader>
              <Flex>
                <GladiatorContent>
                  <Heading scale="xl" color="secondary" mb="24px">
                    {t('How it works')}
                  </Heading>
                  <Text textAlign="left" color="white">
                    {t(
                      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more or less normal distribution of letters, as opposed to using Conten there,content here, making it look like readable English.',
                    )}
                  </Text>
                </GladiatorContent>
              </Flex>
            </GalleryHeader>
            <SliderBody>
              <Left
                onClick={() => {
                  let index = gladiatorImages.indexOf(gladiatorImage)
                  if (index !== 0) {
                    setImage(gladiatorImages[index - 1])
                    setImageIndex(--index)
                  }
                  // : setImage(gladiatorImages[gladiatorImages.length - 1])
                }}
              >
                {indexImage !== 0 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#D9AB3A" />
                    <path d="M8 12L14 6V18L8 12Z" fill="black" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="transparent" />
                    <path d="M8 12L14 6V18L8 12Z" fill="black" />
                  </svg>
                )}
              </Left>
              <Slider>
                <SliderImage>
                  <Slide src={gladiatorImage} alt={t('gallery gladiator')} />
                </SliderImage>

                <Text textAlign="left" color="white" mt="3">
                  {t(
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more.',
                  )}
                </Text>
              </Slider>
              <Right
                onClick={() => {
                  let index = gladiatorImages.indexOf(gladiatorImage)
                  if (index !== gladiatorImages.length - 1) {
                    setImage(gladiatorImages[index + 1])
                    setImageIndex(++index)
                  }
                  // else{ setImage(gladiatorImages[0])
                }}
              >
                {indexImage !== gladiatorImages.length - 1 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="#D9AB3A" />
                    <path d="M16 12L10 18V6L16 12Z" fill="black" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="transparent" />
                    <path d="M16 12L10 18V6L16 12Z" fill="black" />
                  </svg>
                )}
              </Right>
            </SliderBody>
          </PageSection>
        </GladiatorSlider> */}
        {/* <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.gradients.cardHeader}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper width="150%" top fill={theme.colors.background}>
            <WedgeTopRight />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...earnSectionData} />
        <FarmsPoolsRow />
      </PageSection> */}
        {/* <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #0B4576 0%, #091115 100%)'
            : 'linear-gradient(180deg, #6FB6F1 0%, #EAF2F6 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <WinSection />
      </PageSection> */}
        {/* <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          background={theme.colors.background}
          index={2}
          hasCurvedDivider={false}
        >
          <TokenData {...tokensData} />
        </PageSection> */}
        <PageSection
          innerProps={{ style: HomeSectionContainerStyles }}
          background="linear-gradient(180deg,#3e3e3e 0%,#000 100%)"
          index={2}
          hasCurvedDivider={false}
        >
          <Footer />
        </PageSection>
        <StyledHeroSection
          innerProps={{ style: { margin: '0', width: '100%', paddingBottom: '0' } }}
          index={2}
          hasCurvedDivider={false}
        >
          <MidPage />
        </StyledHeroSection>
      </HeroHome>
    </>
  )
}

export default Home
