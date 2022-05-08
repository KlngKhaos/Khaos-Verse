import React, { useState , useEffect} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import Viewer from './components/Viewer';
import Statics from '../PoolTour3D/components/UI/Statics';
import useStore from '../PoolTour3D/store';
import { useGladiatorNft } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import axios from "axios"
import { useAppDispatch } from 'state'
import { fetchWalletGalleryNfts } from 'state/gallery'
import NftCard from '../Gallery/components/GalleryModelCard/NftCard/index'
import Configurator3DNftModal from "../Gallery/components/Configurator3DNftModal"
import ViewerSolo from 'views/Configurator/components/ViewerSolo'
import { getAllGladiators } from '../../state/nftMarket/helpers'

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`

const StyledPage = styled.div`
  text-align: center;
`

const StaticsPane = styled.div<{ isStaticsPaneOpen: boolean }>`
  flex: none;
  overflow: hidden;
  transition: width 200ms ease-in-out;
  width: ${({ isStaticsPaneOpen }) => (isStaticsPaneOpen ? '384px' : 0)};
  position: absolute;
  right: 0;
`

const School = () => {
    const gladiatorNftContract = useGladiatorNft()
    const { account } = useWeb3React()

    const { id }: { id: string } = useParams()
    const { t } = useTranslation()
    const [curColor, setCurColor] = useState(localStorage.getItem('con_curColor') ? localStorage.getItem('con_curColor') : '#ffffff');
    const [curName, setCurName] = useState(localStorage.getItem('con_curName') ? localStorage.getItem('con_curName') : 'None selected.');
    const [curSpeed, setCurSpeed] = useState(localStorage.getItem('con_curSpeed') ? localStorage.getItem('con_curSpeed') : 1);
    const [curBack, setCurBack] = useState(localStorage.getItem('con_curBack') ? localStorage.getItem('con_curBack') : 0);
    const [colors, setColors] = useState( {} );
    const showStatics = useStore( state => state.showStatics );
  
    const setCurrentColor = (col) => {
        setCurColor(col);
        localStorage.setItem('con_curColor', col);
    
        const temp = {...colors};
        temp[curName] = col;
        setColors(temp);
        localStorage.setItem('con_colors', JSON.stringify(colors));
    }
  
    const setCurrentName = (name) => {
        setCurName(name);
        setCurColor(colors[name] ? colors[name] : '#ffffff');
    
        localStorage.setItem('con_curName', name);
    }

    const {
      nftHashes,
      settingNFTHashes,
      userNftHashes,
      settingUserNFTHashes,
      schoolNftHashes,
      settingSchoolNFTHashes,
      myGladiators,
      setMyGladiators,
      usersGladiators,
      setUsersGladiators,
      schoolGladiators,
      setSchoolGladiators,
    } = useStore((state) => state)
    const getNftHash = async () => {
      try {
        if (!nftHashes.length || !userNftHashes.length || !schoolNftHashes.length) {
          // console.log("nothing found")
          const newNftHashes = []
          const newUserNftHashes = []
          const newSchoolNftHashes = []
          const data = await gladiatorNftContract.getUserGladiator(account)
          //  console.log("data<><><><><><>", data)
          for (let i = 0; i < data.length; i++) {
            // console.log("newNftHashes", i)
            const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
            newNftHashes.push(parseInt(data[i]._hex, 16))
            if (userInfo['spot'] === 'user') {
              // console.log("newUserNftHashes" , i)
              newUserNftHashes.push(parseInt(data[i]._hex, 16))
            }
            if (userInfo['spot'] === 'school') {
              // console.log("newSchoolNftHashes" , i)
              newSchoolNftHashes.push(parseInt(data[i]._hex, 16))
            }
          }
          const response = await getAllGladiators()
          // console.log("response", response);
          // console.log("response.length", response.length);
  
          const finalizedData = []
          const userFinalizedData = []
          const schoolFinalizedData = []
  
          if (response && response.length !== 0) {
            if (!myGladiators) {
              // console.log("no myGladiators");
              for (let i = 0; i < newNftHashes.length; i++) {
                let gladiator = null
                gladiator = response.find((item) => item.tokenId == newNftHashes[i])
                // console.log("iiiiiiiiiiiiiii", i);
                if (gladiator) {
                  // console.log("gladiator mygladiator", gladiator)
                  const finalizedNFT = gladiator.ipfsJson.nft
                  // console.log("inside gladiatorrrrrrrrrr", gladiator);
                  finalizedData.push({ ...finalizedNFT, tokenId: gladiator.tokenId })
                }
              }
              // console.log("setMyGladiators", finalizedData);
              setMyGladiators(finalizedData)
            }
            if (!usersGladiators) {
              // console.log("no usersGladiators");
              for (let i = 0; i < newUserNftHashes.length; i++) {
                let gladiator = null
                gladiator = response.find((item) => item.tokenId == newUserNftHashes[i])
                // console.log("iiiiiiiiiiiiiii", i);
                if (gladiator) {
                  // console.log("gladiator mygladiator", gladiator)
                  const finalizedNFT = gladiator.ipfsJson.nft
                  // console.log("inside gladiatorrrrrrrrrr", gladiator);
                  userFinalizedData.push({ ...finalizedNFT, tokenId: gladiator.tokenId })
                }
              }
              // console.log("setUsersGladiators", userFinalizedData);
              setUsersGladiators(userFinalizedData)
            }
            if (!schoolGladiators) {
              // console.log("no schoolGladiators");
              for (let i = 0; i < newSchoolNftHashes.length; i++) {
                let gladiator = null
                gladiator = response.find((item) => item.tokenId == newSchoolNftHashes[i])
                // console.log("iiiiiiiiiiiiiii", i);
                if (gladiator) {
                  // console.log("gladiator mygladiator", gladiator)
                  const finalizedNFT = gladiator.ipfsJson.nft
                  // console.log("inside gladiatorrrrrrrrrr", gladiator);
                  schoolFinalizedData.push({ ...finalizedNFT, tokenId: gladiator.tokenId })
                }
              }
              // console.log("setSchoolGladiators", schoolFinalizedData);
            setSchoolGladiators(schoolFinalizedData)
            }
          }
  
          setSchoolGladiators()
          settingNFTHashes(newNftHashes)
          settingUserNFTHashes(newUserNftHashes)
          settingSchoolNFTHashes(newSchoolNftHashes)
        }
      } catch (error) {
        console.log('errrrrrrrrrrrrrooooooooooooorrrrrrrrrrrrrrrr', error)
      }
    }
    useEffect(() => {
      getNftHash()
    }, [])

    return (
        <StyledPage>
            <StyledMain>
                <Viewer 
                    curColor={curColor}
                    setColor={(col) => setCurrentColor(col)}
                    curName={curName}
                    setCurName={(name) => setCurrentName(name)}
                    curSpeed={curSpeed}
                    curBack={id}
                    colors={colors}
                    nftHash={nftHashes || []}
                />
                <StaticsPane isStaticsPaneOpen={showStatics}>
                    <Statics />
                </StaticsPane>
            </StyledMain>
        </StyledPage>
    )
}

export default School
