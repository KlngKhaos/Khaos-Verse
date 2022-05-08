import React, { Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useLoader } from '@react-three/fiber'
import { Button, Modal, AutoRenewIcon, Flex, useModal } from '@pancakeswap/uikit'
import { ModalActions } from 'components/Modal'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import styled from 'styled-components'
import { ambientLightProps, cameraProps, controlsProps, pointLightProps } from 'views/Configurator/utils/constant'

import Controls from '../../Configurator/components/THREE/Controls'
import Model from '../../PoolTour3D/components/THREE/Model'
import Loader from '../../Configurator/components/UI/Loader'
import axios from 'axios'
import { merge } from 'lodash'

import useStore from '../../PoolTour3D/store'
import { useHistory } from 'react-router-dom'
import { getAllGladiators } from '../../../state/nftMarket/helpers'
import PageLoader from 'components/Loader/PageLoader'
import SelectArenaModal from './SelectArenaModal'
import Statics from '../../../views/PoolTour3D/components/UI/Statics'
import useToast from 'hooks/useToast'

const StyledViewer = styled.div`
  width: 100%;
  height: 100%;
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

const StyledCanvasWrapper = styled.div`
  height: calc(100vh - 80px);
  position: relative;
`

const StyledArrowButton = styled.button`
  position: absolute;
  background: url(/images/battles/back.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: unset;
  border: unset;
  width: 170px;
  height: 39px;
  color: white;
  top: 50%;
  left: 10%;
  font-size: 20px;
  font-weight: 600;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100px;
    height: 22px;
    font-size: 14px;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`

const StyledModelOptionsWrapper = styled.div`
  position: absolute;
  transform: translate3d(-50%, 0, 0);
  left: 50%;
  bottom: 0;
  width: 40vw;
  height: 7vw;
  background-color: #121212;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.5vw;
  border-top-left-radius: 0.5vw;
  border-top-right-radius: 0.5vw;
`

const StyledModelName = styled.div`
  color: white;
  font-size: 25px;
`

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const StyledOptionButton = styled(Button) <{ background?: string, show: boolean }>`
  background-size: contain;
  background-repeat: no-repeat;
  outline: unset;
  border: unset;
  width: 9vw;
  height: 3vw;
  color: rgb(85, 34, 22);
  font-size: 20px;
  background: url(${({ background }) => background});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  outline: unset;
  border: unset;
  width: 9vw;
  height: 3vw;
  padding: 5px 0px;
  color: rgb(85, 34, 22);
  font-size: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ show }) => (show ? '1' : '0.5')};
`

type ChildProps = {
  curColor: string
  setColor: (arg0: string) => void
  curName: string
  setCurName: (arg0: string) => void
  curSpeed: any
  curBack: any
  colors: any
  nftHash?: any | []
}

const loadJSON = (path, hash) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)
          resolve({ ...data, hash })
        } else {
          reject(xhr)
        }
      }
    }
    xhr.open('GET', path, true)
    xhr.send()
  })
}

// TOOD: Get my nft hash values
// const nftHashs = localStorage.getItem('myNfts') ? JSON.parse( localStorage.getItem('myNfts') ): [];

// var myData;

// Promise.all( nftHashs.map(hash => loadJSON( `https://gateway.pinata.cloud/ipfs/${ hash }`, hash )) ).then(data => {
//     myData = data;
// });

const Viewer: React.FC<ChildProps> = ({ setColor, curName, setCurName, curSpeed, curBack, colors, nftHash }) => {
  const { toastError, toastSuccess } = useToast()
  const [show, setShow] = useState(false)

  const [gladiatorBtns, setgladiatorBtns] = useState({
    // battleBtn: true,
    // statsBtn: true,
    // sellBtn: true,
    battleBtn: false,
    statsBtn: false,
    sellBtn: false,
  })

  const { battleBtn, statsBtn, sellBtn } = gladiatorBtns
  const [myData, setMyData] = useState<any | []>([])
  const [onStakeInArena] = useModal(<SelectArenaModal />)

  const { usersGladiators, updateShowStatics } = useStore((state) => state)
  // console.log("usersGladiators", usersGladiators)

  useEffect(() => {
    if (usersGladiators) {
      setMyData(usersGladiators)
    }
  }, [usersGladiators])

  useEffect(() => {
    if (usersGladiators?.length === 0) {
      toastError('No gladiator is found or bought')
    }
  }, [usersGladiators])

  const [myModels, setMyModels] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const currentStatics = useStore((state) => state.currentStatics)
  const currentHoverModel = useStore((state) => state.currentHoverModel)
  const history = useHistory()

  if (myData && myData.length > 0 && !myModels.length) {
    // console.log("myDataaaaaaaaaaaaaaaa", myData)
    for (let i = 0; i < myData.length; i++) {
      // if(myData[i].attributes && myData[i].attributes[0]) {
      //     merge(myData[i], myData[i].attributes[0])
      //     merge(myData[i], models.filter((nft) => nft.glTF === myData[i].glTF)[0])
      // }
      myData[i].model = useLoader(GLTFLoader, myData[i].glTFPath)
    }
    setMyModels(myData)
  }

  const handleShowPanel = () => {
    if (currentStatics) {
      updateShowStatics(true)
    }
  }
  const Dome = () => {
    const texture = useLoader(THREE.TextureLoader, `/images/gallery/arena3.jpg`)
    return (
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[50, 100, 100]} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
      </mesh>
    )
  }

  const GroundPlane = () => {
    const texture = useLoader(THREE.TextureLoader, '/images/gallery/textures/1.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(64, 64)
    texture.anisotropy = 16

    return (
      <mesh receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshPhongMaterial attach="material" map={texture} side={THREE.DoubleSide} />
      </mesh>
    )
  }

  const goPrevPage = () => {
    if (currentPage <= 0) return

    setCurrentPage((prev) => prev - 1)
  }

  const goNextPage = () => {
    if (currentPage >= Math.ceil(myModels.length / 3) - 1) return

    setCurrentPage((prev) => prev + 1)
  }

  const getCurrentModels = () => {
    return myModels.slice(currentPage * 3, currentPage * 3 + 3)
  }

  const ButtonGroup = () => {
    return (
      <div>
        {!(currentPage <= 0) && <StyledArrowButton onClick={() => goPrevPage()}>Previous</StyledArrowButton>}
        {!(currentPage >= Math.ceil(myModels.length / 3) - 1) && (
          <StyledArrowButton onClick={() => goNextPage()} style={{ left: 'unset', right: '10%' }}>
            Next
          </StyledArrowButton>
        )}
      </div>
    )
  }

  const ModelOptions = () => {
    let showStatics = useStore((state) => state.showStatics)

    const goToBattle = () => {
      if (currentStatics?.name) {
        history.push({
          pathname: '/battles/join',
          state: {
            nft: currentStatics,
          },
        })
      }
    }

    const showStats = () => {
      // console.log('workinggggggggggggggggggg')
      showStatics = true
      // console.log(showStatics)

      return <></>
    }
    return (
      <>
        {usersGladiators?.length != 0 && (
          <StyledModelOptionsWrapper>
            <StyledModelName>
              {currentHoverModel
                ? currentHoverModel.name
                : currentStatics?.name
                  ? currentStatics.name
                  : 'None selected'}
            </StyledModelName>

            <StyledModelName>
              {currentHoverModel
                ? `Token ID: ${currentHoverModel.tokenId}`
                : currentStatics?.tokenId
                  ? `Token ID: ${currentStatics.tokenId}`
                  : ''}
            </StyledModelName>
            {currentStatics?.tokenId && setShow(true)}
            {usersGladiators?.length != 0 && (
              <StyledButtonsWrapper>
                <StyledOptionButton
                  disabled={battleBtn}
                  background={'/images/battles/red.png'}
                  onClick={() => goToBattle()}
                  show={show}
                >
                  Go to Battle
                </StyledOptionButton>
                <Link
                  to={{
                    pathname: '/room/pools',
                    state: { currentStatics },
                  }}
                >
                  <StyledOptionButton background={'/images/battles/blue.png'} show={show}>Stake in Pools</StyledOptionButton>
                </Link>
                <StyledOptionButton
                  onClick={handleShowPanel}
                  background={'/images/battles/blue.png'}
                  show={show} >Statistics</StyledOptionButton>
                <Link to="nfts">
                  <StyledOptionButton disabled={sellBtn} background={'/images/battles/blue.png'} show={show}>
                    Sell
                  </StyledOptionButton>
                </Link>
              </StyledButtonsWrapper>
            )}
          </StyledModelOptionsWrapper>
        )}
      </>
    )
  }

  return (
    <>
      {usersGladiators ? (
        <StyledViewer>
          <StyledCanvasWrapper>
            <Canvas camera={{ fov: cameraProps.fov, position: cameraProps.position }} shadows>
              <fog attach="fog" args={['white', 90, 150]} />
              <ambientLight intensity={ambientLightProps.intensity} />
              <pointLight
                position={pointLightProps.position}
                castShadow
                decay={pointLightProps.decay}
                shadow-mapSize-height={pointLightProps.shadowMapSize}
                shadow-mapSize-width={pointLightProps.shadowMapSize}
              />
              <Controls
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={controlsProps.minPolarAngle}
                maxDistance={controlsProps.maxDistance}
                minDistance={controlsProps.minDistance}
                target={controlsProps.target}
                enableKeys
              />
              <Dome />
              <GroundPlane />
              <Suspense fallback={<Loader />}>
                {getCurrentModels().map((item, index) => (
                  <Model
                    key={item.name + index}
                    data={{
                      setModel: () => true,
                      setColor: () => true,
                      setCurName: setCurName,
                      curSpeed: curSpeed,
                      animations: item.model.animations,
                      nodes: item.model.nodes,
                      colors: item.colors ? item.colors : colors,
                      nft: item,
                      position: {
                        ...item.glTFPosition,
                        z: item.glTFPosition.z + 6 * index - 2 * getCurrentModels().length,
                      },
                    }}
                  />
                ))}
              </Suspense>
            </Canvas>

            <ButtonGroup />

            <ModelOptions />
          </StyledCanvasWrapper>
        </StyledViewer>
      ) : (
        <PageLoader />
      )}
    </>
  )
}

export default Viewer
