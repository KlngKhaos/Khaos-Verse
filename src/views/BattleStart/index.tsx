import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Image, Text } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import PageSection from 'components/PageSection'

const BackgroundImage = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 925px;
  background-image: url(/images/decorations/BG.png);
  background-repeat: no-repeat;
  background-size: cover;
`
const GladiatorBattle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
//   align-items: center;
  width: 1500px;
`
const GladiatorWar = styled.div`
  width: 35%;
  padding-left: 36px;
  padding-right: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  background-image: url(/images/battles/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 600px;
`
const GladiatorRight = styled.div`
  margin-top: 30px;
  padding-left: 24px;
  & img {
    height: 600px;
  }
`
const GladiatorLeft = styled.div`
  margin-top: 30px;
  padding-left: 24px;
  & img {
    height: 600px;
  }
`
const Jackpot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 28px;
`
const JackpotValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7D91AD;
  font-size: 32px;
  font-weight: bold;
  margin-top: 10px
`
const TokenImage = styled.img`
  width: 32px;
  margin-left: 10px
`
const StartTime = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`
const Time = styled.div`
  color: #7D91AD;
  font-size: 18px;
  font-weight: bold;
  margin-left: 30px;
`
const GladiatorsStats = styled.div`
  margin-top: 80px;
`
const Attribute = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 30px;
  font-weight: bold;
  width: 40%;
  text-align: center;
`
const Value = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7D91AD;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  &:first-child {
      margin-top: 0;
  }
`
const GladiatorAttributes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  margin-top: 10px;
`
const RightValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  color: #7D91AD;
  font-size: 24px;
  width: 30%;
`
const LeftValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  color: #7D91AD;
  font-size: 24px;
  width: 30%;
`
const Gladiators = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 90px;
`
const OpponentGladiator = styled.div`
  color: #7D91AD;
  font-size: 26px;
  font-weight: bold;
  width: 30%;
  white-space: nowrap;
`
const VsImage = styled.div`
  width: 50px;
`
const MyGladiator = styled.div`
  color: #7D91AD;
  font-size: 26px;
  font-weight: bold;
  width: 30%;
  display: flex;
  justify-content: end;
  white-space: nowrap;
`
const GladiatorArena = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`
const ArenaHeading = styled.div`
  color: #7D91AD;
  font-size: 32px;
  font-weight: bold;
`
const ArenaImage = styled.div`
  width: 700px;
  margin-top: 10px;  
`


const BattlesStart: React.FC = () => {
    const location = useLocation()
    const { t } = useTranslation()
    const { theme } = useTheme()

    return (
        <>
            <BackgroundImage>
                <GladiatorBattle>
                    <GladiatorLeft>
                        <img src="/images/battles/left.png" alt="Gladiator" />
                    </GladiatorLeft>
                    <GladiatorWar>
                        <Jackpot>
                            {t('Jackpot')}
                        </Jackpot>
                        <JackpotValue>
                            1,000,000
                            <TokenImage src="/images/tokens/dena.svg" alt="DENA TOKEN" />
                        </JackpotValue>
                        <StartTime>
                            Start in
                            <Time>99</Time>
                        </StartTime>
                        <GladiatorsStats>
                            <GladiatorAttributes>
                                <LeftValues>2-3</LeftValues>
                                <Attribute>{t('Records')}</Attribute>
                                <RightValues>2-3</RightValues>
                            </GladiatorAttributes>
                            <GladiatorAttributes>
                                <LeftValues>Unknown</LeftValues>
                                <Attribute>{t('Element')}</Attribute>
                                <RightValues>Unknown</RightValues>
                            </GladiatorAttributes>
                            <GladiatorAttributes>
                                <LeftValues>Unknown</LeftValues>
                                <Attribute>{t('Race')}</Attribute>
                                <RightValues>Undead</RightValues>
                            </GladiatorAttributes>
                            <GladiatorAttributes>
                                <LeftValues>General</LeftValues>
                                <Attribute>{t('Class')}</Attribute>
                                <RightValues>Samurai</RightValues>
                            </GladiatorAttributes>
                            <GladiatorAttributes>
                                <LeftValues>SPQR</LeftValues>
                                <Attribute>{t('Origin')}</Attribute>
                                <RightValues>Empire of D</RightValues>
                            </GladiatorAttributes>
                        </GladiatorsStats>
                        <Gladiators>
                            <OpponentGladiator>
                                {t('Fantasy Warrior')}
                            </OpponentGladiator>
                            <VsImage>
                                <img src="/images/battles/VS.png" alt="VS" />
                            </VsImage>
                            <MyGladiator>
                                {t('Gladiator Aware')}
                            </MyGladiator>
                        </Gladiators>
                    </GladiatorWar>
                    <GladiatorRight>
                        <img src="/images/battles/right.png" alt="Gladiator" />
                    </GladiatorRight>
                </GladiatorBattle>
                <GladiatorArena>
                    <ArenaHeading>{t('The Arena')}</ArenaHeading>
                    <ArenaImage>
                        <img src="/images/gallery/gladiator-arena.png" alt="Arena" />
                        {/* <img src="/images/battles/right.png" alt="Gladiator" /> */}
                    </ArenaImage>
                </GladiatorArena>
            </BackgroundImage>
        </>
    )
}

export default BattlesStart