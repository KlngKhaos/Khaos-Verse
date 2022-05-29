import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spinner } from '@pancakeswap/uikit'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  min-width: 100vw;
  min-height: 100vh;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      {/* <Spinner /> */}
      <CustomLoader />
    </Wrapper>
  )
}

const CustomLoader = () => {
  return (
    <LoaderStyles>
      <img src="/khaos.png" alt="" />
    </LoaderStyles>
  )
}

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const LoaderStyles = styled.div`
  width: 100%;
  max-width: 100px;
  /* height: 4rem; */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
  animation: ${pulse} 1s infinite;
`

export default PageLoader
