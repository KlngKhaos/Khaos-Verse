import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Image, Text } from '@pancakeswap/uikit'
import PageSection from 'components/PageSection'
import useTheme from 'hooks/useTheme'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import {
  useFetchPublicPoolsData,
  usePools,
  useFetchUserPools,
  useFetchCakeVault,
  useCakeVault,
} from 'state/pools/hooks'
import { usePollFarmsPublicData } from 'state/farms/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { DeserializedPool } from 'state/types'
import { useUserPoolStakedOnly, useUserPoolsViewMode } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import Loading from 'components/Loading'
import PoolCard from './components/PoolCard'
import CakeVaultCard from './components/CakeVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
import BountyCard from './components/BountyCard'
import HelpButton from './components/HelpButton'
import PoolsTable from './components/PoolsTable/PoolsTable'
import { getAprData, getCakeVaultEarnings } from './helpers'
import FilterCard from './components/FilterCard'
import StakeGladiatorCard from './components/StakeGladiatorCard'
import useStore from '../PoolTour3D/store'
import { useGladiatorNft } from 'hooks/useContract'

const CardLayout = styled(FlexLayout)`
  justify-content: start;
`

const PoolControls = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

const FilterContainer = styled(Flex)`
  width: 100%;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const StyledHeader = styled(PageHeader)`
  max-height: max-content;
  margin-bottom: -40px;
  padding-bottom: 40px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: 600px;
  }
`

const Left = styled(Flex)`
  flex-direction: column;
  flex: 1;
`

const Right = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex: 0.5;
  & img {
    height: 50%;
    width: 50%;
    max-height: 330px;
    border-radius: 24px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & img {
      height: auto;
      width: auto;
    }
  }
`
const NewPageSection = styled(PageSection)`
  background-image: url(/images/decorations/pools-bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
`

const NUMBER_OF_POOLS_VISIBLE = 12

const ArenaPools: React.FC = () => {


  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools()
  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly()
  const [viewMode, setViewMode] = useUserPoolsViewMode()
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [searchQuery, setSearchQuery] = useState('')
  console.log("queryyyyyyyyy", searchQuery)

  const [sortOption, setSortOption] = useState('hot')
  const chosenPoolsLength = useRef(0)
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
    const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }
    return [cakeAutoVault, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  usePollFarmsPublicData()
  useFetchCakeVault()
  useFetchPublicPoolsData()
  useFetchUserPools(account)

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfPoolsVisible((poolsCurrentlyVisible) => {
        if (poolsCurrentlyVisible <= chosenPoolsLength.current) {
          return poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE
        }
        return poolsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("room filter onchange")
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: DeserializedPool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: DeserializedPool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: DeserializedPool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                account,
                cakeAtLastUserAction,
                userShares,
                pricePerFullShare,
                pool.earningTokenPrice,
              ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: DeserializedPool) => {
            let totalStaked = Number.NaN
            if (pool.isAutoVault) {
              if (totalCakeInVault.isFinite()) {
                totalStaked = +formatUnits(
                  ethers.BigNumber.from(totalCakeInVault.toString()),
                  pool.stakingToken.decimals,
                )
              }
            } else if (pool.sousId === 0) {
              if (pool.totalStaked?.isFinite() && totalCakeInVault.isFinite()) {
                const manualCakeTotalMinusAutoVault = ethers.BigNumber.from(pool.totalStaked.toString()).sub(
                  totalCakeInVault.toString(),
                )
                totalStaked = +formatUnits(manualCakeTotalMinusAutoVault, pool.stakingToken.decimals)
              }
            } else if (pool.totalStaked?.isFinite()) {
              totalStaked = +formatUnits(ethers.BigNumber.from(pool.totalStaked.toString()), pool.stakingToken.decimals)
            }
            return Number.isFinite(totalStaked) ? totalStaked : 0
          },
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  // const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log("hiiiiiiiiiiiiiiiiiiiii");
  //   setSearchQuery(event.target.value)
  // }

  let chosenPools
  if (showFinishedPools) {
    chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
  } else {
    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
  }
  console.log("modelsToDisplayWithAPR",chosenPools)

  if (searchQuery) {
    console.log("searchQuery",searchQuery)
    const lowercaseQuery = latinise(searchQuery.toLowerCase())
    console.log("lowercaseQuery", lowercaseQuery)
    chosenPools = chosenPools.filter((pool) => {
      return latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery)
    })
  }


  chosenPools = sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  chosenPoolsLength.current = chosenPools.length
  console.log("choosen",chosenPools)
const indexx = chosenPools.map((pool, index) => index)
  const cardLayout = (
    <CardLayout>
      {chosenPools.map((pool, index) =>
        pool.isAutoVault ? (
          <CakeVaultCard key="auto-dena" pool={pool} showStakedOnly={stakedOnly} index={index} />
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} index={index}  />
        ),
      )}
    </CardLayout>
  )

  interface tokenIdI {
    room1: any
    room2: any
    room3: any
  }
  const initialState: tokenIdI = {
    room1: [],
    room2: [],
    room3: []
  }
  const [tokenId, setTokenId] = useState<tokenIdI>(initialState)
  const { currentStatics } = useStore((state) => state)
  const gladiatorNftContract = useGladiatorNft()
  // console.log('withdrawal', gladiatorNftContract)
// console.log("tokenIdtokenIdtokenId", tokenId, indexx);
  const withdrawalStake = async () => {
    // console.log('store', currentStatics)

    const data = await gladiatorNftContract.getUserGladiator(account)
    // console.log('dataaaa', data)
    for (let i = 0; i < data.length; i++) {
      console.log('FUNCTION WORKING')
      const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
      const claim = userInfo.spot
      console.log('USER INFO===>', userInfo)
      const tokenIdCopy = {...tokenId}
      if(claim === "room1"){
        tokenIdCopy.room1.push(parseInt(data[i]._hex.toString(), 16))
      }
      if(claim === "room2"){
        tokenIdCopy.room2.push(parseInt(data[i]._hex.toString(), 16))
      }
      if(claim === "room3"){
        tokenIdCopy.room3.push(parseInt(data[i]._hex.toString(), 16))
      }
      setTokenId(tokenIdCopy)

  }

}

//   useEffect(()=>{
//     console.log('useeffffffffffffffffff')
// withdrawalStake()
//   },[gladiatorNftContract, account])




  const tableLayout = <PoolsTable pools={chosenPools} account={account} userDataLoaded={userDataLoaded} />
  return (
    <>
      {/* <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Syrup Pools')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Just stake some tokens to earn.')}
            </Heading>
            <Heading scale="md" color="text">
              {t('High APR, low risk.')}
            </Heading>
          </Flex>
          <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            <HelpButton />
            <BountyCard />
          </Flex>
        </Flex>
      </PageHeader> */}
      <StyledHeader>
        <Flex flexDirection={['column-reverse', null, 'row']}>
          <Left>
            <Heading as="h1" scale="xxl" my="24px">
              {t('Room Pools')}
            </Heading>
            <Text color="textSubtle" mb="24px">
              {t('Browse through our waiting room pools and find one that your Gladiator can benefit the most and start earning.')}
            </Text>
            <Text color="textSubtle">{t('Our waiting room area works as pools where you’ll stake your tokens and receive Denas.')}</Text>
            <Text color="textSubtle" mb="24px">
              {t(
                'Denarius (DENA) is our ecosystem’s token! Earn as much as you can so you can enjoy our platform the most, and obviously monetize it.',
              )}
            </Text>
            {/* <Link external href={FORM_ADDRESS}>
              <Button>
                <Text color="white" bold fontSize="16px" mr="4px">
                  {t('Apply for a Farm/Pool')}
                </Text>
              </Button>
            </Link> */}
          </Left>
          <Right>
            <StakeGladiatorCard />
          </Right>
        </Flex>
      </StyledHeader>
      <NewPageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={theme.colors.background}
        p="24px 0"
        index={2}
        hasCurvedDivider={false}
        dividerPosition="top"
      >
        <FilterContainer flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" width="100%" minWidth="288px">
            <FilterCard
              handleChangeQuery={handleChangeSearchQuery}
              handleSortOptionChange={handleSortOptionChange}
            // freshwaterOnly={freshwaterOnly}
            // saltwaterOnly={saltwaterOnly}
            // setFreshwaterOnly={setFreshwaterOnly}
            // setSaltwaterOnly={setSaltwaterOnly}
            />
          </Flex>

          {cardLayout}
          {account && !userDataLoaded && stakedOnly && (
            <Flex justifyContent="center" mb="4px">
              <Loading />
            </Flex>
          )}
        </FilterContainer>
        <div ref={observerRef} />
        <StyledImage src="/images/decorations/3dpan.png" alt="Gladiators illustration" width={175} height={226} />
      </NewPageSection>
      {/* <Page>
        <PoolControls>
          <PoolTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedPools={hasStakeInFinishedPools}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <FilterContainer>
            <LabelWrapper>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Hot'),
                      value: 'hot',
                    },
                    {
                      label: t('APR'),
                      value: 'apr',
                    },
                    {
                      label: t('Earned'),
                      value: 'earned',
                    },
                    {
                      label: t('Total staked'),
                      value: 'totalStaked',
                    },
                  ]}
                  onOptionChange={handleSortOptionChange}
                />
              </ControlStretch>
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Search')}
              </Text>
              <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
            </LabelWrapper>
          </FilterContainer>
        </PoolControls>
        {showFinishedPools && (
          <Text fontSize="20px" color="failure" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center" mb="4px">
            <Loading />
          </Flex>
        )}
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={observerRef} />
        <Image
          mx="auto"
          mt="12px"
          src="/images/decorations/3d-syrup-bunnies.png"
          alt="Pancake illustration"
          width={192}
          height={184.5}
        />
      </Page> */}
    </>
  )
}

export default ArenaPools
