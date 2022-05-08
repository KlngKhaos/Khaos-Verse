import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Arenas } from 'config/constants/arenas/types'


const StyledBackSelector = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        text-align: center;

        @media (min-width: 320px) and (max-width: 480px) {
            padding: 0;
          }
    
        @media (min-width: 480px) and (max-width: 786px) {
            
          }
    `
const ArenaImage = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
    & img {
        width: 200px !important;
        height: 150px !important;
        border-radius: 10px;
    }

    &:hover {
        cursor: pointer;
        border: 2px solid #D9AB3A;
    }
`

interface SelectArenaProps {
    arenas: Arenas[],
}

const SelectArena: React.FC<SelectArenaProps> = ({ arenas }) => {
    const { t } = useTranslation()

    return (
        <StyledBackSelector>
            {
                arenas.map((arena) => (
                    <>
                        <ArenaImage>
                            <img src={arena.imagePath} alt={arena.name} />
                            <Heading textAlign="left">{t(`${arena.name}`)}</Heading>
                            <Text textAlign="left">{t(`${arena.terrain}`)}</Text>
                        </ArenaImage>
                    </>
                ))
            }
        </StyledBackSelector >
    )
}

export default SelectArena