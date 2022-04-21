import React from 'react'
import {
  Box,
  Button,
  CloseIcon
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import useStore from '../../../store';

const StyledHeader = styled(Box)`
//   background: ${({ theme }) => theme.colors.gradients.bubblegum};
  flex: none;
  padding: 0px;
  height: calc(100vh - 80px);
  width: 384px;
  position: relative;
`

const CloseButtonWrapper = styled.div`
    position: absolute;
    right: 10px;
`

const TabsTwo = styled.div`
  padding: 5px 10px;
  background-image: url(/images/battles/buttons-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  color: #552216;
  width: 100px;
  height: 33px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
const GladiatorStatistics = styled.div`
  background-image: url(/images/battles/right-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 20px;
  height: 100%;
`
const StatsTabs = styled.div`
  width: 100%;
  display: flex;
  flex-direction:row;
  justify-content: center;
  padding: 8px 0px;
  border: 1px solid transparent;
  color: #7D91AD;
   
  &:hover {
    cursor: pointer;
    border: 1px solid #7D91AD;

  }
`
const StatisticsScrollable = styled.div`
  overflow-y: scroll;
  height: 775px;
  margin-top: 20px;
  &::-webkit-scrollbar {
    background: : #7D91AD !important;
  }
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
`
const StatisticsScrollableRight = styled.div`
  overflow-y: scroll;
  height: 766px;
  margin-top: 20px;
  &::-webkit-scrollbar {
    background: : #7D91AD !important;
  }
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
`
const PointsHeading = styled.div`
  padding: 6px 0px;
  color: #c09451;
   
  font-weight: bold;
  font-size: 18px;
  border-bottom: 2px solid #7D91AD;
  border-radius: 4px;
  padding-left: 10px;
`
const StatsTable = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 12px;
`
const Left = styled.div`
  width: 45%;
`
const Right = styled.div`
  width: 45%;
`
const TableStatsHeading = styled.div`
  color: #7D91AD;
  padding-bottom: 8px;
  border-bottom: 1px solid #7D91AD;
  font-weight: bold;
  font-size: 16px;
  padding-top: 12px;
`
const TableData = styled.div`
  padding: 0px 8px;
`
const TableDataTwo = styled.div`
  padding: 0px 8px;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #7D91AD;
`
const Attribute = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Property = styled.div`
  display: flex;
  align-items: center;
  color: #7D91AD;
  font-size: 16px;
  padding: 10px 0px;
  text-align: start;
`
const Value = styled.div`
  color: #c09451;
  font-size: 16px;
`
const ControlButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`
const Jackpot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 28px;
   
`
const Apex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 28px;
   
  margin-top: 120px
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
const ApexToken = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7D91AD;
  font-size: 18px;
   
  margin-top: 10px;
`
const ApexValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7D91AD;
  font-size: 32px;
   
  font-weight: bold;
  margin-top: 15px
`

const TokenImage = styled.img`
  width: 32px;
  margin-left: 10px
`
const BetAmount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  color: #7D91AD;
  font-size: 32px;
   
  font-weight: bold;
`
const BetButton = styled.div`
  padding: 8px 16px;
  font-size: 32px;
   
  background-color: #c09451;
  border-radius: 8px;
  margin: 0px 12px;
  color: #552216;
  &:hover {
    cursor: pointer;
  }
`
const BetButtonGo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GoButton = styled.div`
  width: 144px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 26px;
  font-size: 32px;
   
  background-color: #c09451;
  border-radius: 8px;
  margin: 20px 12px 0px;
  color: #552216;
  &:hover {
    cursor: pointer;
  }
`
const IconImage = styled.img`
  width: 24px;
  margin-right: 8px;
`

export const Statics = () => {
  const { t } = useTranslation()

  const history = useHistory()
  const updateShowStatics = useStore(state => state.updateShowStatics);
  const updateCurrentStatics = useStore(state => state.updateCurrentStatics);
  const { currentStatics } = useStore(state => state)

  const handleClick = () => {
    updateShowStatics(false);
    updateCurrentStatics(null);
  }


  return (
    <StyledHeader>
      <CloseButtonWrapper>
        <Button onClick={handleClick} variant="text" endIcon={<CloseIcon color="#ffffff" />} px="0"></Button>
      </CloseButtonWrapper>
      <GladiatorStatistics>
        <StatsTabs>{t('STATISTICS')}</StatsTabs>
        <PointsHeading>
          Champion
        </PointsHeading>
        <StatisticsScrollable>
          <StatsTable>
            <Left>
              <TableStatsHeading>
                Attributes
              </TableStatsHeading>
              <TableData>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/strength.png" />
                    Strength
                  </Property>
                  <Value>
                    {currentStatics?.attributes?.strength}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/endurance.png" />
                    Endurance
                  </Property>
                  <Value>
                    {currentStatics?.attributes?.endurance}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/agility.png" />
                    Agility
                  </Property>
                  <Value>
                    {currentStatics?.attributes?.agility}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/precision.png" />
                    Precision
                  </Property>
                  <Value>
                    {currentStatics?.attributes?.precision}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/intelligence.png" />
                    Intelligance
                  </Property>
                  <Value>
                    {currentStatics?.attributes?.intelligance}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/willpower.png" />
                    Willpower
                  </Property>
                  <Value>
                    {currentStatics?.attributes?.willpower}
                  </Value>
                </Attribute>
              </TableData>
              <TableStatsHeading>
                Weapon Mastery
              </TableStatsHeading>
              <TableData>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/one-handed.png" />
                    One-hand
                  </Property>
                  <Value>
                    {currentStatics?.weapons?.oneHand}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/two-handed.png" />
                    Two-hand
                  </Property>
                  <Value>
                    {currentStatics?.weapons?.twoHand}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/shield.png" />
                    Shield
                  </Property>
                  <Value>
                    {currentStatics?.weapons?.shield}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/ranged.png" />
                    Ranged
                  </Property>
                  <Value>
                    {currentStatics?.weapons?.ranged}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/dual.png" />
                    Dual
                  </Property>
                  <Value>
                    {currentStatics?.weapons?.dual}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/polearms.png" />
                    Polearms
                  </Property>
                  <Value>
                    {currentStatics?.weapons?.polearms}
                  </Value>
                </Attribute>
              </TableData>
              <TableStatsHeading>
                Abilities
              </TableStatsHeading>
              <TableData>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/leadership.png" />
                    Leadership
                  </Property>
                  <Value>
                    {currentStatics?.abilities?.leadership}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/coach.png" />
                    Coach
                  </Property>
                  <Value>
                    {currentStatics?.abilities?.coach}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/cook.png" />
                    Cook
                  </Property>
                  <Value>
                    {currentStatics?.abilities?.cook}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/medical.png" />
                    Medical
                  </Property>
                  <Value>
                    {currentStatics?.abilities?.medical}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/smith.png" />
                    Smith
                  </Property>
                  <Value>
                    {currentStatics?.abilities?.smith}
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>
                    <IconImage src="/images/battles/icons/torture.png" />
                    Torture
                  </Property>
                  <Value>
                    {currentStatics?.abilities?.torture}
                  </Value>
                </Attribute>
              </TableData>
            </Left>
            <Right>
              <TableStatsHeading>
                Statistics
              </TableStatsHeading>
              <TableData>
                <Attribute>
                  <Property>Experience</Property>
                  <Value>
                    187,355
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>Stamina</Property>
                  <Value>
                    89/100
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>Level</Property>
                  <Value>
                    5
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>Rarity</Property>
                  <Value>
                    5
                  </Value>
                </Attribute>
              </TableData>
              <TableDataTwo>
                <Attribute>
                  <Property>Battles Played</Property>
                  <Value>
                    900
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>Attack Wins</Property>
                  <Value>
                    433/500
                  </Value>
                </Attribute>
                <Attribute>
                  <Property>Defense Wins</Property>
                  <Value>
                    387/500
                  </Value>
                </Attribute>
              </TableDataTwo>
            </Right>
          </StatsTable>
        </StatisticsScrollable>
      </GladiatorStatistics>
    </StyledHeader>
  )
}

export default Statics;