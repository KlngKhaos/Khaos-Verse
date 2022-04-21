import React, { Suspense, useState, useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import styled from 'styled-components'
import { useGetGallery } from 'state/gallery/hooks'

const StyledViewer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`
const StyledCanvasWrapper = styled.div`
  height: calc(100vh - 60px);
  position: relative;
`

const StyledCanvasBack = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-image: url(images/gallery/gladiator-arena.png );
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
//   filter: blur(3px);
`

const StyledHealthBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 2.5vw;
  width: 100%;
`

const StyledArrowButton = styled.button`
  position: absolute;
  background: url(/images/battles/back.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: unset;
  border: unset;
  width: 170px;
  height: 39px;
  color: white;
  top: 50%;
  left: 10%;
  font-size: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100px;
    height: 22px;
    font-size: 14px;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

// type ChildProps = {
//     curColor: string
//     setColor: (arg0: string) => void
//     curName: string
//     setCurName: (arg0: string) => void
//     curSpeed: any
//     curBack: any
//     colors: any
//     nftHash?: any | []
// }

const Viewer: React.FC = () => {


  const ButtonGroup = () => {
    return (
      <div>
        <StyledArrowButton style={{ left: 'unset', right: '10%' }}>
          Back
        </StyledArrowButton>
        <StyledArrowButton style={{ left: 'unset', right: '10%' }}>
          Next
        </StyledArrowButton>
      </div>
    )
  }
  return (
    <>
      <StyledViewer>
        <StyledCanvasWrapper>
          <StyledCanvasBack />
          <ButtonGroup />
        </StyledCanvasWrapper>
      </StyledViewer>
    </>
  )
}

export default Viewer
