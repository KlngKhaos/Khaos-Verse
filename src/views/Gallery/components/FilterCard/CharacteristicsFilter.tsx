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
type ValueI = "ability" | "weapon" | "attributes" | "characteristics" | "rarity" ;

interface CharacteristicsFilterProps {
  handleChangeCharacteristics?: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearFilterStates: (value: ValueI) => void

}

const CharacteristicsFilter: React.FC<CharacteristicsFilterProps> = ({  handleChangeCharacteristics, clearFilterStates}) => {
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
                  name="minWeight"
                  placeholder="Min"
                onChange={e =>  handleChangeCharacteristics(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="number"
                  name="maxWeight"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                onChange={e =>  handleChangeCharacteristics(e)}
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
                  name="minSize"
                  placeholder="Min"
                onChange={e =>  handleChangeCharacteristics(e)}
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
                  name="maxSize"
                  placeholder="Max"
                onChange={e =>  handleChangeCharacteristics(e)}
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
                  name="minSupply"
                  placeholder="Min"
                onChange={e =>  handleChangeCharacteristics(e)}
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
                  name="maxSupply"
                  placeholder="Max"
                onChange={e =>  handleChangeCharacteristics(e)}
                />
              </Flex>
            </LabelWrapper>

          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel expanded={isExpanded} onClick={() =>{ 
              if(isExpanded){
                clearFilterStates("characteristics")
              }
          setIsExpanded((prev) => !prev)}}>
          <ExpandableText>
            {isExpanded ? t('Hide Characteristics') : t('Characteristics')}
          </ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default CharacteristicsFilter
