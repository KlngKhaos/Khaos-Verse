import React, { useEffect, useState } from 'react'
import { useCountUp } from 'react-countup'
import {
    Card,
    CardBody,
    Flex,
    PlayCircleOutlineIcon,
    Skeleton,
    Text,
    TooltipText,
    useTooltip,
    WaitIcon,
    useModal,
    Modal,
    Button,
    ArrowBackIcon,
    IconButton,
    BinanceIcon,
    BalanceInput,
    Slider,
    Box,
    AutoRenewIcon,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled, { keyframes } from 'styled-components'
import RoundProgress from 'components/RoundProgress'
import CardHeader from './CardHeader'
import { getSpecificJoinPageNfts, getSpecificGladiators2 } from 'state/nftMarket/helpers'
import { useBattleNft, usePredictionNft, useCake } from 'hooks/useContract'
import galleryNfts from 'config/constants/gallery/gallery'

import { ethers } from "ethers"
import ModalComponent from './ModalComponent'
import GladiatorAttributesRow from './GladiatorAttributesRow'
import EquipmentImages from './EquipmentImages'
import useCountdown from '../../hooks/useCountdown'
import { formatRoundTime } from '../../helpers'








const NewCard = styled(Card)`
  width: 700px;
  position: relative;
  margin-right: 20px;
`
const CardInner = styled.div`
  padding: 0px 12px 0px 12px;
  background-image: url(/images/battles/card-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
`
const GladiatorBattle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 420px;
`

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0px 0px 0px;
`

const CalculatingCard = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, .15);  
  backdrop-filter: blur(5px);
  top: 0;
  bottom: 0;
  left: 0; 
  right: 0; 
  margin: auto; 
  width: 320px;
  height: 180px;
  border-radius: 16px;
  border: 2px solid #D9AB3A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


interface LaterBattleProps {
    laterBattle?: any
    remainingTime: any
    index: number | string

}
const LaterBattle: React.FC<LaterBattleProps> = ({ laterBattle, remainingTime, index }) => {
    const { t } = useTranslation()
const { secondsRemaining } = useCountdown(remainingTime)
const countdown = formatRoundTime(secondsRemaining)
// console.log("countdowncountdowncountdowncountdowncountdown", countdown)

    return (
        <>
            <NewCard isActive>
                <CardHeader
                    status="soon"
                    icon={<WaitIcon mr="4px" width="21px" color="secondary" />}
                    title={t('Later')}
                    epoch={Number(laterBattle)}
                />
                <CardInner>
                    <GladiatorBattle>
                        <CalculatingCard>
                            <Heading>Entry Starts</Heading>
                            <Text fontSize="32px" fontWeight="bold">~{countdown}</Text>
                        </CalculatingCard>
                    </GladiatorBattle >
                </CardInner >
            </NewCard >
        </>)
}

export default LaterBattle
