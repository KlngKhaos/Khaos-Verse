import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, Button, ArrowForwardIcon, Flex } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import PageSection from 'components/PageSection'
import useTheme from 'hooks/useTheme'
import { usePollFarmsWithUserData, usePriceCakeBusd } from 'state/farms/hooks'
import { useGetGallery } from 'state/gallery/hooks'
import { GalleryNft, NftToken } from 'config/constants/gallery/types'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedFarm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy, union } from 'lodash'
import isArchivedGalleryNft from 'utils/galleryHelpers'
import { latinise } from 'utils/latinise'
import {
  useUserFarmStakedOnly,
  useUserFarmsViewMode,
  useUserGalleryFreshwaterOnly,
  useUserGallerySaltwaterOnly,
} from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import { useCurrentFarmAuction } from 'views/FarmAuction/hooks/useCurrentFarmAuction'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import GalleryModelCard from './components/GalleryModelCard/GalleryModelCard'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema } from './components/types'
import FilterCard from './components/FilterCard'
import { useProfileContract } from 'hooks/useContract'
import { useHistory } from 'react-router-dom'
import { useNrtBusdPrice } from 'hooks/useBUSDPrice'

const FilterContainer = styled(Flex)`
  width: 100%;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
  }
`

const StyledImage = styled.img`
  margin-top: 58px;
  width: 170px;
  height: auto;
`

const MainCharacter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const StyledHeader = styled(PageHeader)`
  max-height: max-content;
  margin-bottom: -85px;
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
    max-height: 325px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & img {
      height: auto;
      width: auto;
    }
  }
`

const GalleryBackground = styled(PageSection)`
  background-image: url(/images/decorations/BG.png);
  background-position: center;
  background-attachment: fixed;
  object-fit: cover;
`
const NewHeading = styled(Heading)`
  color: #d9ab3a;
`
const GallerySearch = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  position: relative;
  top: 250px;
  width: 100%;
  height: 100%;
`

const NUMBER_OF_FARMS_VISIBLE = 12

const Gallery: React.FC = () => {
  const nrtPriceUsd = useNrtBusdPrice()
  const history = useHistory()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { models, isInitialized: userDataLoaded } = useGetGallery()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  //Price States
  const [minNRTs, setMinNRTs] = useState(null)
  const [maxNRTs, setMaxNRTs] = useState(null)
  const [currency, setCurrency] = useState('ow')
  // characteristics states
  const characteristicsInitialState = {
    minWeight: '',
    maxWeight: '',
    minSize: '',
    maxSize: '',
    minSupply: '',
    maxSupply: '',
  }
  const [characteristics, setCharacteristics] = useState(characteristicsInitialState)

  // Attributes states
  interface AttributesI {
    minStrength: Number
    maxStrength: Number
    minEndurance: Number
    maxEndurance: Number
    minAgility: Number
    maxAgility: Number
    minPrecision: Number
    maxPrecision: Number
    minIntelligence: Number
    maxIntelligence: Number
    minWillPower: Number
    maxWillPower: Number
  }
  const attributeInitialState = {
    minStrength: 0,
    maxStrength: 0,
    minEndurance: 0,
    maxEndurance: 0,
    minAgility: 0,
    maxAgility: 0,
    minPrecision: 0,
    maxPrecision: 0,
    minIntelligence: 0,
    maxIntelligence: 0,
    minWillPower: 0,
    maxWillPower: 0,
  }
  const [attributes, setAttributes] = useState<AttributesI>(attributeInitialState)

  // Weapon State
  interface WeaponsI {
    minOneHand: Number
    maxOneHand: Number
    minTwoHand: Number
    maxTwoHand: Number
    minShield: Number
    maxShield: Number
    minRanged: Number
    maxRanged: Number
    minDual: Number
    maxDual: Number
    minPolearms: Number
    maxPolearms: Number
  }
  const weaponsInitialState = {
    minOneHand: 0,
    maxOneHand: 0,
    minTwoHand: 0,
    maxTwoHand: 0,
    minShield: 0,
    maxShield: 0,
    minRanged: 0,
    maxRanged: 0,
    minDual: 0,
    maxDual: 0,
    minPolearms: 0,
    maxPolearms: 0,
  }
  const [weapons, setWeapons] = useState<WeaponsI>(weaponsInitialState)

  // abilities state
  interface AbilitiesI {
    minLeadership: Number
    maxLeadership: Number
    minCoach: Number
    maxCoach: Number
    minCook: Number
    maxCook: Number
    minMedical: Number
    maxMedical: Number
    minSmith: Number
    maxSmith: Number
    minTorture: Number
    maxTorture: Number
  }
  const abilitiesInitialState = {
    minLeadership: 0,
    maxLeadership: 0,
    minCoach: 0,
    maxCoach: 0,
    minCook: 0,
    maxCook: 0,
    minMedical: 0,
    maxMedical: 0,
    minSmith: 0,
    maxSmith: 0,
    minTorture: 0,
    maxTorture: 0,
  }
  const [abilities, setAbilities] = useState<AbilitiesI>(abilitiesInitialState)

  const rarityInitialState = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  }
  // Rarity State
  const [rarity, setRarity] = useState(rarityInitialState)

  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenNftModelsLength = useRef(0)
  const { currentAuction, bidders, connectedBidder, refreshBidders } = useCurrentFarmAuction(account)

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsWithUserData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)
  const [freshwaterOnly, setFreshwaterOnly] = useUserGalleryFreshwaterOnly(isActive)
  const [saltwaterOnly, setSaltwaterOnly] = useUserGallerySaltwaterOnly(isActive)

  const activeFarms = models.filter((nft) => !isArchivedGalleryNft(nft))
  const archivedFarms = models.filter((nft) => isArchivedGalleryNft(nft))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const freshwaterOnlyFarms = activeFarms.filter((farm) => farm.token === NftToken.NRT)

  const saltwaterOnlyFarms = activeFarms.filter((farm) => farm.token === NftToken.NRT)

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const galleryList = useCallback(
    (modelsToDisplay: GalleryNft[]): GalleryNft[] => {
      // let modelsToDisplayWithAPR: GalleryNft[] = modelsToDisplay.map((nft) => {
      //   // if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
      //   //   return farm
      //   // }
      //   // const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
      //   // const { cakeRewardsApr, lpRewardsApr } = isActive
      //   //   ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
      //   //   : { cakeRewardsApr: 0, lpRewardsApr: 0 }

      //   // return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      //   return { ...nft }
      // })
      // console.log("modelsToDisplayWithAPR",modelsToDisplay)


      let modelsToDisplayWithAPR = modelsToDisplay
      if (query) {
        console.log("query", query)
        const lowercaseQuery = latinise(query.toLowerCase())
        modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter((nft: GalleryNft) => {

          return latinise(nft.name.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return modelsToDisplayWithAPR
    },
    [query],
  )
  const galleryPriceFiltering = useCallback(
    (modelsToDisplay: GalleryNft[]): GalleryNft[] => {
      // let modelsToDisplayWithAPR: GalleryNft[] = modelsToDisplay.map((nft) => {
      //   // if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
      //   //   return farm
      //   // }
      //   // const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
      //   // const { cakeRewardsApr, lpRewardsApr } = isActive
      //   //   ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
      //   //   : { cakeRewardsApr: 0, lpRewardsApr: 0 }

      //   // return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      //   return { ...nft }
      // })

      let modelsToDisplayWithAPR = modelsToDisplay
      if (minNRTs && maxNRTs) {
        const nrtPriceUsdDisplay = nrtPriceUsd ? Number(nrtPriceUsd.toFixed(3)) : 0
        if (currency === 'usd') {
          modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter((nft: GalleryNft) => {
            return (
              nft.initialLifeCycle.price >= nrtPriceUsdDisplay * Number(minNRTs) &&
              nft.finalLifeCycle.price <= nrtPriceUsdDisplay * Number(maxNRTs)
            )
          })
        } else {
          modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter((nft: GalleryNft) => {
            return nft.initialLifeCycle.price >= Number(minNRTs) && nft.finalLifeCycle.price <= Number(maxNRTs)
          })
        }
      }
      return modelsToDisplayWithAPR
    },
    [minNRTs, maxNRTs],
  )
  const galleryCharacteristicsFiltering = useCallback(
    (modelsToDisplay: GalleryNft[]): GalleryNft[] => {
      let modelsToDisplayWithAPR = modelsToDisplay
      const { minSize, minSupply, minWeight, maxSize, maxSupply, maxWeight } = characteristics
      // minSize && minSupply&& minWeight&& maxSize&& maxSupply&& maxWeight
      if (minSize && minSupply && minWeight && maxSize && maxSupply && maxWeight) {
        // console.log(minSize, minSupply, minWeight, maxSize, maxSupply, maxWeight)
        // const lowercaseQuery = latinise(query.toLowerCase())
        modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter(
          (nft: GalleryNft) =>
            nft.size >= minSize &&
            nft.size <= maxSize &&
            nft.supply >= minSupply &&
            nft.supply <= maxSupply &&
            nft.weight >= minWeight &&
            nft.weight <= maxWeight,
        )
        // console.log("modelsToDisplayWithAPRmodelsToDisplayWithAPR", modelsToDisplayWithAPR)
      }
      return modelsToDisplayWithAPR
    },
    [characteristics],
  )
  const galleryAttributesFiltering = useCallback(
    (modelsToDisplay: GalleryNft[]): GalleryNft[] => {
      let modelsToDisplayWithAPR = modelsToDisplay
      const {
        minAgility,
        minEndurance,
        minIntelligence,
        minPrecision,
        minStrength,
        minWillPower,
        maxIntelligence,
        maxPrecision,
        maxAgility,
        maxEndurance,
        maxStrength,
        maxWillPower,
      } = attributes

      if (
        (minAgility >= 0 &&
          minEndurance >= 0 &&
          minIntelligence >= 0 &&
          minPrecision >= 0 &&
          minStrength >= 0 &&
          minWillPower >= 0 &&
          maxIntelligence) ||
        maxPrecision ||
        maxAgility ||
        maxEndurance ||
        maxStrength ||
        maxWillPower
      ) {
        // console.log(
        //   minAgility,
        //   minEndurance,
        //   minIntelligence,
        //   minPrecision,
        //   minStrength,
        //   minWillPower,
        //   maxIntelligence,
        //   maxPrecision,
        //   maxAgility,
        //   maxEndurance,
        //   maxStrength,
        //   maxWillPower
        // )
        // const lowercaseQuery = latinise(query.toLowerCase())
        modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter(
          (nft: GalleryNft) =>
            (nft.attributes.agility >= minAgility && nft.attributes.agility <= maxAgility) ||
            (nft.attributes.endurance >= minEndurance && nft.attributes.endurance <= maxEndurance) ||
            (nft.attributes.intelligance >= minIntelligence && nft.attributes.intelligance <= maxIntelligence) ||
            (nft.attributes.precision >= minPrecision && nft.attributes.precision <= maxPrecision) ||
            (nft.attributes.strength >= minStrength && nft.attributes.strength <= maxStrength) ||
            (nft.attributes.willpower >= minWillPower && nft.attributes.willpower <= maxWillPower),
        )
        // console.log("modelsToDisplayWithAPRmodelsToDisplayWithAPR", modelsToDisplayWithAPR)
      }
      return modelsToDisplayWithAPR
    },
    [attributes],
  )

  const galleryWeaponsFiltering = useCallback(
    (modelsToDisplay: GalleryNft[]): GalleryNft[] => {
      let modelsToDisplayWithAPR = modelsToDisplay
      const {
        minOneHand,
        minDual,
        minTwoHand,
        minPolearms,
        minRanged,
        minShield,
        maxDual,
        maxOneHand,
        maxPolearms,
        maxRanged,
        maxShield,
        maxTwoHand,
      } = weapons

      if (
        (minOneHand >= 0 &&
          minDual >= 0 &&
          minTwoHand >= 0 &&
          minPolearms >= 0 &&
          minRanged >= 0 &&
          minShield >= 0 &&
          maxDual) ||
        maxOneHand ||
        maxPolearms ||
        maxRanged ||
        maxShield ||
        maxTwoHand
      ) {
        modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter(
          (nft: GalleryNft) =>
            (nft.weapons.oneHand >= minOneHand && nft.weapons.oneHand <= maxOneHand) ||
            (nft.weapons.dual >= minDual && nft.weapons.dual <= maxDual) ||
            (nft.weapons.twoHand >= minTwoHand && nft.weapons.twoHand <= maxTwoHand) ||
            (nft.weapons.polearms >= minPolearms && nft.weapons.polearms <= maxPolearms) ||
            (nft.weapons.ranged >= minRanged && nft.weapons.ranged <= maxRanged) ||
            (nft.weapons.shield >= minShield && nft.weapons.shield <= maxShield),
        )
        // console.log("modelsToDisplayWithAPRmodelsToDisplayWithAPR", modelsToDisplayWithAPR)
      }
      return modelsToDisplayWithAPR
    },
    [weapons],
  )

  const galleryAbilitiesFiltering = useCallback(
    (modelsToDisplay: GalleryNft[]): GalleryNft[] => {
      let modelsToDisplayWithAPR = modelsToDisplay
      const {
        minLeadership,
        minCoach,
        minCook,
        minMedical,
        minSmith,
        minTorture,
        maxCoach,
        maxLeadership,
        maxMedical,
        maxSmith,
        maxTorture,
        maxCook,
      } = abilities

      if (
        (minLeadership >= 0 &&
          minCoach >= 0 &&
          minCook >= 0 &&
          minMedical >= 0 &&
          minSmith >= 0 &&
          minTorture >= 0 &&
          maxCoach) ||
        maxLeadership ||
        maxMedical ||
        maxSmith ||
        maxTorture ||
        maxCook
      ) {
        modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter(
          (nft: GalleryNft) =>
            (nft.abilities.leadership >= minLeadership && nft.abilities.leadership <= maxLeadership) ||
            (nft.abilities.coach >= minCoach && nft.abilities.coach <= maxCoach) ||
            (nft.abilities.cook >= minCook && nft.abilities.cook <= maxCook) ||
            (nft.abilities.medical >= minMedical && nft.abilities.medical <= maxMedical) ||
            (nft.abilities.smith >= minSmith && nft.abilities.smith <= maxSmith) ||
            (nft.abilities.torture >= minTorture && nft.abilities.torture <= maxTorture),
        )
        // console.log("modelsToDisplayWithAPRmodelsToDisplayWithAPR", modelsToDisplayWithAPR)
      }
      return modelsToDisplayWithAPR
    },
    [abilities],
  )

  const galleryRarityFiltering = useCallback(
    (modelsToDisplay: GalleryNft[]): GalleryNft[] => {
      let modelsToDisplayWithAPR = modelsToDisplay

      if (rarity[1] || rarity[2] || rarity[3] || rarity[4] || rarity[5] || rarity[6]) {
        modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter(
          (nft: GalleryNft) =>
            (rarity[1] && nft.rarity === 1) ||
            (rarity[2] && nft.rarity === 2) ||
            (rarity[3] && nft.rarity === 3) ||
            (rarity[4] && nft.rarity === 4) ||
            (rarity[5] && nft.rarity === 5) ||
            (rarity[6] && nft.rarity === 6),
        )
        // console.log("modelsToDisplayWithAPRmodelsToDisplayWithAPR", modelsToDisplayWithAPR)
      }
      return modelsToDisplayWithAPR
    },
    [rarity],
  )
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("gallery filter onchange")
    setQuery(event.target.value)
  }

  // price filter handlers
  const handleMinNRTsQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("setMinNRTs(event.target.value)", event.target.value)
    const rejexPositiveValue = /^[0-9\b]+$/

    if (event.target.value === '' || rejexPositiveValue.test(event.target.value)) {
      const value = Number(event.target.value)
      // console.log(typeof value)

      setMinNRTs(value)
    } else {
      event.target.value = ''
    }
  }
  // console.log(minNRTs)

  const handleMaxNRTsQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("setMaxNRTs(event.target.value)", event.target.value)
    const rejexPositiveValue = /^[0-9\b]+$/

    if (event.target.value === '' || rejexPositiveValue.test(event.target.value)) {
      const value = Number(event.target.value)
      // console.log(typeof value)

      setMaxNRTs(value)
    } else {
      event.target.value = ''
    }
  }

  // console.log(maxNRTs)

  // characteristics filter handelers
  const handleChangeCharacteristics = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...characteristics }
    data[event.target.name] = event.target.value
    setCharacteristics(data)
  }

  // characteristics filter handelers
  const handleChangeAttributes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...attributes }
    const rejexPositiveValue = /^[0-9\b]+$/

    if (event.target.value === '' || rejexPositiveValue.test(event.target.value)) {
      const value = Number(event.target.value)
      data[event.target.name] = value
      setAttributes(data)
    } else {
      event.target.value = ''
    }
  }
  // Weapons filter handelers
  const handleChangeWeapons = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...weapons }
    const rejexPositiveValue = /^[0-9\b]+$/

    if (event.target.value === '' || rejexPositiveValue.test(event.target.value)) {
      const value = Number(event.target.value)
      data[event.target.name] = value
      setWeapons(data)
    } else {
      event.target.value = ''
    }
  }
  // Abilities filter handelers
  const handleChangeAbilities = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...abilities }
    const rejexPositiveValue = /^[0-9\b]+$/

    if (event.target.value === '' || rejexPositiveValue.test(event.target.value)) {
      const value = Number(event.target.value)
      data[event.target.name] = value
      setAbilities(data)
    } else {
      event.target.value = ''
    }
  }

  // Rarity filter handelers
  const handleChangeRarity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...rarity }
    // console.log("e.target.name". event.target.name)
    data[event.target.value] = event.target.checked
    // console.log(event.target.checked)
    // console.log("e.target.value". event)
    setRarity(data)
  }
  // useEffect(() => {
  // console.log("rarityyyyyyyy", rarity)
  // }, [rarity])
  type ValueI = 'ability' | 'weapon' | 'attributes' | 'characteristics' | 'rarity'

  const clearFilterStates = (value: ValueI) => {
    // console.log("value", value)
    if (value === 'ability') {
      setAbilities(abilitiesInitialState)
    }
    if (value === 'weapon') {
      setWeapons(weaponsInitialState)
    }
    if (value === 'attributes') {
      setAttributes(attributeInitialState)
    }
    if (value === 'characteristics') {
      setCharacteristics(characteristicsInitialState)
    }
    if (value === 'rarity') {
      setRarity(rarityInitialState)
    }
  }
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const chosenNftModelsMemoized = useMemo(() => {
    let chosenNftModels = []
    const sortFarms = (nftModels: GalleryNft[]): GalleryNft[] => {
      switch (sortOption) {
        case 'hot':
          return orderBy(nftModels, (nft: GalleryNft) => nft.orderBy, 'asc')
        case 'rarity':
          return orderBy(nftModels, (nft: GalleryNft) => nft.rarity, 'desc')
        case 'supply':
          return orderBy(nftModels, (nft: GalleryNft) => nft.supply, 'desc')
        case 'school price':
          return orderBy(nftModels, (nft: GalleryNft) => nft.finalLifeCycle.price, 'desc')
        case 'gladiator ready':
          return orderBy(nftModels, (nft: GalleryNft) => nft.finalLifeCycle.price, 'desc')
        default:
          return nftModels
      }
    }

    if (isActive) {
      const stake = stakedOnly ? galleryList(stakedOnlyFarms) : galleryList(activeFarms)
      const fresh = freshwaterOnly ? galleryList(freshwaterOnlyFarms) : []
      const salt = saltwaterOnly ? galleryList(saltwaterOnlyFarms) : []
      chosenNftModels = union(fresh, salt)
    }
    if (isActive) {
      const stake = chosenNftModels ? galleryPriceFiltering(chosenNftModels) : galleryPriceFiltering(chosenNftModels)
      const fresh = chosenNftModels ? galleryPriceFiltering(chosenNftModels) : []
      const salt = chosenNftModels ? galleryPriceFiltering(chosenNftModels) : []
      chosenNftModels = union(fresh, salt)
    }
    if (isActive) {
      const stake = chosenNftModels
        ? galleryCharacteristicsFiltering(chosenNftModels)
        : galleryCharacteristicsFiltering(chosenNftModels)
      const fresh = chosenNftModels ? galleryCharacteristicsFiltering(chosenNftModels) : []
      const salt = chosenNftModels ? galleryCharacteristicsFiltering(chosenNftModels) : []
      chosenNftModels = union(fresh, salt)
    }
    if (isActive) {
      const stake = chosenNftModels
        ? galleryAttributesFiltering(chosenNftModels)
        : galleryAttributesFiltering(chosenNftModels)
      const fresh = chosenNftModels ? galleryAttributesFiltering(chosenNftModels) : []
      const salt = chosenNftModels ? galleryAttributesFiltering(chosenNftModels) : []
      chosenNftModels = union(fresh, salt)
    }
    if (isActive) {
      const stake = chosenNftModels
        ? galleryWeaponsFiltering(chosenNftModels)
        : galleryWeaponsFiltering(chosenNftModels)
      const fresh = chosenNftModels ? galleryWeaponsFiltering(chosenNftModels) : []
      const salt = chosenNftModels ? galleryWeaponsFiltering(chosenNftModels) : []
      chosenNftModels = union(fresh, salt)
    }
    if (isActive) {
      const stake = chosenNftModels
        ? galleryAbilitiesFiltering(chosenNftModels)
        : galleryAbilitiesFiltering(chosenNftModels)
      const fresh = chosenNftModels ? galleryAbilitiesFiltering(chosenNftModels) : []
      const salt = chosenNftModels ? galleryAbilitiesFiltering(chosenNftModels) : []
      chosenNftModels = union(fresh, salt)
    }
    if (isActive) {
      const stake = chosenNftModels ? galleryRarityFiltering(chosenNftModels) : galleryRarityFiltering(chosenNftModels)
      const fresh = chosenNftModels ? galleryRarityFiltering(chosenNftModels) : []
      const salt = chosenNftModels ? galleryRarityFiltering(chosenNftModels) : []
      chosenNftModels = union(fresh, salt)
    }

    // if (isInactive) {
    //   chosenNftModels = stakedOnly ? galleryList(stakedInactiveFarms) : galleryList(inactiveFarms)
    // }
    if (isArchived) {
      chosenNftModels = stakedOnly ? galleryList(stakedArchivedFarms) : galleryList(archivedFarms)
    }
    // console.log("sortFarmssortFarmssortFarmssortFarms", sortFarms(chosenNftModels))
    return sortFarms(chosenNftModels).slice(0, numberOfFarmsVisible)
  }, [
    query,
    sortOption,
    activeFarms,
    galleryList,
    archivedFarms,
    isActive,
    isArchived,
    stakedArchivedFarms,
    stakedOnly,
    stakedOnlyFarms,
    freshwaterOnly,
    freshwaterOnlyFarms,
    saltwaterOnly,
    saltwaterOnlyFarms,
    numberOfFarmsVisible,
    minNRTs,
    maxNRTs,
    characteristics,
    attributes,
    weapons,
  ])

  chosenNftModelsLength.current = chosenNftModelsMemoized.length
  const profileContract = useProfileContract()

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
        if (farmsCurrentlyVisible <= chosenNftModelsLength.current) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        }
        return farmsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const getUserStatus = async () => {
    // console.log("profileContractprofileContract", profileContract)
    const data = await profileContract.getUserStatus(account)
    if (!data) {
      // history.push("/create-profile")
    }
  }

  useEffect(() => {
    getUserStatus()
  }, [])
  const renderContent = (): JSX.Element => {
    //GF-227
    return (
      <>
        {chosenNftModelsMemoized.length > 0 ? (
          <FlexLayout>
            <Route exact path={`${path}`}>
              {chosenNftModelsMemoized.map((nftModel) => (
                <GalleryModelCard
                  key={nftModel.glTF}
                  nftModel={nftModel}
                  // displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                  cakePrice={cakePrice}
                  account={account}
                  removed={false}
                />
              ))}
            </Route>
            {/* <Route exact path={`${path}/history`}>
          {chosenNftModelsMemoized.map((nftModel) => (
            <GalleryModelCard
              key={nftModel.glTF}
              nftModel={nftModel}
              // displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed={false}
            />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {chosenNftModelsMemoized.map((nftModel) => (
            <GalleryModelCard
              key={nftModel.glTF}
              nftModel={nftModel}
              // displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              cakePrice={cakePrice}
              account={account}
              removed={false}
            />
          ))}
        </Route> */}
          </FlexLayout>
        ) : (
          <GallerySearch>No result found</GallerySearch>
        )}
      </>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    // console.log("optionoptionoptionoptionoptionoptionoption", option)
    setSortOption(option.value)
  }

  return (
    <>
      <StyledHeader>
        <Flex flexDirection={['column-reverse', null, 'row']}>
          <Left>
            <NewHeading as="h1" scale="xxl" my="24px">
              {t('Gladiators 3D Gallery')}
            </NewHeading>
            <Text color="textSubtle" mb="24px">
              {t(
                "This is where you will find our ecosystem's 3D models for purchase. Browse, personalize and buy, as simple as 1, 2, 3.",
              )}
            </Text>
            <Text color="textSubtle">
              {t(
                "Click on Personalize & Buy to visualize and personalize, you won't be charged until you make up your mind.",
              )}
            </Text>
            <Text color="textSubtle" mb="24px">
              {t("Make sure you visit your creature's evolution life cycle.")}
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
            <img src="/images/decorations/gladiator.png" alt={t('gallery gladiator')} />
          </Right>
        </Flex>
      </StyledHeader>
      <GalleryBackground
        innerProps={{ style: { margin: '0', width: '100%' } }}
        p="24px 0"
        index={2}
        concaveDivider
        dividerPosition="top"
        clipFill={{ light: 'url(/images/decorations/bgmin.png)', dark: 'url(/images/decorations/bgmin.png)' }}
      >
        <FilterContainer flexDirection={['column', null, null, 'row']}>
          <Flex flexDirection="column" width="288px" minWidth="288px">
            <FilterCard
              handleCurrency={setCurrency}
              handleChangeQuery={handleChangeQuery}
              handleSortOptionChange={handleSortOptionChange}
              freshwaterOnly={freshwaterOnly}
              saltwaterOnly={saltwaterOnly}
              setFreshwaterOnly={setFreshwaterOnly}
              setSaltwaterOnly={setSaltwaterOnly}
              handleMinNRTsQuery={handleMinNRTsQuery}
              handleMaxNRTsQuery={handleMaxNRTsQuery}
              handleChangeCharacteristics={handleChangeCharacteristics}
              handleChangeAttributes={handleChangeAttributes}
              handleChangeWeapons={handleChangeWeapons}
              handleChangeAbilities={handleChangeAbilities}
              handleChangeRarity={handleChangeRarity}
              rarity={rarity}
              clearFilterStates={clearFilterStates}
            />
          </Flex>

          {renderContent()}
          {account && !userDataLoaded && stakedOnly && (
            <Flex justifyContent="center">
              <Loading />
            </Flex>
          )}
        </FilterContainer>
        <div ref={observerRef} />
        <MainCharacter>
          <StyledImage src="/images/decorations/3dpan.png" alt="Gladiators illustration" />
        </MainCharacter>
      </GalleryBackground>
    </>
  )
}

export default Gallery
