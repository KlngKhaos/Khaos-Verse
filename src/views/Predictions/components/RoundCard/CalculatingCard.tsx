import React from 'react'
import { Flex, Spinner, Text, TooltipText, useTooltip, InfoIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled, { keyframes } from 'styled-components'
import { NodeRound, BetPosition } from 'state/types'
import useTheme from 'hooks/useTheme'
import { RoundResultBox } from '../RoundResult'
import MultiplierArrow from './MultiplierArrow'
import CardHeader, { getBorderBackground } from './CardHeader'

const Card = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, .15);  
  backdrop-filter: blur(5px);
  top: 0;
  bottom: 0;
  left: 0; 
  right: 0; 
  margin: auto; 
  width: 460px;
  height: 280px;
  border-radius: 16px;
  border: 2px solid #D9AB3A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CalculatingCard = () => {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('This round’s closing transaction has been submitted to the blockchain, and is awaiting confirmation.'),
    { placement: 'bottom' },
  )

  return (
    <>
      <Card>
        <Spinner />
        <Flex mt="12px" ref={targetRef}>
          <Text>{t('Calculating Results')}</Text>
          <InfoIcon ml="4px" />
        </Flex>
      </Card>
      {tooltipVisible && tooltip}
    </>
  )
}

export default CalculatingCard
