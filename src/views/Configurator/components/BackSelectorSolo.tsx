import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { HexColorPicker } from "react-colorful";

import {
    BackPaths
} from '../utils/constant';

type ChildProps = {
    curBack: any,
    setBack: (arg0: any) => void,
    setColor?: (arg0: string) => void,
    curColor?: string,
}

const StyledBackSelector = styled.div`
        width: 20%;
        padding: 10px;
        text-align: center;

        @media (min-width: 320px) and (max-width: 480px) {
            padding: 0;
          }
    
        @media (min-width: 480px) and (max-width: 786px) {
            
          }
    `
const StyledBackImage1 = styled.div`
    width: 90%;
    margin-left: 5%;
    background-image: url(${BackPaths[0]});
    background-size: cover;
    height: 130px;
    margin-bottom: 10px;
    margin-top: 10px;
    border: 0px solid #f1416c;
    border-radius: 10px;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
    }
    @media (min-width: 320px) and (max-width: 480px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 75px;
      }

    @media (min-width: 480px) and (max-width: 786px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 100px;
      }
      @media (min-width: 786px) and (max-width: 1224px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 150px;
      }
`
const StyledBackImage2 = styled.div`
    width: 90%;
    margin-left: 5%;
    background-image: url(${BackPaths[1]});
    background-size: cover;
    height: 130px;
    margin-bottom: 10px;
    border: 0px solid #f1416c;
    border-radius: 10px;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
        border-width: 5px;
        height: 75px;
    }

    @media (min-width: 320px) and (max-width: 480px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 75px;
      }

    @media (min-width: 480px) and (max-width: 786px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 100px;
      }
      @media (min-width: 786px) and (max-width: 1224px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 150px;
      }
`
const StyledBackImage3 = styled.div`
    width: 90%;
    margin-left: 5%;
    background-image: url(${BackPaths[2]});
    background-size: cover;
    height: 130px;
    border: 0px solid #f1416c;
    border-radius: 10px;
    margin-bottom: 10%;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
    }

    @media (min-width: 320px) and (max-width: 480px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 75px;
      }

    @media (min-width: 480px) and (max-width: 786px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 100px;
      }
    @media (min-width: 786px) and (max-width: 1224px) {
        margin-top: 0;
        margin-left: 0;
        width: 100%;
        height: 150px;
      }
`
const ColorPicker = styled(HexColorPicker)`
    margin-left: 50%;
    transform: translate3d(-50%, 0, 0);
    @media (min-width: 320px) and (max-width: 480px) {
        width: 65px !important;
        height: 75px!important;
      }
      @media (min-width: 480px) and (max-width: 786px) {
        width: 100px !important;
        height: 100px!important;
      }
      @media (min-width: 786px) and (max-width: 1224px) {
        width: 150px !important;
        height: 150px!important;
      }
`

const BackSelectorSolo: React.FC<ChildProps> = ({ curBack, setBack, setColor, curColor }) => {
    const { t } = useTranslation()
    const handleChangeComplete = (color) => {
        setColor(color);
    };

    return (
        <StyledBackSelector>
            {/* <Text mb="10px" fontSize="20px">
                { t('Select Background') }
            </Text> */}

            <StyledBackImage1
                style={{ borderWidth: curBack === 0 || curBack === '0' ? 5 : 0 }}
                onClick={() => { setBack(0) }}>
                {/* first Back */}
            </StyledBackImage1>
            <StyledBackImage2
                style={{ borderWidth: curBack === 1 || curBack === '1' ? 5 : 0 }}
                onClick={() => { setBack(1) }}>
                {/* second Back */}
            </StyledBackImage2>
            <StyledBackImage3
                style={{ borderWidth: curBack === 2 || curBack === '2' ? 5 : 0 }}
                onClick={() => { setBack(2) }}>
                {/* third Back */}
            </StyledBackImage3>

            <ColorPicker
                color={curColor}
                onChange={handleChangeComplete}
            />
            <Text mb="10px" fontSize="20px">
                {t(curColor)}
            </Text>

        </StyledBackSelector>
    )
}

export default BackSelectorSolo