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
import { useUserFarmStakedOnly, useUserFarmsViewMode, useUserGalleryFreshwaterOnly, useUserGallerySaltwaterOnly } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import { useCurrentFarmAuction } from 'views/FarmAuction/hooks/useCurrentFarmAuction'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import HomeGalleryModelCard from './components/GalleryModelCard/HomeGalleryModalCard'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema } from './components/types'
import FilterCard from './components/FilterCard'

const FilterContainer = styled(Flex)`
  width: 100%;
  align-items: flex-start;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 24px;
  }
`

const StyledImage = styled.img`
  // margin-left: auto;
  // margin-right: auto;
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
  // background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
`
const NewHeading = styled(Heading)`
  color: #D9AB3A;
  `

const NewFlexLayout = styled(FlexLayout)`
    display: flex;
    flex-direction: column;
    width: 50%;
  `

const NUMBER_OF_FARMS_VISIBLE = 12
type HomeGalleryProps = {
    setNft?: any,
    nft?: any
}

const HomeGallery: React.FC<HomeGalleryProps> = ({ setNft, nft: parentNft }) => {
    const { path } = useRouteMatch()
    const { pathname } = useLocation()
    const { t } = useTranslation()
    const { theme } = useTheme()
    const { models, isInitialized: userDataLoaded } = useGetGallery()
    const cakePrice = usePriceCakeBusd()
    const [query, setQuery] = useState('')
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


    const [selectedCard, setSelectedCard] = useState("")

    // console.log("selectedCardselectedCardselectedCard", selectedCard)

    const activeFarms = models.filter((nft) => !isArchivedGalleryNft(nft))
    const archivedFarms = models.filter((nft) => isArchivedGalleryNft(nft))

    const stakedOnlyFarms = activeFarms.filter(
        (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
    )

    const freshwaterOnlyFarms = activeFarms.filter(
        (farm) => farm.token === NftToken.NRT,
    )

    const saltwaterOnlyFarms = activeFarms.filter(
        (farm) => farm.token === NftToken.NRT,
    )

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

            let modelsToDisplayWithAPR = modelsToDisplay
            if (query) {
                const lowercaseQuery = latinise(query.toLowerCase())
                modelsToDisplayWithAPR = modelsToDisplayWithAPR.filter((nft: GalleryNft) => {
                    return latinise(nft.name.toLowerCase()).includes(lowercaseQuery)
                })
            }
            return modelsToDisplayWithAPR
        },
        [query],
    )

    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

    const chosenNftModelsMemoized = useMemo(() => {
        let chosenNftModels = []

        const sortFarms = (nftModels: GalleryNft[]): GalleryNft[] => {
            switch (sortOption) {
                case 'hot':
                    return orderBy(nftModels, (nft: GalleryNft) => nft.orderBy, 'asc')
                case 'size':
                    return orderBy(nftModels, (nft: GalleryNft) => nft.size, 'desc')
                case 'supply':
                    return orderBy(nftModels, (nft: GalleryNft) => nft.supply, 'desc')
                case 'weight':
                    return orderBy(nftModels, (nft: GalleryNft) => nft.weight, 'desc')
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
        // if (isInactive) {
        //   chosenNftModels = stakedOnly ? galleryList(stakedInactiveFarms) : galleryList(inactiveFarms)
        // }
        if (isArchived) {
            chosenNftModels = stakedOnly ? galleryList(stakedArchivedFarms) : galleryList(archivedFarms)
        }

        return sortFarms(chosenNftModels).slice(0, numberOfFarmsVisible)
    }, [
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
    ])

    chosenNftModelsLength.current = chosenNftModelsMemoized.length
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
    //   const renderContent = (): JSX.Element => {
    //     return (
    //       <FlexLayout>
    //         <Route exact path={`${path}`}>
    //           {chosenNftModelsMemoized.map((nftModel) => (
    //        NewFlexLayout     <GalleryModelCard
    //               key={nftModel.glTF}
    //               nftModel={nftModel}
    //               // displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
    //               cakePrice={cakePrice}
    //               account={account}
    //               removed={false}
    //             />
    //           ))}
    //         </Route>
    //         <Route exact path={`${path}/history`}>
    //           {chosenNftModelsMemoized.map((nftModel) => (
    //             <GalleryModelCard
    //               key={nftModel.glTF}
    //               nftModel={nftModel}
    //               // displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
    //               cakePrice={cakePrice}
    //               account={account}
    //               removed={false}
    //             />
    //           ))}
    //         </Route>
    //         <Route exact path={`${path}/archived`}>
    //           {chosenNftModelsMemoized.map((nftModel) => (
    //             <GalleryModelCard
    //               key={nftModel.glTF}
    //               nftModel={nftModel}
    //               // displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
    //               cakePrice={cakePrice}
    //               account={account}
    //               removed={false}
    //             />
    //           ))}
    //         </Route>
    //       </FlexLayout>
    //     )
    //   }

    const handleSortOptionChange = (option: OptionProps): void => {
        setSortOption(option.value)
    }

    React.useEffect(() => {
        if (!parentNft) {
            setNft(chosenNftModelsMemoized[0])
        }
    }, [parentNft, chosenNftModelsMemoized, setNft])
    return (
        <NewFlexLayout>
            <Route exact path={`${path}`}>
                {chosenNftModelsMemoized.slice(1, 4).map((nftModel) => (
                    <HomeGalleryModelCard
                        key={nftModel.glTF}
                        nftModel={nftModel}
                        setNft={setNft}
                        // displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
                        cakePrice={cakePrice}
                        account={account}
                        removed={false}
                        selectedCard={selectedCard} 
                        setSelectedCard={setSelectedCard}
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
        </NewFlexLayout>
    )
}

export default HomeGallery
