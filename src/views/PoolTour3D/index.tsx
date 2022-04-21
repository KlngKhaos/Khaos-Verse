import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import UserViewer from './components/Viewer'
import MyGladiatorViewer from '../MyGladiators/components/Viewer'
import SchoolViewer from '../School/components/Viewer'
import Statics from './components/UI/Statics'
import useStore from './store'
import { useGladiatorNft } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { getSpecificGladiators } from '../../state/nftMarket/helpers'

const StyledHero = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

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

const PoolTour3D = () => {
  const location = useLocation()
  const gladiatorNftContract = useGladiatorNft()
  const { id }: { id: string } = useParams()
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [curColor, setCurColor] = useState(
    localStorage.getItem('con_curColor') ? localStorage.getItem('con_curColor') : '#ffffff',
  )
  const [curName, setCurName] = useState(
    localStorage.getItem('con_curName') ? localStorage.getItem('con_curName') : 'None selected.',
  )
  const [curSpeed, setCurSpeed] = useState(
    localStorage.getItem('con_curSpeed') ? localStorage.getItem('con_curSpeed') : 1,
  )
  const [curBack, setCurBack] = useState(localStorage.getItem('con_curBack') ? localStorage.getItem('con_curBack') : 0)
  const [colors, setColors] = useState({})

  const showStatics = useStore((state) => state.showStatics)

  const setCurrentColor = (col) => {
    setCurColor(col)
    localStorage.setItem('con_curColor', col)

    const temp = { ...colors }
    temp[curName] = col
    setColors(temp)
    localStorage.setItem('con_colors', JSON.stringify(colors))
  }

  const setCurrentSpeed = (speed) => {
    setCurSpeed(speed)
    localStorage.setItem('con_curSpeed', speed)
  }

  const setCurrentName = (name) => {
    setCurName(name)
    setCurColor(colors[name] ? colors[name] : '#ffffff')

    localStorage.setItem('con_curName', name)
  }

  const setCurrentBack = (back) => {
    setCurBack(back)
    localStorage.setItem('con_curBack', back)
  }

  const resetSetting = () => {
    setCurColor('#ffffff')
    setColors({})
    setCurSpeed(1)
    setCurName('None selected.')
    setCurBack(0)

    localStorage.setItem('con_curColor', '#ffffff')
    localStorage.setItem('con_colors', JSON.stringify({}))
    localStorage.setItem('con_curSpeed', '1')
    localStorage.setItem('con_curName', 'None selected.')
    localStorage.setItem('con_curBack', '0')
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
      // if (!nftHashes.length || !userNftHashes.length || !schoolNftHashes.length) {
      const newNftHashes = []
      const newUserNftHashes = []
      const newSchoolNftHashes = []
      const data = await gladiatorNftContract.getUserGladiator(account)

      if (data.length !== nftHashes.length) {
        for (let i = 0; i < data.length; i++) {
          // console.log('newNftHashes', i)
          const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
          newNftHashes.push(parseInt(data[i]._hex, 16))
          if (userInfo['spot'] === 'user') {
            // console.log('newUserNftHashes', i)
            newUserNftHashes.push(parseInt(data[i]._hex, 16))
          }
          if (userInfo['spot'] === 'school') {
            // console.log('newSchoolNftHashes', i)
            newSchoolNftHashes.push(parseInt(data[i]._hex, 16))
          }
        }
      }

      settingNFTHashes(newNftHashes)
      settingUserNFTHashes(newUserNftHashes)
      settingSchoolNFTHashes(newSchoolNftHashes)
      if (!myGladiators) {
        const response = await getSpecificGladiators(JSON.stringify(newNftHashes))
        const newRes = response.map(gla => {
          const data = gla.ipfsJson.nft
          return {
            ...data,
            tokenId: gla.tokenId
          }
        })

        setMyGladiators(newRes)
      }
      if (!usersGladiators) {
        const response = await getSpecificGladiators(JSON.stringify(newUserNftHashes))
        const newRes = response.map(gla => {
          const data = gla.ipfsJson.nft
          return {
            ...data,
            tokenId: gla.tokenId
          }
        })

        setUsersGladiators(newRes)
      }
      if (!schoolGladiators) {
        const response = await getSpecificGladiators(JSON.stringify(newSchoolNftHashes))
        const newRes = response.map(gla => {
          const data = gla.ipfsJson.nft
          return {
            ...data,
            tokenId: gla.tokenId
          }
        })
        setSchoolGladiators(newRes)
      }
      // }
      // }
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
        {location.pathname === "/mygladiators" &&
          <MyGladiatorViewer
            curColor={curColor}
            setColor={(col) => setCurrentColor(col)}
            curName={curName}
            setCurName={(name) => setCurrentName(name)}
            curSpeed={curSpeed}
            curBack={id}
            colors={colors}
            nftHash={nftHashes || []}
          />
        }
        {location.pathname === "/school" &&
          <SchoolViewer
            curColor={curColor}
            setColor={(col) => setCurrentColor(col)}
            curName={curName}
            setCurName={(name) => setCurrentName(name)}
            curSpeed={curSpeed}
            curBack={id}
            colors={colors}
            nftHash={nftHashes || []}
          />
        }
        {
          location.pathname === "/tour/arena1" &&
          <UserViewer
            curColor={curColor}
            setColor={(col) => setCurrentColor(col)}
            curName={curName}
            setCurName={(name) => setCurrentName(name)}
            curSpeed={curSpeed}
            curBack={id}
            colors={colors}
            nftHash={nftHashes || []}
          />
        }
        {
          location.pathname === "/tour/arena2" &&
          <UserViewer
            curColor={curColor}
            setColor={(col) => setCurrentColor(col)}
            curName={curName}
            setCurName={(name) => setCurrentName(name)}
            curSpeed={curSpeed}
            curBack={id}
            colors={colors}
            nftHash={nftHashes || []}
          />
        }
        {
          location.pathname === "/tour/arena3" &&
          <UserViewer
            curColor={curColor}
            setColor={(col) => setCurrentColor(col)}
            curName={curName}
            setCurName={(name) => setCurrentName(name)}
            curSpeed={curSpeed}
            curBack={id}
            colors={colors}
            nftHash={nftHashes || []}
          />
        }
        <StaticsPane isStaticsPaneOpen={showStatics}>
          <Statics />
        </StaticsPane>
      </StyledMain>
    </StyledPage>
  )
}

export default PoolTour3D
