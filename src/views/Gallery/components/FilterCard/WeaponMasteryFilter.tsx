import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Text, Input, Flex, Box, CardFooter, ExpandableLabel } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus } from 'config/constants/types'
// import WhitelistedBiddersButton from '../WhitelistedBiddersButton'

const FooterInner = styled(Box)`
  background-color: #000000;
`
const LabelWrapper = styled.div``
const ExpandableText = styled.div`
  color: #d9ab3a;
`
const IconImage = styled.div`
  width: 24px;
  margin-right: 8px;
`
const LabelText = styled.div`
  margin-top: 5px;
  display: flex;
`
type ValueI = 'ability' | 'weapon' | 'attributes' | 'characteristics' | 'rarity'

interface WeaponMasteryFilterProps {
  handleChangeWeapons: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearFilterStates: (value: ValueI) => void
}

const WeaponMasteryFilter: React.FC<WeaponMasteryFilterProps> = ({ handleChangeWeapons, clearFilterStates }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()
  const minInputRef = useRef<HTMLInputElement | null>(null)
  const maxInputRef = useRef<HTMLInputElement | null>(null)
  // const { topLeaderboard, status } = auction

  // const isLiveOrPendingAuction = status === AuctionStatus.Pending || status === AuctionStatus.Open
  return (
    <CardFooter p="0">
      {isExpanded && (
        <FooterInner>
          <Flex p="16px" flexDirection="column">
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/one-handed.png" alt="One-hand" />
                </IconImage>
                <Text textTransform="uppercase">{t('One-hand')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minOneHand"
                  onChange={(e) => handleChangeWeapons(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxOneHand"
                  onChange={(e) => handleChangeWeapons(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/two-handed.png" alt="Two-hand" />
                </IconImage>
                <Text textTransform="uppercase">{t('Two-hand')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minTwoHand"
                  onChange={(e) => handleChangeWeapons(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxTwoHand"
                  onChange={(e) => handleChangeWeapons(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/shield.png" alt="Shield" />
                </IconImage>
                <Text textTransform="uppercase">{t('Shield')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minShield"
                  onChange={(e) => handleChangeWeapons(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxShield"
                  onChange={(e) => handleChangeWeapons(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/ranged.png" alt="Ranged" />
                </IconImage>
                <Text textTransform="uppercase">{t('Ranged')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minRanged"
                  onChange={(e) => handleChangeWeapons(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxRanged"
                  onChange={(e) => handleChangeWeapons(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/dual.png" alt="Dual" />
                </IconImage>
                <Text textTransform="uppercase">{t('Dual')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minDual"
                  onChange={(e) => handleChangeWeapons(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxDual"
                  onChange={(e) => handleChangeWeapons(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/polearms.png" alt="Polearms" />
                </IconImage>
                <Text textTransform="uppercase">{t('Polearms')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minPolearms"
                  onChange={(e) => handleChangeWeapons(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxPolearms"
                  onChange={(e) => handleChangeWeapons(e)}
                />
              </Flex>
            </LabelWrapper>
          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel
          expanded={isExpanded}
          onClick={() => {
            if (isExpanded) {
              clearFilterStates('weapon')
            }
            setIsExpanded((prev) => !prev)
          }}
        >
          <ExpandableText>{isExpanded ? t('Hide Weapon Mastery') : t('Weapon Mastery')}</ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default WeaponMasteryFilter
