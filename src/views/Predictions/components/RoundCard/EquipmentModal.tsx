import React, { useState, useEffect } from 'react'
import { Modal, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
// import { Equip } from 'config/constants/battleJoin/types'

interface EquipmentModalProps {
    onDismiss?: () => void
    data: any,
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
  margin-top: 20px;
`


const EquipmentModal: React.FC<EquipmentModalProps> = ({ onDismiss, data }) => {

    const { t } = useTranslation()

    return (
        <NewModal title={data.name} onDismiss={onDismiss} minWidth="1200px">
            <StyledMain>
                <EquipmentsList>
                    <Equipment>
                        <EquipmentImage>
                            {
                                (data.type === "battle") ?
                                    <AttackBackground>
                                        <img src={data.image} alt="Equipment" />
                                    </AttackBackground>
                                    : (data.type === "defense") ?
                                        <DefenseBackground>
                                            <img src={data.image} alt="Equipment" />
                                        </DefenseBackground>
                                        : (data.type === "animal") ?
                                            <AnimalBackground>
                                                <img src={data.image} alt="Equipment" />
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
                    </Equipment>
                </EquipmentsList>
            </StyledMain>
        </NewModal>
    )

}

export default EquipmentModal