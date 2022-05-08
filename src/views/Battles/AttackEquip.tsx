import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { AttackEquip } from 'config/constants/battleJoin/types'
import EquiCard from './components/EquipCard'


const LoadMore = styled.div`
  width: 100%;  
  display: flex;
  justify-content: end;
  margin-top: 10px
`
const MoreButton = styled.div`
  background-color: #c09451;
  padding: 4px 6px;
  border-radius: 50px;
  color: #552216;
  font-size: 14px;
  margin-right: 25px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`


interface AttackEquipmentsProps {
    attackEquip: AttackEquip[],
    getJoinPageNFTsTokenIds: () => void
}

const AttackEquipments: React.FC<AttackEquipmentsProps> = ({ attackEquip , getJoinPageNFTsTokenIds}) => {
    const [more, setMore] = useState(8);
    const { t } = useTranslation()

    const handleMore = () => {
        setMore(more + 8)

    }
    return (
        <>
            {
                attackEquip.slice(0, more).map((equip, index) => (
                    <EquiCard key={index} equipData={equip} getJoinPageNFTsTokenIds={getJoinPageNFTsTokenIds}/>
                ))
            }
            <LoadMore>
                <MoreButton onClick={handleMore}>
                    {t('More...')}
                </MoreButton>
            </LoadMore>
        </>

    )
}

export default AttackEquipments