import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, CardFooter, ExpandableLabel, Checkbox } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus } from 'config/constants/types'
// import WhitelistedBiddersButton from '../WhitelistedBiddersButton'

const FooterInner = styled(Box)`
  background-color: #000000;
`

const ExpandableText = styled.div`
  color: #d9ab3a;
`
interface RarityI {
  1: Boolean
  2: Boolean
  3: Boolean
  4: Boolean
  5: Boolean
  6: Boolean
}
type ValueI = 'ability' | 'weapon' | 'attributes' | 'characteristics' | 'rarity'

interface RarityFilterProps {
  handleChangeRarity: (e: React.ChangeEvent<HTMLInputElement>) => void
  rarity: RarityI
  clearFilterStates: (value: ValueI) => void
}

const RarityFilter: React.FC<RarityFilterProps> = ({ handleChangeRarity, rarity, clearFilterStates }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()
  // const { topLeaderboard, status } = auction

  // const isLiveOrPendingAuction = status === AuctionStatus.Pending || status === AuctionStatus.Open
  return (
    <CardFooter p="0">
      {isExpanded && (
        <FooterInner>
          <Flex p="16px" flexDirection="column">
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="Common"
                type="checkbox"
                value="1"
                checked={rarity[1] ? true : false}
                onChange={(e) => handleChangeRarity(e)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Recruit')}
              </Text>
              <Text ml="83px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('( level 1 )')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="Uncommon"
                type="checkbox"
                value="2"
                checked={rarity[2] ? true : false}
                onChange={(e) => handleChangeRarity(e)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('False Gladiator')}
              </Text>
              <Text ml="25px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('( level 2 )')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="Rare"
                type="checkbox"
                value="3"
                checked={rarity[3] ? true : false}
                onChange={(e) => handleChangeRarity(e)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Gladiator')}
              </Text>
              <Text ml="66px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('( level 3 )')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="SuperRare"
                type="checkbox"
                value="4"
                checked={rarity[4] ? true : false}
                onChange={(e) => handleChangeRarity(e)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Veteran Gladiator')}
              </Text>
              <Text ml="6px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('( level 4 )')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="Deep"
                type="checkbox"
                value="5"
                checked={rarity[5] ? true : false}
                onChange={(e) => handleChangeRarity(e)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Champion')}
              </Text>
              <Text ml="60px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('( level 5 )')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="SuperDeep"
                type="checkbox"
                value="6"
                checked={rarity[6] ? true : false}
                onChange={(e) => handleChangeRarity(e)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Doctore')}
              </Text>
              <Text ml="76px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('( level 6 )')}
              </Text>
            </Flex>
          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel
          expanded={isExpanded}
          onClick={() => {
            if (isExpanded) {
              clearFilterStates('rarity')
            }
            setIsExpanded((prev) => !prev)
          }}
        >
          <ExpandableText>{isExpanded ? t('Hide Rarity') : t('Rarity')}</ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default RarityFilter
