import React from 'react'
import styled from 'styled-components'
import Viewer from './components/Viewer'

const StyledMain = styled.div`
//   display: flex;
//   align-items: center;
//   overflow: hidden;
`

const StyledPage = styled.div`
  text-align: center;
`

const StakeGladiators = () => {
    return (
        <StyledPage>
            <StyledMain>
                <Viewer />
            </StyledMain>
        </StyledPage>
    )
}

export default StakeGladiators
