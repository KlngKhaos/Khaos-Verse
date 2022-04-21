import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Heading, Skeleton } from '@pancakeswap/uikit'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getBalanceNumber, formatLocalisedCompactNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import tokens from 'config/constants/tokens'


const StyledColumn = styled(Flex) <{ noMobileBorder?: boolean }>`
  flex-direction: column;
  ${({ noMobileBorder, theme }) =>
        noMobileBorder
            ? `${theme.mediaQueries.md} {
           padding: 0 16px;
         }
       `
            : `padding: 0 8px;
         ${theme.mediaQueries.sm} {
           padding: 0 16px;
         }
       `}
`

const Grid = styled.div`
  display: grid;
  grid-gap: 16px 8px;
  margin-top: 24px;
  grid-template-columns: repeat(2, auto);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 16px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 32px;
    grid-template-columns: repeat(4, auto);
  }
`
const RightTokenData = styled.div`
`
const NewFlex = styled(Flex)`
  margin-left: 128px;
  @media (min-width: 320px) and (max-width: 425px) {
    margin-left: 102px;
}
`

const emissionsPerBlock = 15

const NrtDenaData = () => {
    const { t } = useTranslation()
    const totalSupply = useTotalSupply()
    const burnedBalance = getBalanceNumber(useBurnedBalance(tokens.cake.address))
    const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
    const cakePriceBusd = usePriceCakeBusd()
    const mcap = cakePriceBusd.times(cakeSupply)
    const mcapString = formatLocalisedCompactNumber(mcap.toNumber())



    return (
        <RightTokenData>
            <Heading color="secondary" scale="xl">{t('NRT Token')}</Heading>
            <Grid>
                <Flex flexDirection="column">
                    {cakeSupply ? (
                        <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={cakeSupply} />
                    ) : (
                        <Skeleton height={24} width={126} my="4px" />
                    )}
                    <Text color="textSubtle">{t('Total supply')}</Text>
                </Flex>
                <NewFlex flexDirection="column">
                    {burnedBalance ? (
                        <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={burnedBalance} />
                    ) : (
                        <Skeleton height={24} width={126} my="4px" />
                    )}
                    <Text color="textSubtle">{t('Burned to date')}</Text>
                </NewFlex>
            </Grid>
            <Grid>
                <Flex flexDirection="column">
                    {mcap?.gt(0) && mcapString ? (
                        <Heading scale="lg">{t('$%marketCap%', { marketCap: mcapString })}</Heading>
                    ) : (
                        <Skeleton height={24} width={126} my="4px" />
                    )}
                    <Text color="textSubtle">{t('Market cap')}</Text>
                </Flex>
                <NewFlex flexDirection="column">
                    <Heading scale="lg">{t('%cakeEmissions%/block', { cakeEmissions: emissionsPerBlock })}</Heading>
                    <Text color="textSubtle">{t('Current emissions')}</Text>
                </NewFlex>
            </Grid>

            <Heading color="secondary" scale="xl" mt="5">{t('DENA Token')}</Heading>
            <Grid>
                <Flex flexDirection="column">
                    {cakeSupply ? (
                        <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={cakeSupply} />
                    ) : (
                        <Skeleton height={24} width={126} my="4px" />
                    )}
                    <Text color="textSubtle">{t('Total supply')}</Text>
                </Flex>
                <NewFlex flexDirection="column">
                    {burnedBalance ? (
                        <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={burnedBalance} />
                    ) : (
                        <Skeleton height={24} width={126} my="4px" />
                    )}
                    <Text color="textSubtle">{t('Burned to date')}</Text>
                </NewFlex>
            </Grid>
            <Grid>
                <Flex flexDirection="column">
                    {mcap?.gt(0) && mcapString ? (
                        <Heading scale="lg">{t('$%marketCap%', { marketCap: mcapString })}</Heading>
                    ) : (
                        <Skeleton height={24} width={126} my="4px" />
                    )}
                    <Text color="textSubtle">{t('Market cap')}</Text>
                </Flex>
                <NewFlex flexDirection="column">
                    <Heading scale="lg">{t('%cakeEmissions%/block', { cakeEmissions: emissionsPerBlock })}</Heading>
                    <Text color="textSubtle">{t('Current emissions')}</Text>
                </NewFlex>
            </Grid>
        </RightTokenData>
    )
}

export default NrtDenaData