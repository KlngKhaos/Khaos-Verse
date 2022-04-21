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

const ExpandableText = styled.div`
  color: #d9ab3a;
`

interface PriceFilterProps {
  handlePriceFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMinNRTsQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMaxNRTsQuery?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCurrency?:(e:string)=>void
}

const PriceFilter: React.FC<PriceFilterProps> = ({ handleMinNRTsQuery, handleMaxNRTsQuery,handleCurrency }) => {
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
                    label: t('NFT Royal Token (NRT)'),
                    value: 'ow',
                  },
                  {
                    label: t('United States Dollar (USD)'),
                    value: 'usd',
                  },

                  // {
                  // label: t('Denarius (DENA)'),
                  // value: 'aqua',
                  // },
                  // {
                  //   label: t('Earned'),
                  //   value: 'earned',
                  // },
                  // {
                  // label: t('Etherium (ETH)'),
                  // value: 'eth',
                  // },
                ]}
                onOptionChange={(e) => handleCurrency(e.value)}
              />
            </Flex>
            <Flex justifyContent="space-between" width="100%" pt="8px" px="8px">
              <Input
                ref={minInputRef}
                type="text"
                inputMode="decimal"
                pattern="\d*"
                scale="sm"
                placeholder="Min"
                // name="minNRT"
                onChange={(e) => {
                  handleMinNRTsQuery(e)
                }}
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
                onChange={(e) => handleMaxNRTsQuery(e)}
              />
            </Flex>
          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
          <ExpandableText>{isExpanded ? t('Hide Price') : t('Price')}</ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default PriceFilter
