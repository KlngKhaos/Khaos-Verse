import BigNumber from 'bignumber.js'
import React,{useState} from 'react'
import styled from 'styled-components'
import { CardBody, Flex, Text, CardRibbon, Button, useModal, Modal } from '@pancakeswap/uikit'
import { CommunityTag, CoreTag, PartnerTag } from 'components/Tags'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { BIG_ZERO } from 'utils/bigNumber'
import { DeserializedPool } from 'state/types'
// import AprRow from './AprRow'
import { StyledCard } from './StyledCard'
import CardFooter from './CardFooter'
import StyledCardHeader from './StyledCardHeader'
import CardActions from './CardActions'
import { useGladiatorNft } from 'hooks/useContract'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import useStore from '../../../PoolTour3D/store'
import StakeWithdrawModal from './StakeWithdrawModal'
import { useLocation } from 'react-router-dom'

const NewStyledCard = styled(StyledCard)`
  min-width: 280px;
  max-width: 31.5%;
  width: 100%;
  margin: 0 8px;
  margin-bottom: 32px;
`
const ImageHeader = styled.div`
  background-color: #000;
`
const HarvestButton = styled(Button)`
  background-color: #D9AB3A;
`
const ClaimButton = styled(Button)`
background-color: white;
  
`
const NewModal = styled(Modal)`
  height: 500px;
  width: 420px;
  overflow-x: hidden;
`
const CardFlip = styled.div`
  background-color: transparent;
  width: 100%;
  height: 400px;
  perspective: 1000px;
`
const CardFront = styled.div`
  align-items: center;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  & > div {
    flex: 1;
  }
`
const InnerCard = styled.div`
  height: 100%;
  position: relative;
`

const PoolCard: React.FC<{ pool: DeserializedPool; account: string; index: number; }> = ({ pool, account, index }) => {
  console.log("iddddddddddddddddddddd",index)
const [reward, setReward] = useState(0)
   const [image, setImage] = useState('')
  interface tokenIdI {
    room0: any
    room1: any
    room2: any
    room3: any
  }
  const initialState: tokenIdI = {
    room0: [],
    room1: [],
    room2: [],
    room3: [],
  }
  
  const [tokenId, setTokenId] = useState<tokenIdI>(initialState)
const gladiatorNftContract = useGladiatorNft()

  const withdrawalStake = async () => {

    const data = await gladiatorNftContract.getUserGladiator(account)
    console.log('dataaaa', data)
    for (let i = 0; i < data.length; i++) {
      console.log('FUNCTION WORKING')
      const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
      const claim = userInfo.spot
      const tokenIdCopy = { ...tokenId }
      if (claim === 'room0') {
        tokenIdCopy.room0.push(parseInt(data[i]._hex.toString(), 16))
      }
      if (claim === 'room1') {
        tokenIdCopy.room1.push(parseInt(data[i]._hex.toString(), 16))
      }
      if (claim === 'room2') {
        tokenIdCopy.room2.push(parseInt(data[i]._hex.toString(), 16))
      }
      if (claim === 'room3') {
        tokenIdCopy.room3.push(parseInt(data[i]._hex.toString(), 16))
      }

      setTokenId(tokenIdCopy)
    }
  }
  let idOfGladiator = tokenId[`room${index}`]
  const location = useLocation()
// console.log('location',location)
let room = `room${index}`
let roomId = String(room)
// console.log(roomId);



  const currentStatics = useStore((state) => state.currentStatics)
  // console.log("tokenid", currentStatics?.tokenId);
// console.log(account);
  // console.log(gladiatorNftContract, 'contract');
const stakeArenaPools = async () => {
  // console.log('location',location)

// console.log(roomId);

  const data = await gladiatorNftContract.getUserGladiator(account)
  // console.log("data", data);
  for (let i = 0; i < data.length; i++) {
    const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
    const stakeArena = await gladiatorNftContract.stakeArenaPools(currentStatics?.tokenId, roomId )
  }
  try {
  const stakeArena = await gladiatorNftContract.stakeArenaPools(currentStatics?.tokenId, roomId )
  const data = await gladiatorNftContract.getUserGladiator(account)
      for (let i = 0; i < data.length; i++) {
        const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
        // console.log("userInfo", userInfo);
      }
  } catch (error) {
  }


  }



useEffect(()=>{
  if(location.state!=undefined)
  console.log('useEffectttttt');
  // stakeArenaPools()
}, [gladiatorNftContract, account])

useEffect(()=>{
  withdrawalStake()
},[gladiatorNftContract, account])


  const { sousId, stakingToken, earningToken, isFinished, userData, arena } = pool
  const { t } = useTranslation()

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)
  const [show, setShow] = useState(false)
  const [withdraw] = useModal(
    <StakeWithdrawModal id={index} />
  )


  const rewards = async () => {
    setReward(0)
    let totalAward= 0;
    let idOfGladiator = tokenId[`room${index}`]
    for (let i = 0; i < idOfGladiator.length; i++) {
  let checkReward =await gladiatorNftContract.checkReward(idOfGladiator[i])
    checkReward = parseInt(checkReward._hex.toString(), 16)
    totalAward=(totalAward+checkReward)/100000000000000000
    setReward(totalAward)
  console.log("rewardddddddddddd", checkReward, `room${index}`);
  console.log("rewardddddddddddd idddd", idOfGladiator[i], tokenId);
    }

  }
  
  useEffect(()=> {
     rewards()
  }, [tokenId])


  return (
    <NewStyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={t('Finished')} />}
    >
      {/* <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
        arenaId={arena.id}
        cardTextColor={arena.cardTextColor}
      />
      <CardBody>
        <AprRow pool={pool} stakedBalance={stakedBalance} />
        <Flex mt="24px" flexDirection="column">
          {account ? (
            <CardActions pool={pool} stakedBalance={stakedBalance} />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </CardBody> */}
      {/* New Card Design */}
      <ImageHeader>
        <img src={`/images/decorations/${index}.png`} alt="BG" />
      </ImageHeader>
      <StyledCardHeader
        isStaking={accountHasStakedBalance}
        earningToken={earningToken}
        stakingToken={stakingToken}
        isFinished={isFinished && sousId !== 0}
        arenaId={arena.id}
      // cardTextColor={arena.cardTextColor}
      />
      <CardBody>
        {/* <Flex flexDirection="column" justifyContent="end" alignItems="end">
          <Text mb="10px" textTransform="uppercase" fontSize="18px" color="secondary" bold>
            ARENA - PYRAM LP
          </Text>
          <Flex flexDirection="row">
            <CoreTag />
            <Tag ml="8px" variant="secondary">
              <Text color="background">
                {t('64X')}
              </Text>
            </Tag>
          </Flex>
        </Flex> */}
        <Flex justifyContent="space-between">
          <Text>{t('APR')}:</Text>
          <Text>{reward}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt="5px">
          <Flex flexDirection="column">
            <Text color="secondary" fontSize="12px">{t('DENA EARNED')}</Text>
            <Text>0</Text>
            <Text color="secondary" fontSize="12px">{t('DENA-BNB LPdsd STAKED')}</Text>
          </Flex>
        { currentStatics?.tokenId && location.state!=undefined ?
          <HarvestButton onClick={stakeArenaPools}>
            <Text color="background">
              {t('Stake')}
            </Text>
          </HarvestButton> :
          <ClaimButton onClick={withdraw}>
            <Text color="background">
              {t('Claim')}
            </Text>
          </ClaimButton>}
        </Flex>
        <Flex justifyContent="center" mt="24px">
          {!account && <ConnectWalletButton style={{ width: '100%' }}>
            <Text color="background">
              {t('Connect Wallet')}
            </Text>
          </ConnectWalletButton>}
        </Flex>
      </CardBody>
      <CardFooter pool={pool} account={account} />
    </NewStyledCard>
  )
}

export default PoolCard
