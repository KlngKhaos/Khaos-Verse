import React, { Suspense, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import { ethers } from 'ethers'
import { Card, Text } from '@pancakeswap/uikit'
import PreviewStakeCard from './PreviewStakeCard'
import GalleryNft from '../../../config/constants/gallery/gallery'
import { useTranslation } from 'contexts/Localization'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
  background-color: #000;
  //   position: relative;
  width: 100%;
  overflow: hidden;
  padding: 15px;
`

const StyledImage = styled.img`
  transition: opacity 1s linear;
  object-fit: scale-down;
  border-radius: 24px 24px 0 0;
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const cardAnimation = keyframes`
from { transform: translate(0,  0px); }
65%  { transform: translate(15px, 15px); }
to   { transform: translate(-0px, 0); }  
`
const AnimatedCard = styled(Card)`
  animation-name: ${cardAnimation};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-left: 30px;
  margin-top: 5px;
`

const StakeGladiatorCard = () => {
  // const nft = GalleryNft.map(x=>x.glTF)
  const { t } = useTranslation()
  const location = useLocation()
  const glTF = GalleryNft.map((x) => x.glTF)
  // console.log(glTF, 'gltf')
  let obj = location.state as any

  const image = location?.state ? glTF.filter((i: any) => i === obj?.currentStatics?.glTF)[0] : ''
  // <img src="/images/decorations/5.png" alt={t('RoomPools')} />
  const previewImageSrc = `/gallery/${image}/preview.png`
  // console.log('IMAGE', image)
  const previewImage = <StyledImage src={previewImageSrc} alt="Name" />

  return (
    <>
      {image !== '' ? (
        <AnimatedCard style={{ background: '#d9ab3a' }}>
          <img src={previewImageSrc} alt="name" />

          <Text textAlign="center">Stake in Room</Text>
        </AnimatedCard>
      ) : (
        <img src="/images/decorations/5.png" />
      )}
    </>
  )
}

export default StakeGladiatorCard
