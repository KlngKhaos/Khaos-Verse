import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Modal, Flex, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { ModalActions } from 'components/Modal'
import Arena from 'config/constants/arenas/arenas'
import SelectArena from './SelectArena'

interface SelectArenaModalProps {
    onDismiss?: () => void
}

const NewModal = styled(Modal)`
    width: 1120px !important;
`

const ActionButtons = styled(ModalActions)`
    padding-bottom: 0 !important;
`


const SelectArenaModal: React.FC<SelectArenaModalProps> = ({ onDismiss }) => {

    const { t } = useTranslation()

    return (
        <NewModal title="Select Arena for Staking" onDismiss={onDismiss} minWidth="800px">
            <SelectArena arenas={Arena} />
            <ActionButtons>
                <Flex justifyContent="end">
                    <Button variant="secondary" scale="sm" style={{ marginTop: '10px' }} onClick={onDismiss}>
                        {t('Cancel')}
                    </Button>
                    <div style={{ width: '24px', height: '24px' }}>{ }</div>
                    <a href="/stakegladiator">
                        <Button
                            variant="secondary"
                            scale="sm"
                            style={{ marginTop: '10px', backgroundColor: 'green', color: 'white', borderColor: 'green' }}
                        >
                            {t('Stake')}
                        </Button>
                    </a>
                </Flex>
            </ActionButtons>
        </NewModal>
    )
}

export default SelectArenaModal