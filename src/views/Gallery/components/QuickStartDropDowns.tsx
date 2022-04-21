import React, { useState } from 'react'
import { Flex, Text, ExpandableLabel } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'


const StyledHistory = styled.div`
  background-color: ${({ theme }) => theme.card.background};
  display: flex;
  flex-direction: column;
  height: 100%;
`
const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 24px;
`
const ExpandableText = styled.div`
  color:  #D9AB3A;
  width: 100%;
  text-align: left;
`
const NewFlex = styled(Flex)`
  & > button {
      width: 100% !important;
      padding: 0px 0pc !important;
  }
`
interface QuickStartDropDownsProps {
    title: string;
    description: string;
}

const QuickStartDropDowns: React.FC<QuickStartDropDownsProps> = ({ title, description }) => {
    const { t } = useTranslation()
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <StyledHistory>
            <NewFlex p="8px" alignItems="center" justifyContent="space-betwen" width="100%">
                <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
                    <ExpandableText>
                        {title}
                    </ExpandableText>
                </ExpandableLabel>
            </NewFlex>
            {isExpanded && (
                <LabelWrapper>
                    <Text>{description}</Text>
                </LabelWrapper>
            )}
        </StyledHistory>
    )
}

export default QuickStartDropDowns
