import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, CardFooter, ExpandableLabel, Checkbox } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus } from 'config/constants/types'
// import WhitelistedBiddersButton from '../WhitelistedBiddersButton'

const FooterInner = styled(Box)`
  background-color: #000000;
`
const ExpandableText = styled.div `
  color:  #D9AB3A;
`

interface RarityFilterProps {
  handleRarityFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RarityFilter: React.FC<RarityFilterProps> = ({ handleRarityFilter}) => {
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
                // checked={isRememberChecked}
                // onChange={() => setIsRememberChecked(!isRememberChecked)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Common')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="Uncommon"
                type="checkbox"
                // checked={isRememberChecked}
                // onChange={() => setIsRememberChecked(!isRememberChecked)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Uncommon')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="Rare"
                type="checkbox"
                // checked={isRememberChecked}
                // onChange={() => setIsRememberChecked(!isRememberChecked)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Rare')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="SuperRare"
                type="checkbox"
                // checked={isRememberChecked}
                // onChange={() => setIsRememberChecked(!isRememberChecked)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Super Rare')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="Deep"
                type="checkbox"
                // checked={isRememberChecked}
                // onChange={() => setIsRememberChecked(!isRememberChecked)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Deep')}
              </Text>
            </Flex>
            <Flex width="100%" pt="8px" px="8px">
              <Checkbox
                name="SuperDeep"
                type="checkbox"
                // checked={isRememberChecked}
                // onChange={() => setIsRememberChecked(!isRememberChecked)}
                scale="sm"
              />
              <Text ml="10px" mt="5px" color="textSubtle" style={{ userSelect: 'none' }}>
                {t('Super Deep')}
              </Text>
            </Flex>
          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
          <ExpandableText>
            {isExpanded ? t('Hide Rarity') : t('Rarity')}
          </ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default RarityFilter
