import React from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Equip } from 'config/constants/battleJoin/types'
import EquipmentModal from '../EquipmentModal'


const Equipment = styled.div`
  margin: 0px 10px;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
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


interface EquipCardProps {
  equipData: Equip,
  getJoinPageNFTsTokenIds: () => void
}
// modalId
const EquipCard: React.FC<EquipCardProps> = ({ equipData , getJoinPageNFTsTokenIds}) => {
  const { t } = useTranslation()
  const [onEquipmentClick] = useModal(<EquipmentModal data={equipData} getJoinPageNFTsTokenIds={getJoinPageNFTsTokenIds} />)

  return (
    <>
      <Equipment onClick={onEquipmentClick}>
        <EquipmentImage>
          {
            (equipData.type === "battle") ?
              <AttackBackground>
                <img src={equipData.imagePath} alt="Equipment" />
              </AttackBackground>
              : (equipData.type === "defense") ?
                <DefenseBackground>
                  <img src={equipData.imagePath} alt="Equipment" />
                </DefenseBackground>
                : (equipData.type === "animal") ?
                  <AnimalBackground>
                    <img src={equipData.imagePath} alt="Equipment" />
                  </AnimalBackground>
                  : null
          }
        </EquipmentImage>
        <EquipButton>{t('R$')}{equipData.priceInDENA}</EquipButton>
      </Equipment>
    </>

  )
}

export default EquipCard