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

interface AttributesFilterProps {
  handleChangeAttributes: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearFilterStates: (value: ValueI) => void
}

const AttributesFilter: React.FC<AttributesFilterProps> = ({ handleChangeAttributes, clearFilterStates }) => {
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
                  <img src="/images/battles/icons/strength.png" alt="strength" />
                </IconImage>
                <Text textTransform="uppercase">{t('Strength')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minStrength"
                  onChange={(e) => handleChangeAttributes(e)}
                />

                {/* <input type="number" onChange={(e) => handleChangeAttributes(e)} 
                  ref={minInputRef}
                  /> */}

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
                  name="maxStrength"
                  onChange={(e) => handleChangeAttributes(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/endurance.png" alt="Endurance" />
                </IconImage>
                <Text textTransform="uppercase">{t('Endurance')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minEndurance"
                  onChange={(e) => handleChangeAttributes(e)}
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
                  name="maxEndurance"
                  onChange={(e) => handleChangeAttributes(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/agility.png" alt="Agility" />
                </IconImage>
                <Text textTransform="uppercase">{t('Agility')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minAgility"
                  onChange={(e) => handleChangeAttributes(e)}
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
                  name="maxAgility"
                  onChange={(e) => handleChangeAttributes(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/precision.png" alt="Precision" />
                </IconImage>
                <Text textTransform="uppercase">{t('Precision')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minPrecision"
                  onChange={(e) => handleChangeAttributes(e)}
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
                  name="maxPrecision"
                  onChange={(e) => handleChangeAttributes(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/intelligence.png" alt="Intelligance" />
                </IconImage>
                <Text textTransform="uppercase">{t('Intelligance')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minIntelligence"
                  onChange={(e) => handleChangeAttributes(e)}
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
                  name="maxIntelligence"
                  onChange={(e) => handleChangeAttributes(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/willpower.png" alt="Willpower" />
                </IconImage>
                <Text textTransform="uppercase">{t('Willpower')}</Text>
              </LabelText>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minWillPower"
                  onChange={(e) => handleChangeAttributes(e)}
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
                  name="maxWillPower"
                  onChange={(e) => handleChangeAttributes(e)}
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
              clearFilterStates('attributes')
            }
            setIsExpanded((prev) => !prev)
          }}
        >
          <ExpandableText>{isExpanded ? t('Hide Attributes') : t('Attributes')}</ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default AttributesFilter
