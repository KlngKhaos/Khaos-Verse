import React from 'react'
import styled from 'styled-components'
import { Text, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useStore from '../PoolTour3D/store'

const StatisticsScrollable = styled.div`
  overflow-y: scroll;
  height: 700px;
  margin-top: 20px;
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
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
  color: #7d91ad;
  padding-bottom: 8px;
  border-bottom: 1px solid #7d91ad;
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
  border-top: 1px solid #7d91ad;
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
  color: #7d91ad;
  font-size: 16px;
  padding: 10px 0px;
`
const Value = styled.div`
  color: #c09451;
  font-size: 16px;
`
const IconImage = styled.img`
  width: 24px;
  margin-right: 8px;
`

const GladiatorStatisticss: React.FC = () => {
    const { t } = useTranslation()
    const { currentStatics } = useStore((state) => state)

    return (
        <>
            <StatisticsScrollable>
                <StatsTable>
                    <Left>
                        <TableStatsHeading>{t('Attributes')}</TableStatsHeading>
                        <TableData>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/strength.png" />
                                    {t('Strength')}
                                </Property>
                                <Value>{currentStatics?.attributes?.strength}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/endurance.png" />
                                    {t('Endurance')}
                                </Property>
                                <Value>{currentStatics?.attributes?.endurance}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/agility.png" />
                                    {t('Agility')}
                                </Property>
                                <Value>{currentStatics?.attributes?.agility}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/precision.png" />
                                    {t('Precision')}
                                </Property>
                                <Value>{currentStatics?.attributes?.precision}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/intelligence.png" />
                                    {t('Intelligance')}
                                </Property>
                                <Value>{currentStatics?.attributes?.intelligance}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/willpower.png" />
                                    {t('Willpower')}
                                </Property>
                                <Value>{currentStatics?.attributes?.willpower}</Value>
                            </Attribute>
                        </TableData>
                        <TableStatsHeading>{t('Weapon Mastery')}</TableStatsHeading>
                        <TableData>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/one-handed.png" />
                                    {t('One-hand')}
                                </Property>
                                <Value>{currentStatics?.weapons?.oneHand}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/two-handed.png" />
                                    {t('Two-hand')}
                                </Property>
                                <Value>{currentStatics?.weapons?.twoHand}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/shield.png" />
                                    {t('Shield')}
                                </Property>
                                <Value>{currentStatics?.weapons?.shield}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/ranged.png" />
                                    {t('Ranged')}
                                </Property>
                                <Value>{currentStatics?.weapons?.ranged}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/dual.png" />
                                    {t('Dual')}
                                </Property>
                                <Value>{currentStatics?.weapons?.dual}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/polearms.png" />
                                    {t('Polearms')}
                                </Property>
                                <Value>{currentStatics?.weapons?.polearms}</Value>
                            </Attribute>
                        </TableData>
                        <TableStatsHeading>{t('Abilities')}</TableStatsHeading>
                        <TableData>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/leadership.png" />
                                    {t('Leadership')}
                                </Property>
                                <Value>{currentStatics?.abilities?.leadership}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/coach.png" />
                                    {t('Coach')}
                                </Property>
                                <Value>{currentStatics?.abilities?.coach}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/cook.png" />
                                    {t('Cook')}
                                </Property>
                                <Value>{currentStatics?.abilities?.cook}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/medical.png" />
                                    {t('Medical')}
                                </Property>
                                <Value>{currentStatics?.abilities?.medical}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/smith.png" />
                                    {t('Smith')}
                                </Property>
                                <Value>{currentStatics?.abilities?.smith}</Value>
                            </Attribute>
                            <Attribute>
                                <Property>
                                    <IconImage src="/images/battles/icons/torture.png" />
                                    {t('Torture')}
                                </Property>
                                <Value>{currentStatics?.abilities?.torture}</Value>
                            </Attribute>
                        </TableData>
                    </Left>
                    <Right>
                        <TableStatsHeading>{t('Statistics')}</TableStatsHeading>
                        <TableData>
                            <Attribute>
                                <Property>{t('Experience')}</Property>
                                <Value>184/196</Value>
                            </Attribute>
                            <Attribute>
                                <Property>{t('Stamina')}</Property>
                                <Value>89/93</Value>
                            </Attribute>
                            <Attribute>
                                <Property>{t('Level')}</Property>
                                <Value>0/60</Value>
                            </Attribute>
                            <Attribute>
                                <Property>{t('Rarity')}</Property>
                                <Value>22-31</Value>
                            </Attribute>
                        </TableData>
                        <TableDataTwo>
                            <Attribute>
                                <Property>{t('Battles Played')}</Property>
                                <Value>900</Value>
                            </Attribute>
                            <Attribute>
                                <Property>{t('Attack Wins')}</Property>
                                <Value>433/500</Value>
                            </Attribute>
                            <Attribute>
                                <Property>{t('Defense Wins')}</Property>
                                <Value>387/500</Value>
                            </Attribute>
                        </TableDataTwo>
                    </Right>
                </StatsTable>
            </StatisticsScrollable>
        </>

    )

}

export default GladiatorStatisticss