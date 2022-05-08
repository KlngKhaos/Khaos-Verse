import React from 'react'
import styled from 'styled-components'
import { useModal } from '@pancakeswap/uikit'
import EquipmentModal from './EquipmentModal'

interface EquipmentProps {
  data: any,
}

const Equipmentt = styled.div`
  cursor: pointer;
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
    width: 35px !important;
    height: 35px !important;
    margin: 5px !important;
  }
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1);
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
    width: 35px !important;
    height: 35px !important;
    margin: 5px !important;
  }
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1);
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
    width: 35px !important;
    height: 35px !important;
    margin: 5px !important;
  }
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`

const Equipment: React.FC<EquipmentProps> = ({ data }) => {
  const [onEquipmentClick] = useModal(<EquipmentModal data={data} />)

  return (
    <>
      {
        (data.type === "battle") ?
          <Equipmentt onClick={onEquipmentClick}>
            <AttackBackground>
              <img src={data.image} alt="Equipment" />
            </AttackBackground>
          </Equipmentt>
          : (data.type === "defense") ?
            <Equipmentt onClick={onEquipmentClick}>
              <DefenseBackground>
                <img src={data.image} alt="Equipment" />
              </DefenseBackground>
            </Equipmentt>
            : (data.type === "animal") ?
              <Equipmentt onClick={onEquipmentClick}>
                <AnimalBackground>
                  <img src={data.image} alt="Equipment" />
                </AnimalBackground>
              </Equipmentt>
              : null
      }
    </>

  )
}

export default Equipment