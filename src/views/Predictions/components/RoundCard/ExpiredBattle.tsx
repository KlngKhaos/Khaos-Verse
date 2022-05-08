import React, { useEffect, useRef, useState } from 'react'
import { useCountUp } from 'react-countup'
import {
  Card,
  CardBody,
  Flex,
  PlayCircleOutlineIcon,
  Skeleton,
  Text,
  TooltipText,
  useTooltip,
  BlockIcon,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled, { keyframes } from 'styled-components'
import RoundProgress from 'components/RoundProgress'
import CardHeader from './CardHeader'
import { getSpecificJoinPageNfts, getSpecificGladiators2 } from 'state/nftMarket/helpers'
import { useBattleNft, usePredictionNft } from 'hooks/useContract'
import galleryNfts from 'config/constants/gallery/gallery'
import { current } from '@reduxjs/toolkit'
import { ethers } from "ethers"

import GladiatorAttributesRow from './GladiatorAttributesRow'
import EquipmentImages from './EquipmentImages'

const NewCard = styled(Card)`
  opacity: 0.8;
  width: 700px;
  height: auto;
  margin-right: 20px;
`
const CardInner = styled.div`
  padding: 0px 12px 0px 12px;
  background-image: url(/images/battles/card-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
`
const GladiatorBattle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //   align-items: center;
`
const GladiatorWar = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(/images/battles/center-ngg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
`
const GladiatorRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  & img {
    height: 200px;
    margin-top: 30px;
  }
`
const GladiatorLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  & img {
    height: 200px;
    margin-top: 30px;
  }
`
const Bet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-image: url(/images/battles/button-bg2.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 175px;
  height: 36px;
  font-size: 20px;
  margin-top: 12px;
  color: #fff;
`
const BetValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 0px 10px 0px 10px;
`
const TokenImage = styled.img`
  width: 32px;
  margin-left: 10px;
`
const Statistics = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
  margin-left: 40px;
`
const Heading1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0px 0px 25px;
  white-space: nowrap;
`
const Heading2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin: 15px 15px 0px 0px;
  white-space: nowrap;
`
const ArenaTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  // width: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 20px 10px 25px;
`
const Time = styled.div`
  color: #7d91ad;
  font-size: 18px;
  font-weight: bold;
  margin-left: 30px;
`
const GladiatorsStats = styled.div`
  margin-top: 12px;
  width: 85%;
  height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
`
const Attribute = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #c09451;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`
const Value = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #7d91ad;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
`
const GladiatorAttributes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px 0px 6px;
`
const RightValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  color: #7d91ad;
  font-size: 16px;
  white-space: nowrap;
`
const LeftValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  color: #7d91ad;
  font-size: 16px;
`
const Gladiators = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   margin-top: 20px;
`
const OpponentGladiator = styled.div`
  color: #7d91ad;
  font-size: 26px;
  font-weight: bold;
  //   width: 30%;
  white-space: nowrap;
`
const VsImage = styled.div`
  width: 50px;
`
const MyGladiator = styled.div`
  color: #7d91ad;
  font-size: 26px;
  font-weight: bold;
  //   width: 30%;
  display: flex;
  justify-content: end;
  white-space: nowrap;
`
const GladiatorArena = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`
const ArenaHeading = styled.div`
  color: #7d91ad;
  font-size: 32px;
  font-weight: bold;
`
const ArenaImage = styled.div`
  width: 280px;
  height: auto;
  margin-top: 0px;
  position: relative;

  & img:nth-child(1) {
    position: absolute;
    top: -45px;
    right: -30px;
  }

  & img:nth-child(2) {
    padding: 0px 0px 0px 15px;
    height: 120px !important;
    width: 100%;
    object-fit: cover;
  }
`
const IconImage = styled.img`
  width: 24px;
`

const GladiatorEquipments = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // flex-wrap: wrap;
  & img {
    width: 50px;
    height: 50px;
    margin: 5px;
  }
  &::-webkit-scrollbar {
    background: : #7D91AD !important;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #7D91AD;
  }
`
const AttackLable = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url(/images/battles/red.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 120px;
  height: 27px;
  font-size: 20px;
  margin-top: 12px;
  color: #fff;
`
const DefenseLable = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url(/images/battles/blue.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 120px;
  height: 27px;
  font-size: 20px;
  margin-top: 12px;
  color: #fff;
`
const Progress = styled.div`
  height: 8px;
  width: 100%;
  background-color: #000;
`
const AttackWinner = styled.div`
  & img:nth-child(1) {
    position: relative;
    top: 0;
    left: 0;
  }
  & img:nth-child(2) {
    width: 150px;
    height: auto;
    position: absolute;
    top: 200px;
    left: 40px;
    opacity: 1 !important;
  }
`


const DefenceWinner = styled.div`
  & img:nth-child(1) {
    position: relative;
    top: 0;
    left: 0;
  }
  & img:nth-child(2) {
    width: 150px;
    height: auto;
    position: absolute;
    top: 200px;
    right: 15px;
    opacity: 1 !important;
  }
`

const AttackBackground = styled.div`
  background-image: url(/images/battles/1.png);
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 4px;
  margin: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & img {
    width: 35px;
    height: 35px;
    margin: 5px;
  }
`
const DefenseBackground = styled.div`
  background-image: url(/images/battles/2.png);
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 4px;
  margin: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & img {
    width: 35px;
    height: 35px;
    margin: 5px;
  }
`
const AnimalBackground = styled.div`
  background-image: url(/images/battles/3.png);
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 4px;
  margin: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & img {
    width: 35px;
    height: 35px;
    margin: 5px;
  }
`
const ResultsCard = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, .15);  
  backdrop-filter: blur(4px);
  top: 0;
  bottom: 0;
  left: 0; 
  right: 0; 
  margin: auto; 
  width: 330px;
  height: 185px;
  border-radius: 16px;
  border: 2px solid #D9AB3A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`

const ArenaPrize = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  color: #fff;
  font-size: 16px;
  margin: 0px 10px 30px 20px;
`

interface ExpiredBattleProps {
  currentBattle?: any
  remainingTime: any

}
const ExpiredBattle: React.FC<ExpiredBattleProps> = ({ currentBattle, remainingTime }) => {
  const { t } = useTranslation()
  // console.log("currentBattlecurrentBattle", currentBattle)
  const [attackerNft, setAttackerNft] = useState(null)
  const [defenderNft, setDefenderNft] = useState(null)
  const [areena, setAreena] = useState<string>("")
  const [winner, setWinner] = useState<string>("")
  const [attacker, setAttacker] = useState<string>("")
  const [defender, setDefender] = useState<string>("")
  const [attackerEquipmentsImages, setAttackerEquipmentsImages] = useState([])
  const [defenderEquipmentsImages, setDefenderEquipmentsImages] = useState([])
  const [totalRewardAmount, setTotalRewardAmount] = useState<string | number>(0)

  const battleContract = useBattleNft()
  const predictionNft = usePredictionNft()
  const getGladiatorsFromDb = async () => {
    try {
      findAmount()
      const attackerId = parseInt(currentBattle?.attackerId?._hex, 16)
      const defenderId = parseInt(currentBattle?.defenderId?._hex, 16)
      const gladiators = await getSpecificGladiators2([attackerId, defenderId])
      const attackerGladiator = gladiators.find((nft) => nft.tokenId == attackerId)
      const defenderGladiator = gladiators.find((nft) => nft.tokenId == defenderId)
      // get gladiator form config file
      const attackerFromConfig = galleryNfts.find((nft) => nft.name === attackerGladiator?.ipfsJson?.nft?.name)
      const defenderFromConfig = galleryNfts.find((nft) => nft.name === defenderGladiator?.ipfsJson?.nft?.name)
      setAttackerNft(attackerFromConfig)
      setDefenderNft(defenderFromConfig)
      const attackerPlayer = await battleContract.playerInfo(currentBattle.attacker.toString())
      const attackerAttackId = parseInt(attackerPlayer?.attackEqId?._hex, 16)
      const attackerDefenseId = parseInt(attackerPlayer?.defenceEqId?._hex, 16)
      const attackerAnimalId = parseInt(attackerPlayer?.animalId?._hex, 16)
      // console.log("attackerPlayerattackerPlayerattackerPlayer", attackerPlayer);
      const attackerEquipments = await getSpecificJoinPageNfts([attackerAttackId, attackerDefenseId, attackerAnimalId])
      setAttackerEquipmentsImages(
        attackerEquipments.map((eq) => {
          return {
            image: eq?.ipfsJson?.imagePath,
            type: eq?.ipfsJson?.type,
            name: eq?.ipfsJson?.name,
            agility: eq?.ipfsJson?.agility,
            coach: eq?.ipfsJson?.coach,
            cook: eq?.ipfsJson?.cook,
            dual: eq?.ipfsJson?.dual,
            endurance: eq?.ipfsJson?.endurance,
            intelligance: eq?.ipfsJson?.intelligance,
            leadership: eq?.ipfsJson?.leadership,
            level: eq?.ipfsJson?.level,
            medical: eq?.ipfsJson?.medical,
            onehand: eq?.ipfsJson?.onehand,
            polearms: eq?.ipfsJson?.polearms,
            precision: eq?.ipfsJson?.precision,
            range: eq?.ipfsJson?.range,
            shield: eq?.ipfsJson?.shield,
            smith: eq?.ipfsJson?.smith,
            strength: eq?.ipfsJson?.strength,
            torture: eq?.ipfsJson?.torture,
            twohand: eq?.ipfsJson?.twohand,
            willpower: eq?.ipfsJson?.willpower,
          }
        }),
      )
      // console.log("attackerEquipmentsattackerEquipments", attackerEquipments);
      const defenderPlayer = await battleContract.playerInfo(currentBattle.defender.toString())
      // console.log("defenderPlayerdefenderPlayerdefenderPlayer", defenderPlayer);

      const defenderAttackId = parseInt(defenderPlayer?.attackEqId?._hex, 16)
      const defenderdefenseId = parseInt(defenderPlayer?.defenceEqId?._hex, 16)
      const defenderAnimalId = parseInt(defenderPlayer?.animalId?._hex, 16)
      const defenderEquipments = await getSpecificJoinPageNfts([defenderAttackId, defenderdefenseId, defenderAnimalId])
      // console.log("defenderEquipmentsdefenderEquipments", defenderEquipments);
      setDefenderEquipmentsImages(
        defenderEquipments.map((eq) => {
          return {
            image: eq?.ipfsJson?.imagePath,
            type: eq?.ipfsJson?.type,
            name: eq?.ipfsJson?.name,
            agility: eq?.ipfsJson?.agility,
            coach: eq?.ipfsJson?.coach,
            cook: eq?.ipfsJson?.cook,
            dual: eq?.ipfsJson?.dual,
            endurance: eq?.ipfsJson?.endurance,
            intelligance: eq?.ipfsJson?.intelligance,
            leadership: eq?.ipfsJson?.leadership,
            level: eq?.ipfsJson?.level,
            medical: eq?.ipfsJson?.medical,
            onehand: eq?.ipfsJson?.onehand,
            polearms: eq?.ipfsJson?.polearms,
            precision: eq?.ipfsJson?.precision,
            range: eq?.ipfsJson?.range,
            shield: eq?.ipfsJson?.shield,
            smith: eq?.ipfsJson?.smith,
            strength: eq?.ipfsJson?.strength,
            torture: eq?.ipfsJson?.torture,
            twohand: eq?.ipfsJson?.twohand,
            willpower: eq?.ipfsJson?.willpower,
          }
        }),
      )
    } catch (error) {
      console.log('errorrrr', error)
    }
  }
  // console.log("attackerEquipmentsImagesattackerEquipmentsImages", attackerEquipmentsImages);
  // console.log("defenderEquipmentsImagesdefenderEquipmentsImages", defenderEquipmentsImages);
  useEffect(() => {
    if (currentBattle) {
      getGladiatorsFromDb()
    }
  }, [currentBattle])
  // useEffect(() => {
  //   if(attackerNft && defenderNft){
  //     console.log("attackerNftattackerNft", attackerNft);
  //     console.log("defenderNftdefenderNft", defenderNft);
  //   }
  // }, [attackerNft, defenderNft])

  const findAmount = async () => {
    const totalReward = await predictionNft.rounds(currentBattle.round.toString())
    // console.log("totalReward", totalReward)
    const ethValue1 = ethers.utils.formatEther(totalReward.attackerAmount);
    const ethValue2 = ethers.utils.formatEther(totalReward.defenderAmount);
    setTotalRewardAmount(String(Number(ethValue1) + Number(ethValue2)))
  }
  const [tooltipName, setTooltipName] = useState("")

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t(tooltipName), {
    placement: 'bottom',
  })

  const { targetRef: left, tooltip: leftTooltip, tooltipVisible: leftTooltipVisible } = useTooltip(t(tooltipName), {
    placement: 'right',
  })

  const { targetRef: right, tooltip: rightTooltip, tooltipVisible: rightTooltipVisible } = useTooltip(t(tooltipName), {
    placement: 'bottom',
  })

  useEffect(() => {
    if (currentBattle) {
      setWinner(currentBattle?.winner || "")
      setDefender(currentBattle?.defender || "")
      setAttacker(currentBattle?.attacker || "")
    }
  }, [currentBattle])

  useEffect(() => {
    if (currentBattle) {
      if (currentBattle.arena === "Arles Arena") {
        setAreena("arles_arena")
      } else if (currentBattle.arena === "Ateia Trebellia") {
        setAreena("ateia_trebellia")
      } else if (currentBattle.arena === "Gladiator Arena") {
        setAreena("gladiator_arena")
      } else if (currentBattle.arena === "Matia Piso") {
        setAreena("matia_piso")
      } else if (currentBattle.arena === "Nimes Amphitheatre") {
        setAreena("nimes_amphitheatre")
      } else if (currentBattle.arena === "Nimes Amphitheatre") {
        setAreena("nimes_amphitheatre")
      }
      else {
        setAreena(currentBattle.arena)
      }


    }
  }, [currentBattle])
  return (
    <NewCard isActive>
      {tooltipVisible && tooltip}
      {leftTooltipVisible && leftTooltip}
      {rightTooltipVisible && rightTooltip}
      <CardHeader
        status="expired"
        icon={<BlockIcon mr="4px" width="21px" color="textDisabled" />}
        title={t('Expired')}
        epoch={Number(currentBattle.round)}
      />
      {/* <RoundProgress variant="flat" scale="sm" lockTimestamp={20} closeTimestamp={25} /> */}
      <CardInner>
        <GladiatorBattle>
          <GladiatorLeft>
            <AttackLable>{t('Attack')}</AttackLable>
            <AttackWinner>
              <img
                src={
                  attackerNft?.glTFPath
                    ? attackerNft?.glTFPath.replace('scene.gltf', 'preview.png')
                    : '/images/battles/left.png'
                }
                alt="Gladiator"
              />
              {
                attacker === winner ?
                  <img src="/images/battles/winner.png" alt="Gladiator" /> : null
              }
            </AttackWinner>

            <GladiatorEquipments>
              {/* {console.log("attackerEquipmentsImagesattackerEquipmentsImages", attackerEquipmentsImages)} */}
              <EquipmentImages data={attackerEquipmentsImages} />
            </GladiatorEquipments>
            <div ref={targetRef} onMouseEnter={() => { setTooltipName("Best terrain is " + (attackerNft?.bestTerrain)) }}>
              <img
                src={`/images/battles/${attackerNft?.bestTerrain === "Polar" ? "glacial".toLowerCase() : attackerNft?.bestTerrain.toLowerCase()}.png`}
                alt="Arena"
                style={{ height: "80px" }}
              />
            </div>
          </GladiatorLeft>
          <GladiatorWar>
            <Bet>
              <BetValue>{t('Bet')}</BetValue>
              <BetValue>{totalRewardAmount} DENA</BetValue>
            </Bet>
            <Statistics>{t('Statistics:')}</Statistics>
            <GladiatorsStats>
              <Text color="subtle" fontWeight="bold" ml="15px">{t('Attributes')}</Text>

              <GladiatorAttributesRow
                attacker={attackerNft?.attributes?.strength || 0}
                defender={defenderNft?.attributes?.strength || 0}
                image="/images/battles/icons/strength.png"
                tooltipValue="Strength"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.attributes?.endurance || 0}
                defender={defenderNft?.attributes?.endurance || 0}
                image="/images/battles/icons/endurance.png"
                tooltipValue="Endurance"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.attributes?.agility || 0}
                defender={defenderNft?.attributes?.agility || 0}
                image="/images/battles/icons/agility.png"
                tooltipValue="Agility"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.attributes?.precision || 0}
                defender={defenderNft?.attributes?.precision || 0}
                image="/images/battles/icons/precision.png"
                tooltipValue="Precision"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.attributes?.intelligance || 0}
                defender={defenderNft?.attributes?.intelligance || 0}
                image="/images/battles/icons/intelligence.png"
                tooltipValue="Intelligance"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.attributes?.willpower || 0}
                defender={defenderNft?.attributes?.willpower || 0}
                image="/images/battles/icons/willpower.png"
                tooltipValue="Willpower"
              />

              <Text color="subtle" fontWeight="bold" ml="15px" mt="8px" mb="4px">{t('Weapon Mastery')}</Text>

              <GladiatorAttributesRow
                attacker={attackerNft?.weapons?.oneHand || 0}
                defender={defenderNft?.weapons?.oneHand || 0}
                image="/images/battles/icons/one-handed.png"
                tooltipValue="One Hand"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.weapons?.twoHand || 0}
                defender={defenderNft?.weapons?.twoHand || 0}
                image="/images/battles/icons/two-handed.png"
                tooltipValue="Two Hand"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.weapons?.shield || 0}
                defender={defenderNft?.weapons?.shield || 0}
                image="/images/battles/icons/shield.png"
                tooltipValue="Shield"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.weapons?.ranged || 0}
                defender={defenderNft?.weapons?.ranged || 0}
                image="/images/battles/icons/ranged.png"
                tooltipValue="Ranged"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.weapons?.dual || 0}
                defender={defenderNft?.weapons?.dual || 0}
                image="/images/battles/icons/dual.png"
                tooltipValue="Dual"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.weapons?.polearms || 0}
                defender={defenderNft?.weapons?.polearms || 0}
                image="/images/battles/icons/polearms.png"
                tooltipValue="Polearms"
              />

              <Text color="subtle" fontWeight="bold" ml="15px" mt="8px" mb="4px">{t('Abilities')}</Text>

              <GladiatorAttributesRow
                attacker={attackerNft?.abilities?.leadership || 0}
                defender={defenderNft?.abilities?.leadership || 0}
                image="/images/battles/icons/leadership.png"
                tooltipValue="Leadership"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.abilities?.coach || 0}
                defender={defenderNft?.abilities?.coach || 0}
                image="/images/battles/icons/coach.png"
                tooltipValue="Coach"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.abilities?.cook || 0}
                defender={defenderNft?.abilities?.cook || 0}
                image="/images/battles/icons/cook.png"
                tooltipValue="Cook"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.abilities?.medical || 0}
                defender={defenderNft?.abilities?.medical || 0}
                image="/images/battles/icons/medical.png"
                tooltipValue="Medical"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.abilities?.smith || 0}
                defender={defenderNft?.abilities?.smith || 0}
                image="/images/battles/icons/smith.png"
                tooltipValue="Smith"
              />

              <GladiatorAttributesRow
                attacker={attackerNft?.abilities?.torture || 0}
                defender={defenderNft?.abilities?.torture || 0}
                image="/images/battles/icons/torture.png"
                tooltipValue="Torture"
              />

            </GladiatorsStats>
            <Statistics>{t('Trophies:')}</Statistics>
            <GladiatorEquipments>
              <img src="/images/battles/gladiator-equipment.png" alt="Equipment" />
              <img src="/images/battles/gladiator-equipment.png" alt="Equipment" />
              <img src="/images/battles/gladiator-equipment.png" alt="Equipment" />
              <img src="/images/battles/gladiator-equipment.png" alt="Equipment" />
            </GladiatorEquipments>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
              {/* <Heading>
              {t('Enroll Timer: 1')}
            </Heading>
            <Heading>
              {t('Attraction: 257')}
            </Heading> */}
            </Flex>
            <GladiatorArena>
              <ArenaImage>
                <ArenaTitle>{t(`Arena: ${currentBattle.arena.charAt(0).toUpperCase().replaceAll('_', ' ') + currentBattle.arena.slice(1)}`)}</ArenaTitle>
                <ArenaPrize>{t('Arena Incentive Prize: 100 DENA')}</ArenaPrize>
                <ArenaImage>
                  <div ref={left} onMouseEnter={() => { setTooltipName("Terrain is " + (currentBattle?.terrain)) }}>
                    <img
                      src={`/images/battles/${currentBattle?.terrain === "Polar" ? "glacial".toLowerCase() : currentBattle?.terrain?.toLowerCase()}.png`}
                      alt="Arena"
                      style={{ height: "80px", marginLeft: "50px" }}
                    />
                  </div>
                  <img src={`/images/arenas/${areena.toLowerCase()}.jpg`} alt="Arena" />
                </ArenaImage>
              </ArenaImage>
            </GladiatorArena>
          </GladiatorWar>
          <GladiatorRight>
            <DefenseLable>{t('Defense')}</DefenseLable>

            <DefenceWinner>
              <img
                src={
                  defenderNft?.glTFPath
                    ? defenderNft?.glTFPath.replace('scene.gltf', 'preview.png')
                    : '/images/battles/right.png'
                }
                alt="Gladiator"
              />
              {
                defender == winner ?
                  <img src="/images/battles/winner.png" alt="Gladiator" /> : null

              }
            </DefenceWinner>
            <GladiatorEquipments>
              <EquipmentImages data={defenderEquipmentsImages} />
            </GladiatorEquipments>
            <div ref={right} onMouseEnter={() => { setTooltipName("Best terrain is " + (defenderNft?.bestTerrain)) }}>
              <img
                src={`/images/battles/${defenderNft?.bestTerrain === "Polar" ? "glacial".toLowerCase() : defenderNft?.bestTerrain.toLowerCase()}.png`}
                alt="Arena"
                style={{ height: "80px" }}
              />
            </div>
          </GladiatorRight>
        </GladiatorBattle>
        <ResultsCard>
          <Text textAlign="left" fontWeight="bold" fontSize="20px" width="100%" color="#D9AB3A">{t('Closed Price')}</Text>
          <Flex width="100%" justifyContent="space-between" mt="15px">
            <Text fontSize="18px">{t('Locked Price:')}</Text>
            <Text fontSize="18px">455.67 DENA</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" mt="8px">
            <Text fontWeight="bold" fontSize="18px">{t('Prize Pool:')}</Text>
            <Text fontWeight="bold" fontSize="18px">75.34 DENA</Text>
          </Flex>
        </ResultsCard>
      </CardInner>
    </NewCard >
  )
}

export default ExpiredBattle
