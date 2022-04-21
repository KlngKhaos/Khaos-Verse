import React from 'react'
import styled from 'styled-components'
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
      <Spinner />
    </Wrapper>
  )
}

export default PageLoader
