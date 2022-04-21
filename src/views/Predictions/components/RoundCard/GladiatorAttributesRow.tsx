import React, {useState} from 'react'
import styled from 'styled-components'
import {

    useTooltip,
  } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const GladiatorAttributes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px 0px 6px;
`
const LeftValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  color: #7D91AD;
  font-size: 16px;
`
const RightValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  color: #7D91AD;
  font-size: 16px;
  white-space: nowrap;
`
const IconImage = styled.img`
  width: 24px;
`
const GladiatorAttributesRow = ({attacker, defender, image, tooltipValue}) => {
    const {t} = useTranslation()
    const [tooltipName, setTooltipName] = useState("")

    const { targetRef, tooltip, tooltipVisible } = useTooltip(t(tooltipName), {
      placement: 'top',
    })
  return (
    <GladiatorAttributes>
    {tooltipVisible && tooltip}
    <LeftValues>{attacker || 0}</LeftValues>
    <div ref={targetRef} onMouseEnter={() => { setTooltipName(tooltipValue) }} >
      <IconImage src={image} />
    </div>
    <RightValues>{defender}</RightValues>
  </GladiatorAttributes>  )
}

export default GladiatorAttributesRow