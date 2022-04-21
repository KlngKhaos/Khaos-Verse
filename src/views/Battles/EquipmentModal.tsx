import React, { useState, useEffect } from 'react'
import { Modal, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { Equip } from 'config/constants/battleJoin/types'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransactionToBuyJoinNft'
import { useCake, useGladiatorEquipment, useNrt } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { parseUnits } from '@ethersproject/units'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from '@ethersproject/constants'
import useToast from 'hooks/useToast'
import pinataSdk from '@pinata/sdk'
import useStore from "../PoolTour3D/store"
import useStore2 from "../Configurator/store/store"

interface EquipmentModalProps {
  onDismiss?: () => void
  data: Equip,
  getJoinPageNFTsTokenIds: () => void
}

const NewModal = styled(Modal)`
  width: 480px !important;
  min-width: 480px !important;
`
const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 100%;
`
const EquipmentsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
`
const Equipment = styled.div`
  margin: 0px 12px;
  // margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const EquipmentImage = styled.div`
  display: flex;
  width: 250px;
`
const AttackBackground = styled.div`
  background-image: url(/images/battles/1.png);
  width: 250px;
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const DefenseBackground = styled.div`
  background-image: url(/images/battles/2.png);
  width: 250px;
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const AnimalBackground = styled.div`
  background-image: url(/images/battles/3.png);
  width: 250px;
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
const EquipButton = styled.div`
  padding: 4px 10px;
  background-image: url(/images/battles/buttons-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  color: #552216;   
  width: 200px;
  height: 66px;
  font-size: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
const EquipmentAttributes = styled.div`
  max-height: 200px;
  width: 350px !important;
  overflow: scroll;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 10px;
`


const EquipmentModal: React.FC<EquipmentModalProps> = ({ onDismiss, data, getJoinPageNFTsTokenIds }) => {
  const { t } = useTranslation()
  const { currentStatics } = useStore(state => state)
  const nrtContract = useNrt()
  const gladiatorEquipmentContract = useGladiatorEquipment()
  const { account } = useWeb3React()
  const minimumNrtRequired = parseUnits(data.priceInDENA.toString())
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastInfo, toastSuccess, toastError } = useToast()

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await nrtContract.allowance(account, gladiatorEquipmentContract.address)

          return response.gte(minimumNrtRequired)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice(nrtContract, 'approve', [gladiatorEquipmentContract.address, MaxUint256.toString()])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(t('Enabled'), t("Gladiator Equipment is approved successfully and ready to buy"))
      },
      IPFSJSONData: data,
      onConfirm: async () => {
        try {
          const pinata = pinataSdk(
            process.env.REACT_APP_pinataApiKey,
            process.env.REACT_APP_pinataSecretApiKey,
          )
          const deployed = await pinata.pinJSONToIPFS({ ...data }) // buyEquiment
          // console.log("deployeddeployeddeployeddeployed", deployed)
          const res = await callWithGasPrice(gladiatorEquipmentContract, 'buyEquipment', [
            currentStatics.tokenId, // id of gladiator 
            minimumNrtRequired,// price of gladiator
            deployed.IpfsHash, // URI
          ])
          return res
        } catch (error: any) {
          console.log("eeeeeeeeeeeeeeeeeee", error)
          throw new Error(error)
        }
      },
      onSuccess: async ({ receipt }) => {
        toastSuccess(t('success'), t('Gladiator Equipment is Bought successfully'))
      },
    })
  const handleOnClick = () => {
    // console.log('clickeddddddddd')
    
    if (isApproved) {
      handleConfirm()
    } else {
      handleApprove()
    }
  }
  // console.log("isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm ", isApproving, isApproved, isConfirmed, isConfirming );
  useEffect(() => {
    if (isConfirmed) {
      onDismiss()
      getJoinPageNFTsTokenIds()
    }
  }, [isConfirmed])

  return (
    <NewModal title={data.name} onDismiss={onDismiss} minWidth="1200px">
      <StyledMain>
        <EquipmentsList>
          <Equipment>
            <EquipmentImage>
              {
                (data.type === "battle") ?
                  <AttackBackground>
                    <img src={data.imagePath} alt="Equipment" />
                  </AttackBackground>
                  : (data.type === "defense") ?
                    <DefenseBackground>
                      <img src={data.imagePath} alt="Equipment" />
                    </DefenseBackground>
                    : (data.type === "animal") ?
                      <AnimalBackground>
                        <img src={data.imagePath} alt="Equipment" />
                      </AnimalBackground>
                      : null
              }
            </EquipmentImage>
            <EquipmentAttributes>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Strength')}</Text>
                <Text color="textSubtle" mr="10px">{data.strength}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Endurance')}</Text>
                <Text color="textSubtle" mr="10px">{data.endurance}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Agility')}</Text>
                <Text color="textSubtle" mr="10px">{data.agility}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Precision')}</Text>
                <Text color="textSubtle" mr="10px">{data.precision}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Intelligence')}</Text>
                <Text color="textSubtle" mr="10px">{data.intelligance}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Will Power')}</Text>
                <Text color="textSubtle" mr="10px">{data.willpower}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('One-Handed')}</Text>
                <Text color="textSubtle" mr="10px">{data.onehand}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Two-Handed')}</Text>
                <Text color="textSubtle" mr="10px">{data.twohand}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Shield')}</Text>
                <Text color="textSubtle" mr="10px">{data.shield}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Ranged')}</Text>
                <Text color="textSubtle" mr="10px">{data.range}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Dual')}</Text>
                <Text color="textSubtle" mr="10px">{data.dual}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Polearms')}</Text>
                <Text color="textSubtle" mr="10px">{data.polearms}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Leadership')}</Text>
                <Text color="textSubtle" mr="10px">{data.leadership}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Coach')}</Text>
                <Text color="textSubtle" mr="10px">{data.coach}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Cook')}</Text>
                <Text color="textSubtle" mr="10px">{data.cook}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Medical')}</Text>
                <Text color="textSubtle" mr="10px">{data.medical}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Smith')}</Text>
                <Text color="textSubtle" mr="10px">{data.smith}</Text>
              </Flex>
              <Flex justifyContent="space-between" width="100%" mt="5px">
                <Text color="secondary" ml="10px" fontSize="18px">{t('Torture')}</Text>
                <Text color="textSubtle" mr="10px">{data.torture}</Text>
              </Flex>
            </EquipmentAttributes>
            <EquipButton onClick={handleOnClick} style={{ cursor: "pointer" }}>
              {isApproved ? "Buy" : "Enable"} {data.priceInDENA}{t(' DENA')}
            </EquipButton>
          </Equipment>
        </EquipmentsList>
      </StyledMain>
    </NewModal>
  )

}

export default EquipmentModal