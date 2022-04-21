import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  Flex,
  PlayCircleOutlineIcon,
  Skeleton,
  Text,
  TooltipText,
  useTooltip,
  WaitIcon,
  useModal,
  Modal,
  Button,
  ArrowBackIcon,
  IconButton,
  BinanceIcon,
  BalanceInput,
  Slider,
  Box,
  AutoRenewIcon,
} from '@pancakeswap/uikit'
import styled, { keyframes } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useBattleNft, usePredictionNft, useCake } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import { parseUnits } from '@ethersproject/units'
import { ethersToBigNumber } from 'utils/bigNumber'
3
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from '@ethersproject/constants'
import { ethers } from "ethers"

interface ModalComponentProps {
  onDismiss?: () => void
  currentBattle: any
  findAmount: any
  totalRewardAmount: string | number
  secondsRemaining?: number

}




const NewModal = styled(Modal)`
  height: 440px;
  width: 420px;
  overflow-x: hidden;
`
const CardFlip = styled.div`
  background-color: transparent;
  width: 100%;
  height: 300px;
  // cursor: pointer;
  perspective: 1000px;
`
const InnerCard = styled.div<{ clicked: boolean }>`
  // position: relative;
  // width: 100%;
  // height: 100%;
  // text-align: center;
  // transition: transform 1s;
  // transform-style: preserve-3d;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  
  // &:hover {
  //     transform: rotateY(180deg);
  // }

  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 600ms;
`
const CardFront = styled.div`
  // position: absolute;
  // width: 100%;
  // height: 100%;
  // backface-visibility: hidden;
  // color: black;
  // z-index: 2;
  // border-radius: 5px;
  // padding: 5px;

  align-items: center;
  backface-visibility: hidden;
  display: flex;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: z-index 600ms;
  width: 100%;

  & > div {
    flex: 1;
  }
`
const PrizeCard = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  // opacity: 0.8;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 2px solid #D9AB3A;
  padding: 32px;
`
const PrizeHeading = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 500;
`
const EnterAttack = styled.div`
  background-image: url(/images/battles/red.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 320px;
  height: 72px;
  opacity: 1 !important;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  &:hover {
    cursor: pointer;
  }
`
const EnterDefense = styled.div`
  background-image: url(/images/battles/blue.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 320px;
  height: 72px;
  opacity: 1 !important;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  &:hover {
    cursor: pointer;
  }
`
const CardBack = styled(CardFront)`
  // position: absolute;
  // width: 100%;
  // height: 100%;
  // backface-visibility: hidden;
  // color: white;
  
  // transform: rotateY(180deg);
  // z-index: 1;
  // border-radius: 5px;

  transform: rotateY(180deg);
`

const BetInput = styled(BalanceInput)`
  input {
    color: white !important;
  }
`

const ModalComponent: React.FC<ModalComponentProps> = ({ onDismiss, currentBattle, findAmount, totalRewardAmount, secondsRemaining }) => {
  const [amount, setAmount] = useState<string>("")
  const [denaBalance, setDenaBalance] = useState<number>(0)

  const { t } = useTranslation()
  const [flip, setFlip] = useState(false);
  const [hide, setHide] = useState(false);
  const battleContract = useBattleNft()
  const predictionContract = usePredictionNft()
  const cakeContract = useCake()
  const { account } = useWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastInfo, toastSuccess, toastError } = useToast()
  const [selectedType, setSelectedType] = useState("")
  const handleClick = (value1) => {
    // setFlip(!flip);
    const card = document.getElementById("card")
    if (value1 === "backAttack") {
      card.style.transform = "rotateY(180deg)"
      setSelectedType("Attack")
    } else if (value1 === "backDefense") {
      card.style.transform = "rotateY(180deg)"
      setSelectedType("Defense")
    } else if (value1 === "front") {
      card.style.transform = "rotateY(0deg)"
    }
    setAmount("")
  }
  const {
    isApproving: isAttackerApproving,
    isApproved: isAttackerApproved,
    isConfirmed: isAttackerConfirmed,
    isConfirming: isAttackerConfirming,
    handleApprove: attackerHandleApprove,
    handleConfirm: attackerHandleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await cakeContract.allowance(account, predictionContract.address)
        const currentAllowance = ethersToBigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return callWithGasPrice(cakeContract, 'approve', [predictionContract.address, MaxUint256.toString()])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(t('Contract approved'))
    },
    onConfirm: async () => {
      // console.log(" parseUnits((selectedRounds * totalRounds).toString() )",  parseUnits((selectedRounds * totalRounds).toString() ));
      try {
        // console.log("amountttttttttttttttttttttttttttttttt", amount)
        const ethToWei = ethers.utils.parseEther(amount)
        const data = await callWithGasPrice(predictionContract, 'betAttacker', [
          currentBattle.round.toString(),
          // value.toString() ,
          parseInt(ethToWei._hex, 16).toString()
        ])
        return data
      } catch (error: any) {
        console.log("errorrrrrrrrrrrrrr", error)
        throw new Error(error)
      }
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(t(`You have bet on ${selectedType} successfully`))
      onDismiss()
    },
  })
  // const ethToWei = ethers.utils.parseEther('0.00000123')
  // console.log("ethToWeiethToWeiethToWeiethToWei", parseInt(ethToWei._hex, 16).toString())

  const {
    isApproving: isDefenderApproving,
    isApproved: isDefenderApproved,
    isConfirmed: isDefenderConfirmed,
    isConfirming: isDefenderConfirming,
    handleApprove: defenderHandleApprove,
    handleConfirm: defenderHandleConfirm,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response = await cakeContract.allowance(account, predictionContract.address)
        const currentAllowance = ethersToBigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return callWithGasPrice(cakeContract, 'approve', [predictionContract.address, MaxUint256.toString()])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(t('Contract approved'))
    },
    onConfirm: async () => {
      // console.log(" parseUnits((selectedRounds * totalRounds).toString() )",  parseUnits((selectedRounds * totalRounds).toString() ));

      try {

        const ethToWei = ethers.utils.parseEther(amount.toString())
        const data = await callWithGasPrice(predictionContract, 'betDefender', [
          currentBattle.round.toString(),
          parseInt(ethToWei._hex, 16).toString()

        ])
        return data
      } catch (error: any) {
        throw new Error(error)
      }
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(t(`You have bet on ${selectedType} successfully`))
      onDismiss()
    },
  })

  const handleInputChange = (e) => {
    setAmount(e)
  }
  const handleBet = () => {
    // console.log("selectedType", selectedType)
    // console.log("input", input)
    payBitAmount({ type: selectedType })
  }

  const handleClickOnAttackBtn = () => {
    if (!isAttackerApproved) {
      attackerHandleApprove()
    } else {
      attackerHandleConfirm()
      findAmount()
    }
  }
  const handleClickOnDefenseBtn = () => {

    if (!isDefenderApproved) {
      defenderHandleApprove()
    } else {
      defenderHandleConfirm()
      findAmount()

    }
  }
  const payBitAmount = ({ type }) => {
    if (type === "Attack") {
      handleClickOnAttackBtn()
    } else if (type === "Defense") {
      handleClickOnDefenseBtn()
    }
  }
  useEffect(() => {
    if (secondsRemaining <= 12) {
      // console.log("onDismissonDismissonDismiss")
      onDismiss()
    }
  }, [secondsRemaining])

  useEffect(() => {
    if (account) {
      (async () => {
        const amount = await cakeContract?.balanceOf(account)
        const ethValue = ethers.utils.formatEther(amount);
        setDenaBalance(Number(ethValue))
      })()
    }
  }, [account])
// console.log("denaBalancedenaBalancedenaBalancedenaBalance", denaBalance)
  return (
    <NewModal title="Place a bet" onDismiss={onDismiss}>
      <CardFlip>
        <InnerCard clicked={flip} id="card">
          <CardFront>
            <PrizeCard >
              <Flex justifyContent="center" width="100%">
                <PrizeHeading>Prize Poll: {totalRewardAmount} DENA</PrizeHeading>
              </Flex>
              <EnterAttack onClick={() => handleClick("backAttack")}>Enter Attack</EnterAttack>
              <EnterDefense onClick={() => handleClick("backDefense")}>Enter Defense</EnterDefense>
            </PrizeCard>
          </CardFront>
          <CardBack>
            <PrizeCard >
              <div style={{ width: '100%' }}>
                <Button scale="sm" mb="15px" onClick={() => handleClick("front")}>
                  <ArrowBackIcon color="textSubtle" width="24px" mr="4px" />Back</Button>
                <Flex alignItems="center" justifyContent="space-between" mb="8px">
                  <Text textAlign="right" color="textSubtle">
                    {t('Bet Amount')}:
                  </Text>
                  <Flex alignItems="center">
                    {/* <BinanceIcon mr="4px  " /> */}
                    <Text bold textTransform="uppercase">
                      DENA
                    </Text>
                  </Flex>
                </Flex>
                <BetInput
                  value={amount}
                  onUserInput={handleInputChange}
                // isWarning={showFieldWarning}
                // inputProps={{ disabled: !account || isTxPending }}
                />
                {/* <input type='text' value={amount} onChange={handleInputChange} /> */}
                <Text
                  // value="12"
                  // onChange={e => setAmount(e.target.value)}
                  textAlign="right" mb="16px" color="textSubtle" fontSize="12px" style={{ height: '18px' }}>
                  {/* {account && t('Balance: %balance%', { balance: balanceDisplay })} */}
                  Account Balance: {denaBalance}
                </Text>
                <Box mb="8px">
                  {/* {account ? ( */}
                  <Button
                    width="100%"
                    disabled={amount ?
                      isAttackerApproving ||
                      isAttackerConfirming ||
                      isDefenderApproving ||
                      isDefenderConfirming :
                      true}
                    onClick={handleBet}
                  // isLoading={isTxPending}
                  // endIcon={isTxPending ? <AutoRenewIcon color="currentColor" spin /> : null}
                  >
                    {t(`Enter Amount ${selectedType}`)}
                  </Button>
                  {/* // ) : (
                //   <ConnectWalletButton width="100%" />
                // )} */}
                </Box>
              </div>
            </PrizeCard>
          </CardBack>
        </InnerCard>
      </CardFlip>
    </NewModal>
  )
}

export default ModalComponent