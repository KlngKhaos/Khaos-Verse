import React from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text, Button, useModal, Modal } from '@pancakeswap/uikit'
import { CommunityTag, CoreTag, PartnerTag } from 'components/Tags'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import tokens from 'config/constants/tokens'
import { useCakeVault } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import { convertSharesToCake } from 'views/Pools/helpers'
import AprRow from '../PoolCard/AprRow'
import { StyledCard } from '../PoolCard/StyledCard'
import CardFooter from '../PoolCard/CardFooter'
import StyledCardHeader from '../PoolCard/StyledCardHeader'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCakeProfitRow from './RecentCakeProfitRow'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransactionToBuyJoinNft'
import { useNrt, useGladiatorEquipment } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from '@ethersproject/constants'
import { parseUnits } from '@ethersproject/units'
import useToast from 'hooks/useToast'
import pinataSdk from '@pinata/sdk'
import useStore from "../../../../views/PoolTour3D/store"
import { useLocation } from 'react-router-dom'
import { useGladiatorNft } from 'hooks/useContract'
import { useEffect } from 'react'
import StakeWithdrawModal from '../PoolCard/StakeWithdrawModal'
const StyledCardBody = styled(CardBody) <{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`
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

interface CakeVaultProps {
  pool: DeserializedPool
  showStakedOnly: boolean
  index: any
}

const CakeVaultCard: React.FC<CakeVaultProps> = ({ pool, showStakedOnly, index }) => {
  // console.log("indexxxxx", index)
  const { currentStatics } = useStore(state => state)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
    pricePerFullShare,
  } = useCakeVault()

  const location = useLocation()
  const gladiatorNftContract = useGladiatorNft()
  let room = `room${index}`
  let roomId = String(room)

  const stakeArenaPools = async () => {
    // console.log('location',location)
  
  // console.log(roomId);
  
    const data = await gladiatorNftContract.getUserGladiator(account)
    // console.log("data", data);
    for (let i = 0; i < data.length; i++) {
      const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
      console.log("userInfo", userInfo);
      const stakeArena = await gladiatorNftContract.stakeArenaPools(currentStatics?.tokenId, roomId )
    console.log('roomz',stakeArena);
    }
    try {
    const stakeArena = await gladiatorNftContract.stakeArenaPools(currentStatics?.tokenId, roomId )
    console.log('room',stakeArena);
    const data = await gladiatorNftContract.getUserGladiator(account)
        for (let i = 0; i < data.length; i++) {
          const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
          // console.log("userInfo", userInfo);
        }
    } catch (error) {
      // console.log(error, "stake");
    }
  
  
    }

    useEffect(()=>{
      if(location.state!=undefined)
      console.log('useEffectttttt');
      // stakeArenaPools()
    }, [])

    const [withdraw] = useModal(
      <StakeWithdrawModal id={index} />
    )
    

  const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare)

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }


  // const [withdraw] = useModal(
  //   <NewModal title="Withdraw Gladiator">
  //     <CardFlip>
  //       <InnerCard>
  //         <CardFront>
  //           <img src="/gallery/heimjil/preview.png" alt="nft.name" style={{ width: "auto", height: "300px" }} />
  //           <Button variant="primary" mt="15px" style={{ backgroundColor: "green" }}>Claim Gladiator</Button>
  //         </CardFront>
  //       </InnerCard>
  //     </CardFlip>
  //   </NewModal>,
  // )

  return (
    <NewStyledCard isActive>
      {/* Previous Card Design */}
      {/* <StyledCardHeader
        isStaking={accountHasSharesStaked}
        isAutoVault
        earningToken={tokens.dena}
        stakingToken={tokens.dena}
      />
      <StyledCardBody isLoading={isLoading}>
        <AprRow pool={pool} stakedBalance={cakeAsBigNumber} performanceFee={performanceFeeAsDecimal} />
        <Box mt="24px">
          <RecentCakeProfitRow />
        </Box>
        <Box mt="8px">
          <UnstakingFeeCountdownRow />
        </Box>
        <Flex mt="32px" flexDirection="column">
          {account ? (
            <VaultCardActions
              pool={pool}
              accountHasSharesStaked={accountHasSharesStaked}
              isLoading={isLoading}
              performanceFee={performanceFeeAsDecimal}
            />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </StyledCardBody> */}
      {/* New Card Design */}
      <ImageHeader>
        <img src="/images/decorations/5.png" alt="BG" />
      </ImageHeader>
      <StyledCardHeader
        isStaking={accountHasSharesStaked}
        isAutoVault
        earningToken={tokens.dena}
        stakingToken={tokens.dena}
      />
      <CardBody>
        {/* <Flex flexDirection="column" justifyContent="end" alignItems="end">
          <Text mb="10px" textTransform="uppercase" fontSize="18px" color="secondary" bold>
            NRT - BNB LP
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
          <Text>23.75%</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt="5px">
          <Flex flexDirection="column">
            <Text color="secondary" fontSize="12px">{t('DENA EARNED')}</Text>
            <Text>0</Text>
            <Text color="secondary" fontSize="12px">{t('DENA-BNB LP STAKED')}</Text>
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

export default CakeVaultCard
