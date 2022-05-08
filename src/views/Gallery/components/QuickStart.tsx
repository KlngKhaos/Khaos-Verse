import React from 'react'
import styled from 'styled-components'
import QuickStartDropDowns from './QuickStartDropDowns'

const StyledHistory = styled.div`
  background-color: ${({ theme }) => theme.card.background};
  display: flex;
  flex-direction: column;
//   height: 100%;
  justify-content: start
`

const QuickStart = () => {

    return (
        <StyledHistory>
            <QuickStartDropDowns title="Personalize Gladiator body" description="Tips how to personilized Gladiator body" />
            <QuickStartDropDowns title="Personalize Colors" description="Tips how to personilized Gladiator colors" />
            <QuickStartDropDowns title="Personalize Arena" description="Tips how to personilized Gladiator colors" />
            <QuickStartDropDowns title="Send to School" description="Tips how to personilized Gladiator colors" />
            <QuickStartDropDowns title="Gladiator Ready" description="Tips how to personilized Gladiator colors" />
            <QuickStartDropDowns title="More Help" description="Tips how to personilized Gladiator colors" />
        </StyledHistory>
    )
}

export default QuickStart
