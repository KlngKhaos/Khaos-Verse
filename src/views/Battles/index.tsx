import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Heading, Flex, Image, Text, useModal, Button } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import PageSection from 'components/PageSection'
import { useGetGallery } from 'state/gallery/hooks'
import ViewerSolo from 'views/Configurator/components/ViewerSolo'
import Attack from 'config/constants/battleJoin/battle-equpiment'
import Defense from 'config/constants/battleJoin/defense-equipment'
import Animal from 'config/constants/battleJoin/animal'
import AttackEquipments from './AttackEquip'
import DefenseEquipments from './DefenseEquip'
import Animals from './Animals'
import { useWeb3React } from '@web3-react/core'
import { getAllGladiators } from '../../state/nftMarket/helpers'
import useStore from '../PoolTour3D/store'
import { useGladiatorEquipment, useBattleNft, useCake, useNrt } from 'hooks/useContract'
import { getAllJoinPageNfts } from '../../state/nftMarket/helpers'
import GladiatorStatisticss from './GladiatorStatistics'
import { AttackEquip, DefenseEquip, AnimalList } from '../../config/constants/battleJoin/types'
import { defaultMemoize } from 'reselect'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ethersToBigNumber } from 'utils/bigNumber'
import { MaxUint256 } from '@ethersproject/constants'
import useToast from 'hooks/useToast'
import { parseUnits } from '@ethersproject/units'
import { ethers } from "ethers"
const BackgroundImage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 890px;
  background-image: url(/images/battles/background.png);
  background-repeat: no-repeat;
  background-size: cover;
`
const GladiatorBattlePrepare = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1500px;
  // padding: 0px 120px;
`
const GladiatorStatics = styled.div`
  width: 30%;
  padding-left: 28px;
  padding-right: 50px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  background-image: url(/images/battles/left-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
`
const FilterTabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Tabs = styled.div`
  padding: 6px 12px;
  border: 1px solid transparent;
  color: #7d91ad;
  &:hover {
    cursor: pointer;
    border: 1px solid #7d91ad;
  }
`
const FilterTabsTwo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // margin-top: 20px;
`
const ScrollableContent = styled.div`
  overflow-y: scroll;
  height: 786px;
  margin-top: 20px;
  &::-webkit-scrollbar {
    background: : #7D91AD !important;
  }
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
}
`
const TabsTwo = styled(Button) <{ background?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: 15px;
  font-size: 20px;
  width: 170px;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`
const TopTabs = styled.div`
  padding: 5px 10px;
  background-image: url(/images/battles/buttons-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  color: #552216;
  width: 100px;
  height: 33px;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const EquipmentsHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7d91ad;
`
const Equipments = styled.div`
  background-image: url(/images/battles/heading-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 225px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 12px;
`
const EquipmentsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
`
const Equipment = styled.div`
  margin: 0px 6px;
  margin-top: 20px;
`
const EquipmentImage = styled.div`
  display: flex;
  width: 70px;
`
const AttackBackground = styled.div`
  background-image: url(/images/battles/1.png);
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 70px;
  }
`
const EquipmentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const GladiatorEquip = styled.div`
  margin: 5px 10px;
  cursor: pointer;
`
const BattleEquip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 50px 20px 5px 20px;
`

const DefenseBackground = styled.div`
  background-image: url(/images/battles/2.png);
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
`
const AnimalBackground = styled.div`
  background-image: url(/images/battles/3.png);
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;
`
const EquipButton = styled.div`
  padding: 4px 10px;
  background-image: url(/images/battles/buttons-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  color: #552216;
  width: 70px;
  height: 23px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
const LoadMore = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`
const MoreButton = styled.div`
  background-color: #3c4964;
  padding: 4px 6px;
  border-radius: 50px;
  color: #ffffff;
  font-size: 14px;
  margin-right: 25px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
const GladiatorView = styled.div`
  width: 40%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const GladiatorMainHeading = styled.div`
  background-image: url(/images/battles/heading2-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 400px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;

  color: #7d91ad;
`
const GladiatorPowerStats = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  flex-wrap: wrap;
  & img {
    height: auto;
    margin-left: 30px;
    width: 160px;
  }
`
const GladiatorAquaStats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 478px;
`
const GladiatorImage = styled.div`
  & img {
    width: 500px;
  }
`
const GladiatorAqua = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 110px;
    margin-top: 20px;
  }
`
const AquaButton = styled.div`
  background-image: url(/images/battles/heading-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 115px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #7d91ad;
`
const PrepareHeading = styled.div`
  background-image: url(/images/battles/heading-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 180px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #7d91ad;
`
const GladiatorEquipments = styled.div`
  width: 532px;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  // flex-wrap: wrap;
  // & img {
  //   width: 70px;
  // }
  &::-webkit-scrollbar {
    background: : #7D91AD !important;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
`
const GladiatorSkills = styled.div`
  width: 532px;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  // flex-wrap: wrap;
  & img {
    width: 70px;
    margin: 5px 10px;
  }
  &::-webkit-scrollbar {
    background: : #7D91AD !important;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
`
const GladiatorStatistics = styled.div`
  width: 30%;
  background-image: url(/images/battles/right-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
`
const StatsTabs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px 0px;
  border: 1px solid transparent;
  color: #7d91ad;
`
const StatisticsScrollable = styled.div`
  overflow-y: scroll;
  height: 700px;
  margin-top: 20px;
  &::-webkit-scrollbar {
    background: : #7D91AD !important;
  }
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
`
const StatisticsScrollableRight = styled.div`
  height: 766px;
  margin-top: 20px;
`
const PointsHeading = styled.div`
  padding: 6px 0px;
  color: #c09451;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 2px solid #7d91ad;
  border-radius: 4px;
  padding-left: 10px;
  text-align: center;
`
const StatsTable = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 12px;
`
const Left = styled.div`
  width: 45%;
`
const Right = styled.div`
  width: 45%;
`
const TableStatsHeading = styled.div`
  color: #7d91ad;
  padding-bottom: 8px;
  border-bottom: 1px solid #7d91ad;
  font-weight: bold;
  font-size: 16px;
  padding-top: 12px;
`
const TableData = styled.div`
  padding: 0px 8px;
`
const TableDataTwo = styled.div`
  padding: 0px 8px;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #7d91ad;
`
const Attribute = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Property = styled.div`
  display: flex;
  align-items: center;
  color: #7d91ad;
  font-size: 16px;
  padding: 10px 0px;
`
const Value = styled.div`
  color: #c09451;
  font-size: 16px;
`
const ControlButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  margin-top: 20px;
`
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`
const Jackpot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 24px;
  text-align: center;
  padding: 0px 10px;
  margin-top: 80px;
`
const Apex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 28px;

  margin-top: 20px;
`
const JackpotValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7d91ad;
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
`
const ApexToken = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7d91ad;
  font-size: 18px;

  margin-top: 10px;
`
const ApexValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7d91ad;
  font-size: 28px;
  font-weight: bold;
  margin-top: 15px;
`

const TokenImage = styled.img`
  width: 32px;
  margin-left: 10px;
`
const BetAmount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #7d91ad;
  font-size: 32px;

  font-weight: bold;
`
const BetButton = styled.div`
  padding: 8px 16px;
  font-size: 32px;

  background-color: #c09451;
  border-radius: 8px;
  margin: 0px 12px;
  color: #552216;
  &:hover {
    cursor: pointer;
  }
`
const BetButtonGo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const GoButton = styled.div`
  width: 144px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 26px;
  font-size: 32px;

  background-color: #c09451;
  border-radius: 8px;
  margin: 20px 12px 0px;
  color: #552216;
  &:hover {
    cursor: pointer;
  }
`
const IconImage = styled.img`
  width: 24px;
  margin-right: 8px;
`
const NewText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 4px;
  padding-left: 10px;
  border-bottom: 2px solid #7d91ad;
  border-radius: 4px;
`
const EquipmentLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -3px;
  right: -2px;
  background-color: #c09451;
  color: #552216;
  width: 20px;
  height: 20px;
  border-radius: 10px;
`

const BackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url(/images/battles/back.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: 15px;
  font-size: 20px;
  width: 170px;
  height: 50px;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`
const NextButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url(/images/battles/blue.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: 15px;
  font-size: 20px;
  width: 170px;
  height: 50px;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`
const Battles: React.FC = () => {
  const battleContract = useBattleNft()
  const { currentStatics } = useStore((state) => state)
  // console.log("currentStaticscurrentStatics", currentStatics)
  const [curColor, setCurColor] = useState(
    localStorage.getItem('con_curColor') ? localStorage.getItem('con_curColor') : '#ffffff',
  )
  const [curName, setCurName] = useState(
    localStorage.getItem('con_curName') ? localStorage.getItem('con_curName') : 'None selected.',
  )
  const [curSpeed, setCurSpeed] = useState(
    localStorage.getItem('con_curSpeed') ? localStorage.getItem('con_curSpeed') : 1,
  )
  const [curBack, setCurBack] = useState(localStorage.getItem('con_curBack') ? localStorage.getItem('con_curBack') : 0)
  const [colors, setColors] = useState(
    JSON.parse(localStorage.getItem('con_colors')) ? JSON.parse(localStorage.getItem('con_colors')) : {},
  )

  const [selectedBattleEquipment, setSelectedBattleEquipment] = useState<AttackEquip | null>(null)
  const [selectedDefenseEquipment, setSelectedDefenseEquipment] = useState<DefenseEquip | null>(null)
  const [selectedAnimalEquipment, setSelectedAnimalEquipment] = useState<AnimalList | null>(null)

  const [battleNfts, setBattleNfts] = useState(null)
  const [animalNfts, setAnimalNfts] = useState(null)
  const [defenseNfts, setDefenseNfts] = useState(null)

  const [battleNftId, setBattleNftId] = useState(0)
  const [defenseNftId, setDefenseNftId] = useState(0)
  const [animalNftId, setAnimalNftId] = useState(0)
  // console.log("battleNftIdbattleNftId", battleNftId);
  // console.log("defenseNftIddefenseNftId", defenseNftId);
  // console.log("animalNftIdanimalNftId", animalNftId);
  // console.log("selectedBattleEquipment", selectedBattleEquipment)
  // console.log("selectedDefenseEquipment", selectedDefenseEquipment)
  // console.log("selectedAnimalEquipment", selectedAnimalEquipment)
  const [joinPageNfts, setJoinPageNfts] = useState(null)
  const [nextStep, setNextStep] = useState(true)
  const [backStep, setBackStep] = useState(true)
  const [totalRounds, setTotalRounds] = useState<number>(0)
  const [selectedRounds, setSelectedRounds] = useState<number>(0)
  const [potentialAttackPoints, setPotentialAttackPoints] = useState<number>(0)
  const [potentialDefensePoints, setPotentialDefensePoints] = useState<number>(0)
  const location = useLocation()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const history = useHistory()
  const [nftIds, setNftIds] = useState([])
  const { models } = useGetGallery()
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const nrtContract = useNrt()

  const [denaBalance, setDenaBalance] = useState<number>(0)
  const [battleImages, setBattleImages] = useState([])
  const [defenseImages, setDefenseImages] = useState([])
  const [animalImages, setAnimalImages] = useState([])
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastInfo, toastSuccess, toastError } = useToast()
  const handleNext = () => {
    setNextStep(false)
  }

  const handleBack = () => {
    setNextStep(true)
  }

  const handleRedirect = () => {
    history.push(`/battles/bet`)
  }
  const equipmentContract = useGladiatorEquipment()

  const getJoinPageNFTsTokenIds = async () => {
    if (!currentStatics && !currentStatics?.tokenId) {
      history.push('/mygladiators')
      return
    }

    const data = await equipmentContract.getEquipment(currentStatics?.tokenId)

    const ids = data.map((element) => parseInt(element._hex, 16))
    // console.log("idsssssssssssssssssss", ids)
    setNftIds(ids)
  }
  const getTotalDenasPerRound = async () => {
    try {
      const denaPerRound = await battleContract.denaPerRound()
      // console.log("jjjjjjjjjjjjjjj", denaPerRound)
      setTotalRounds(parseInt(denaPerRound._hex) / 1000000000000000000)
    } catch (error) {
      console.log("error<>><><><><>", error)
    }

  }
  useEffect(() => {
    getJoinPageNFTsTokenIds()
    getTotalDenasPerRound()
  }, [])
  const getNFTsFromDB = async () => {
    const data = await getAllJoinPageNfts()
    // console.log('dataaaaaaaaaaaa', data)
    setJoinPageNfts(data)
    // console.log("data from DB <><><><><><><>", data)
    // looping to get  related objects
    const battleNfts = []
    const defenseNfts = []
    const animalNfts = []
    for (let i = 0; i < nftIds.length; i++) {
      const findBattleNft = data.find((nft) => nft.tokenId == nftIds[i] && nft?.ipfsJson?.type === 'battle')
      if (findBattleNft) {
        battleNfts.push({ ...findBattleNft.ipfsJson, tokenId: findBattleNft.tokenId })
      }
      const findDefenseNft = data.find((nft) => nft.tokenId == nftIds[i] && nft?.ipfsJson?.type === 'defense')
      if (findDefenseNft) {
        defenseNfts.push({ ...findDefenseNft.ipfsJson, tokenId: findDefenseNft.tokenId })
      }
      const findAnimalNft = data.find((nft) => nft.tokenId == nftIds[i] && nft?.ipfsJson?.type === 'animal')
      if (findAnimalNft) {
        animalNfts.push({ ...findAnimalNft.ipfsJson, tokenId: findAnimalNft.tokenId })
      }
    }
    // console.log("battleNfts", battleNfts)
    // console.log("defenseNfts", defenseNfts)
    // console.log("animalNfts", animalNfts)
    setBattleNfts(battleNfts)
    setDefenseNfts(defenseNfts)
    setAnimalNfts(animalNfts)
    const battleImagePath = filterRawData(battleNfts.map((nft) => nft.imagePath))
    const defenseImagePath = filterRawData(defenseNfts.map((nft) => nft.imagePath))
    const animalImagePath = filterRawData(animalNfts.map((nft) => nft.imagePath))

    // create array of arrays of each element
    setBattleImages(battleImagePath)
    setDefenseImages(defenseImagePath)
    setAnimalImages(animalImagePath)
  }

  // this function will take an array of strings or numbers and convert it to array of sub arrays such that each sub array contains same identical elements as these are used in parent array
  // for example
  // input is
  // rawData = [1,2,3,4,1,2,5,6,7,2,6,5]
  // output is
  // [[1,1], [2,2,2], [3], [4], [5,5], [6,6], [7]]
  // its benefit is than we can access each unique number/string by accessing the zero index of each sub array,
  // and total number of repitions of each number/string. this will help us to add a number on the top of each buyed equipment if same equipment is bought for more than one time.
  function filterRawData(rawData) {
    let finalObj = {}
    // sort
    for (let i = 0; i < rawData.length; i++) {
      let obj = null
      obj = {}
      let filterSameValue = rawData.filter((element) => element === rawData[i])
      if (!obj[rawData[i]]) {
        obj[rawData[i]] = filterSameValue
      }
      finalObj[obj[rawData[i]][0]] = obj[rawData[i]]
    }
    return Object.values(finalObj)
  }

  useEffect(() => {
    if (nftIds.length > 0) {
      getNFTsFromDB()
    }
  }, [nftIds])
  useEffect(() => {
    if (!currentStatics) {
      // console.log("currentStaticscurrentStatics", currentStatics)
      history.push('/mygladiators')
    }
  }, [])
  const handleSelectBattleEquipment = async (image) => {
    const findNft = Attack.find((nft) => nft?.imagePath === image)
    setSelectedBattleEquipment(findNft)
    const nft = battleNfts.find(nft => nft.imagePath === image)
    setBattleNftId(nft.tokenId)
  }
  const handleSelectDefenseEquipment = async (image) => {
    const findNft = Defense.find((nft) => nft?.imagePath === image)
    setSelectedDefenseEquipment(findNft)
    const nft = defenseNfts.find(nft => nft.imagePath === image)
    setDefenseNftId(nft.tokenId)
  }
  const handleSelectAnimalEquipment = async (image) => {
    const findNft = Animal.find((nft) => nft?.imagePath === image)
    setSelectedAnimalEquipment(findNft)
    const nft = animalNfts.find(nft => nft.imagePath === image)
    setAnimalNftId(nft.tokenId)
  }
  //TODO: get this from config?!
  if (currentStatics) {
    // console.log("modelssssssssssss", models)
    const terrain = models.find((model) => currentStatics.glTF == model.glTF)
    currentStatics.bestTerrain = terrain ? terrain.bestTerrain : 'Glacial'
  }
  useEffect(() => {
    if (selectedAnimalEquipment && selectedBattleEquipment && selectedDefenseEquipment) {
      // console.log("attack equipment", selectedBattleEquipment)
      // console.log("animal equipment", selectedAnimalEquipment);
      //   console.log("currentStaticscurrentStatics", currentStatics)
      const { strength, endurance, agility, precision, intelligance, willpower } = currentStatics.attributes

      const { oneHand, twoHand, shield, ranged, dual, polearms } = currentStatics.weapons

      const { leadership, coach, cook, medical, smith, torture } = currentStatics.abilities

      const attackPoints =
        strength +
        selectedBattleEquipment.strength +
        selectedAnimalEquipment.strength +
        endurance +
        selectedBattleEquipment.endurance +
        selectedAnimalEquipment.endurance +
        agility +
        selectedBattleEquipment.agility +
        selectedAnimalEquipment.agility +
        precision +
        selectedBattleEquipment.precision +
        selectedAnimalEquipment.precision +
        intelligance +
        selectedBattleEquipment.intelligance +
        selectedAnimalEquipment.intelligance
      willpower +
        selectedBattleEquipment.willpower +
        selectedAnimalEquipment.willpower +
        oneHand +
        selectedBattleEquipment.onehand +
        selectedAnimalEquipment.onehand +
        twoHand +
        selectedBattleEquipment.twohand +
        selectedAnimalEquipment.twohand +
        shield +
        selectedBattleEquipment.shield +
        selectedAnimalEquipment.shield +
        ranged +
        selectedBattleEquipment.range +
        selectedAnimalEquipment.range +
        dual +
        selectedBattleEquipment.dual +
        selectedAnimalEquipment.dual +
        polearms +
        selectedBattleEquipment.polearms +
        selectedAnimalEquipment.polearms +
        leadership +
        selectedBattleEquipment.leadership +
        selectedAnimalEquipment.leadership +
        coach +
        selectedBattleEquipment.coach +
        selectedAnimalEquipment.coach +
        cook +
        selectedBattleEquipment.cook +
        selectedAnimalEquipment.cook +
        medical +
        selectedBattleEquipment.medical +
        selectedAnimalEquipment.medical +
        smith +
        selectedBattleEquipment.smith +
        selectedAnimalEquipment.smith

      const defensePoints =
        strength +
        selectedDefenseEquipment.strength +
        selectedAnimalEquipment.strength +
        endurance +
        selectedDefenseEquipment.endurance +
        selectedAnimalEquipment.endurance +
        agility +
        selectedDefenseEquipment.agility +
        selectedAnimalEquipment.agility +
        precision +
        selectedDefenseEquipment.precision +
        selectedAnimalEquipment.precision +
        intelligance +
        selectedDefenseEquipment.intelligance +
        selectedAnimalEquipment.intelligance
      willpower +
        selectedDefenseEquipment.willpower +
        selectedAnimalEquipment.willpower +
        oneHand +
        selectedDefenseEquipment.onehand +
        selectedAnimalEquipment.onehand +
        twoHand +
        selectedDefenseEquipment.twohand +
        selectedAnimalEquipment.twohand +
        shield +
        selectedDefenseEquipment.shield +
        selectedAnimalEquipment.shield +
        ranged +
        selectedDefenseEquipment.range +
        selectedAnimalEquipment.range +
        dual +
        selectedDefenseEquipment.dual +
        selectedAnimalEquipment.dual +
        polearms +
        selectedDefenseEquipment.polearms +
        selectedAnimalEquipment.polearms +
        leadership +
        selectedDefenseEquipment.leadership +
        selectedAnimalEquipment.leadership +
        coach +
        selectedDefenseEquipment.coach +
        selectedAnimalEquipment.coach +
        cook +
        selectedDefenseEquipment.cook +
        selectedAnimalEquipment.cook +
        medical +
        selectedDefenseEquipment.medical +
        selectedAnimalEquipment.medical +
        smith +
        selectedDefenseEquipment.smith +
        selectedAnimalEquipment.smith +
        0 +
        selectedDefenseEquipment.torture +
        selectedAnimalEquipment.torture
      // console.log("attackPoints", attackPoints)
      setPotentialAttackPoints(attackPoints)
      setPotentialDefensePoints(defensePoints)
    }
  }, [selectedAnimalEquipment, selectedDefenseEquipment, selectedBattleEquipment])
  // console.log("accountaccountaccountaccountaccount", account);
  useEffect(() => {
    if (account) {
      (async () => {
        const amount = await cakeContract?.balanceOf(account)
        const ethValue = ethers.utils.formatEther(amount);
        setDenaBalance(Number(ethValue))
      })()
    }
  }, [account])

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await cakeContract.allowance(account, battleContract.address)
          const currentAllowance = ethersToBigNumber(response)
          return currentAllowance.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        // console.log("approving fun", battleContract);
        return callWithGasPrice(cakeContract, 'approve', [battleContract.address, MaxUint256.toString()])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(t('Contract approved'))
      },
      onConfirm: async () => {
        // console.log(" parseUnits((selectedRounds * totalRounds).toString() )",  parseUnits((selectedRounds * totalRounds).toString() ));
        try {
          const data = await callWithGasPrice(battleContract, 'registerPlayer', [
            selectedRounds.toString(),  // rounds
            ((totalRounds * selectedRounds).toString() + "000000000000000000").toString(),    // denas per round
            Math.floor(potentialAttackPoints),
            Math.floor(potentialDefensePoints),
            currentStatics?.tokenId,
            battleNftId.toString(),
            defenseNftId.toString(),
            animalNftId.toString()
          ])
          return data
        } catch (error: any) {
          throw new Error(error)
        }
      },
      onSuccess: async ({ receipt }) => {
        toastSuccess(t('You are now a registered player'))
      },
    })
  const handlePayDenaToGoToBattle = async () => {
    // console.log('clicked', isApproving, isApproved, isConfirmed, isConfirming)
    // console.log("cccccccccccc", totalRounds , selectedRounds, potentialAttackPoints, potentialDefensePoints);
    if (!selectedRounds) {
      toastError(t('Please Add Some Rounds'))
      return
    } else {

      if (!isApproved) {
        // console.log("approving");
        handleApprove()
      } else if (isApproved && !isConfirmed) {
        // console.log("confirmingg");

        handleConfirm()
      }
    }
  }
  return (
    <>
      <BackgroundImage>
        <GladiatorBattlePrepare>
          <GladiatorStatics>
            {/* <FilterTabs>
              <Tabs>{t('EQUIPMENT')}</Tabs>
              <Tabs>{t('SKILLS')}</Tabs>
              <Tabs>{t('TACTICS')}</Tabs>
            </FilterTabs> */}
            <FilterTabsTwo>
              <TopTabs>{t('Attack')}</TopTabs>
              <TopTabs>{t('Defense')}</TopTabs>
              <TopTabs>{t('Animals')}</TopTabs>
            </FilterTabsTwo>
            <ScrollableContent>
              <EquipmentsHeading>
                <Equipments>{t('Attack')}</Equipments>
              </EquipmentsHeading>
              <EquipmentsList>
                <AttackEquipments attackEquip={Attack} getJoinPageNFTsTokenIds={getJoinPageNFTsTokenIds} />
              </EquipmentsList>
              <EquipmentsHeading>
                <Equipments>{t('Defense')}</Equipments>
              </EquipmentsHeading>
              <EquipmentsList>
                <DefenseEquipments defenseEquip={Defense} getJoinPageNFTsTokenIds={getJoinPageNFTsTokenIds} />
              </EquipmentsList>
              <EquipmentsHeading>
                <Equipments>{t('Animals')}</Equipments>
              </EquipmentsHeading>
              <EquipmentsList>
                <Animals animals={Animal} getJoinPageNFTsTokenIds={getJoinPageNFTsTokenIds} />
              </EquipmentsList>
            </ScrollableContent>
          </GladiatorStatics>
          <GladiatorView>
            <PrepareHeading>{t('Prepare to Battle')}</PrepareHeading>
            <GladiatorPowerStats>
              <img src="/images/battles/coin.png" alt="Coin" />
              {/* <img src="/images/battles/heart.png" alt="Heart" /> */}
              <img src="/images/battles/power.png" alt="Power" />
            </GladiatorPowerStats>
            <GladiatorAquaStats>
              <GladiatorImage>
                {/* <img src="/images/battles/gladiator.png" alt="Gladiator" /> */}
                {currentStatics ? (
                  <ViewerSolo
                    nft={currentStatics}
                    curColor={curColor}
                    curName={curName}
                    setCurName={(name) => ''}
                    curSpeed={curSpeed}
                    curBack={curBack}
                    colors={currentStatics.colors}
                    home="true"
                    hideBackground={true}
                    noCameraControl={true}
                  />
                ) : (
                  <h1>You Donot Have any Gladiator</h1>
                )}
              </GladiatorImage>
              <GladiatorAqua>
                <AquaButton>{t(`${currentStatics?.bestTerrain}`)}</AquaButton>
                <img
                  src={`/images/battles/${currentStatics?.bestTerrain.toLowerCase()}.png`}
                  alt={t(`${currentStatics?.bestTerrain}`)}
                />
              </GladiatorAqua>
            </GladiatorAquaStats>
            <GladiatorEquipments>
              {/* {images.length > 0 ?
              images.map(image => <img src={`${image}`} alt="Equipment" />)
            : null  
            } */}
              {battleImages &&
                battleImages.length > 0 &&
                battleImages.map((image, index) => (
                  <GladiatorEquip key={index} onClick={() => handleSelectBattleEquipment(image[0])}>
                    <AttackBackground style={{ position: 'relative' }}>
                      {image.length > 1 && <EquipmentLabel>{image.length}</EquipmentLabel>}
                      <img src={image[0]} alt="Equipment" />
                    </AttackBackground>
                  </GladiatorEquip>
                ))}
            </GladiatorEquipments>
            <GladiatorEquipments>
              {defenseImages &&
                defenseImages.length > 0 &&
                defenseImages.map((image, index) => (
                  <GladiatorEquip key={index} onClick={() => handleSelectDefenseEquipment(image[0])}>
                    <AttackBackground style={{ position: 'relative' }}>
                      {image.length > 1 && <EquipmentLabel>{image.length}</EquipmentLabel>}
                      <img src={image[0]} alt="Equipment" />
                    </AttackBackground>
                  </GladiatorEquip>
                ))}
            </GladiatorEquipments>
            <GladiatorEquipments>
              {animalImages &&
                animalImages.length > 0 &&
                animalImages.map((image, index) => (
                  <GladiatorEquip key={index} onClick={() => handleSelectAnimalEquipment(image[0])}>
                    <AttackBackground style={{ position: 'relative' }}>
                      {image.length > 1 && <EquipmentLabel>{image.length}</EquipmentLabel>}
                      <img src={image[0]} alt="Equipment" />
                    </AttackBackground>
                  </GladiatorEquip>
                ))}
            </GladiatorEquipments>
          </GladiatorView>
          {nextStep ? (
            <GladiatorStatistics>
              <StatsTabs>{t('STATISTICS')}</StatsTabs>
              <PointsHeading>Champion</PointsHeading>
              <GladiatorStatisticss />
              <ControlButtons>
                <TabsTwo background={'/images/battles/blue.png'} onClick={handleNext}>
                  {t('Next')}
                </TabsTwo>
              </ControlButtons>
            </GladiatorStatistics>
          ) : (
            <GladiatorStatistics>
              <StatisticsScrollableRight>
                <Apex>My Denarius</Apex>
                <ApexToken>
                  {account.substring(0, 6)}.....{account.substring(account.length - 4, account.length)}
                </ApexToken>
                <ApexValue>
                  {denaBalance}
                  <TokenImage src="/images/tokens/dena.svg" alt="DENA TOKEN" />
                </ApexValue>
                <Jackpot>{t('How many rounds would you like to play?')}</Jackpot>
                <BetAmount>
                  <BetButton onClick={() => setSelectedRounds(Math.max(0, selectedRounds - 1))}>-</BetButton>
                  <JackpotValue>
                    {selectedRounds} rounds of {totalRounds}
                    <TokenImage src="/images/tokens/dena.svg" alt="DENA TOKEN" />
                  </JackpotValue>
                  <BetButton onClick={() => setSelectedRounds(selectedRounds + 1)}>+</BetButton>
                </BetAmount>
                {/* <EquipmentsList> */}
                <BattleEquip>
                  {selectedBattleEquipment ? (
                    <EquipmentText>
                      <AttackBackground>
                        <img src={selectedBattleEquipment?.imagePath} alt="Equipment" />
                      </AttackBackground>
                      <Text fontWeight="bold" mt="2px">
                        Attack
                      </Text>
                    </EquipmentText>
                  ) : (
                    <EquipmentText>
                      <img src="/images/battles/1.png" alt="Equipment" width="70px" height="70px" />
                      <Text fontWeight="bold" mt="2px">
                        Attack
                      </Text>
                    </EquipmentText>
                  )}
                  {selectedDefenseEquipment ? (
                    <EquipmentText>
                      <AttackBackground>
                        <img src={selectedDefenseEquipment?.imagePath} alt="Equipment" />
                      </AttackBackground>
                      <Text fontWeight="bold" mt="2px">
                        Defense
                      </Text>
                    </EquipmentText>
                  ) : (
                    <EquipmentText>
                      <img src="/images/battles/1.png" alt="Equipment" width="70px" height="70px" />
                      <Text fontWeight="bold" mt="2px">
                        Defense
                      </Text>
                    </EquipmentText>
                  )}
                  {selectedAnimalEquipment ? (
                    <EquipmentText>
                      <AttackBackground>
                        <img src={selectedAnimalEquipment?.imagePath} alt="Equipment" />
                      </AttackBackground>
                      <Text fontWeight="bold" mt="2px">
                        Animals
                      </Text>
                    </EquipmentText>
                  ) : (
                    <EquipmentText>
                      <img src="/images/battles/1.png" alt="Equipment" width="70px" height="70px" />
                      <Text fontWeight="bold" mt="2px">
                        Animals
                      </Text>
                    </EquipmentText>
                  )}
                </BattleEquip>
                <Flex flexDirection="column">
                  <NewText mt="15px" color="#c09451">
                    Potential Attack Points: {potentialAttackPoints}
                  </NewText>
                  <NewText mt="15px" color="#c09451">
                    Potential Defense Points: {potentialDefensePoints}
                  </NewText>
                </Flex>
              </StatisticsScrollableRight>
              <ControlButtons>
                <TabsTwo background={'/images/battles/blue.png'} style={{ marginRight: '20px' }} onClick={handleBack}>
                  {t('Back')}
                </TabsTwo>
                <TabsTwo onClick={handlePayDenaToGoToBattle} background={'/images/battles/red.png'}>
                  {t(`${selectedRounds * totalRounds || 0} DENA Go!`)}
                </TabsTwo>
              </ControlButtons>
            </GladiatorStatistics>
          )}
        </GladiatorBattlePrepare>
      </BackgroundImage>
    </>
  )
}

export default Battles
