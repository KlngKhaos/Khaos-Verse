import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Input, Flex, Box, CardFooter, ExpandableLabel } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus } from 'config/constants/types'
import Select, { OptionProps } from 'components/Select/Select'
// import WhitelistedBiddersButton from '../WhitelistedBiddersButton'

const FooterInner = styled(Box)`
  background-color: #000000;
`
const ExpandableText = styled.div `
  color:  #D9AB3A;
`

interface AprApyFilterProps {
  handleAprApyFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AprApyFilter: React.FC<AprApyFilterProps> = ({ handleAprApyFilter}) => {
  const [isExpanded, setIsExpanded] = useState(true)
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
            <Flex width="100%" pt="8px" px="8px">
              <Select
                options={[
                  {
                    label: t('APY (Compound)'),
                    value: 'apy',
                  },
                  {
                    label: t('APR'),
                    value: 'apr',
                  }
                ]}
              // onOptionChange={handleSortOptionChange}
              />
            </Flex>
            <Flex justifyContent="space-between" width="100%" pt="8px" px="8px">
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
          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
          <ExpandableText>
            {isExpanded ? t('Hide APY/APR') : t('APY/APR')}
          </ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default AprApyFilter
