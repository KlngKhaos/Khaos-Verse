import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Text, Input, Flex, Box, CardFooter, ExpandableLabel } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus } from 'config/constants/types'
// import WhitelistedBiddersButton from '../WhitelistedBiddersButton'

const FooterInner = styled(Box)`
  background-color: #000000;
`
const LabelWrapper = styled.div`
`
const ExpandableText = styled.div `
  color:  #D9AB3A;
`

interface CharacteristicsFilterProps {
  handleCharacteristicsFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CharacteristicsFilter: React.FC<CharacteristicsFilterProps> = ({ handleCharacteristicsFilter}) => {
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
              <Text textTransform="uppercase">{t('Weight')}</Text>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                // onChange={handleExpectedRoiChange}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                // onChange={handleExpectedRoiChange}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Size')}</Text>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                // onChange={handleExpectedRoiChange}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                // onChange={handleExpectedRoiChange}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Supply')}</Text>
              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                // onChange={handleExpectedRoiChange}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                // onChange={handleExpectedRoiChange}
                />
              </Flex>
            </LabelWrapper>

          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
          <ExpandableText>
            {isExpanded ? t('Hide Characteristics') : t('Characteristics')}
          </ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default CharacteristicsFilter
