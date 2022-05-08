import React, { Suspense, useState, useEffect } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import styled from 'styled-components'
import { useGetGallery } from 'state/gallery/hooks'
import backPic from '../assets/imgs/Medieval-Backgrounds-6.jpg'
import buttonBg from '../assets/imgs/buttons-bg.png'
import axios from 'axios'
import { ambientLightProps, cameraProps, pointLightProps } from 'views/Configurator/utils/constant'
import { merge } from 'lodash'

import Model from '../../PoolTour3D/components/THREE/Model'
import Loader from '../../PoolTour3D/components/UI/Loader'
import HealthBar from './HealthBar'
import { getAllGladiators } from '../../../state/nftMarket/helpers'
import useStore from '../../PoolTour3D/store'
import PageLoader from 'components/Loader/PageLoader'
import GalleryNfts from 'config/constants/gallery/gallery'
import { useGladiatorNft } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'

const StyledViewer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`
const StyledCanvasWrapper = styled.div`
  height: calc(100vh - 100px);
  position: relative;
`

const StyledCanvasBack = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  background-image: url('${backPic}');
  background-size: 100% 100%;
  background-position: center;
  position: absolute;
  top: 0;
  filter: blur(3px);
`

const StyledHealthBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 2.5vw;
  width: 100%;
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

// TOOD: Get my nft hash values
// const nftHashs = localStorage.getItem('myNfts') ? JSON.parse( localStorage.getItem('myNfts') ): [];

// var myData;

// Promise.all( nftHashs.map(hash => loadJSON( `https://gateway.pinata.cloud/ipfs/${ hash }`, hash )) ).then(data => {
//     myData = data;
// });

const Viewer: React.FC<ChildProps> = ({ setColor, curName, setCurName, curSpeed, curBack, colors, nftHash }) => {
  const [myModels, setMyModels] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [check, setCheck] = useState([])
  const [counter, setCounter] = useState(0);
  const gladiatorNftContract = useGladiatorNft()
  let minTime = GalleryNfts.map((time: any) => Number(time?.minTimeInSeconds))
  let arr = []
  const { account } = useWeb3React()

  const getRemainingTime = async () => {
    try {
      const data = await gladiatorNftContract.getUserGladiator(account)
      for (let i = 0; i < data.length; i++) {
        const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
        // console.log(userInfo)
        if (userInfo['spot'] === 'school') {
          const startTime = userInfo.startTime
          let convert = startTime._hex.toString()
          convert = parseInt(convert, 16)
          convert = Number(convert + '000')
          // convert = new Date(convert)
          let date = Date.parse(new Date() as any)
          let remainingTime = (convert + Number(minTime[0] + `000`) - date) / 60000
          remainingTime = remainingTime.toFixed(0) as any
          arr.push(remainingTime)
        }
      }
      Promise.all([arr]).then((res) => {
        setCheck(res[0])
        // return res
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRemainingTime()
  }, [])

  useEffect(() => {
    if (check.length > 0) {
    //  console.log("shawal=============", check)
    }
  }, [check])

  const [myData, setMyData] = useState<any | []>([])
  const { schoolGladiators } = useStore((state) => state)
  // console.log("schoolGladiatorsschoolGladiatorsschoolGladiators", schoolGladiators)
  useEffect(() => {
    if (schoolGladiators) {
      setMyData(schoolGladiators)
    }
  }, [schoolGladiators])

  const { models } = useGetGallery()

  if (myData && myData.length > 0 && !myModels.length) {
    for (let i = 0; i < myData.length; i++) {
      if (myData[i].attributes && myData[i].attributes[0]) {
        merge(myData[i], myData[i].attributes[0])
        merge(myData[i], models.filter((nft) => nft.glTF === myData[i].glTF)[0])
      }
      myData[i].model = useLoader(GLTFLoader, myData[i].glTFPath)
    }
    // console.log("myDataaaaaaaaaaaaaaaaaaaa", myData)
    setMyModels(myData)
  }

  const Dome = () => {
    const texture = useLoader(THREE.TextureLoader, `/images/gallery/school2.jpg`)
    return (
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[30, 100, 100]} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
      </mesh>
    )
  }

  const GroundPlane = () => {
    const texture = useLoader(THREE.TextureLoader, '/images/gallery/textures/carpet.jpeg')
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

  const Arena = () => {
    const gltf = useLoader(GLTFLoader, '/gallery/geonosis_arena/scene.gltf')
    return <primitive object={gltf.scene} scale={[0.01, 0.01, 0.01]} position={[0, -11.6, 0]} receiveShadow />
  }

  const CameraLook = () => {
    useFrame((el) => el.camera.lookAt(0, 2.5, 0))
    return null
  }

  const goPrevPage = () => {
    if (currentPage <= 0) return

    setCurrentPage((prev) => prev - 1)
    setCounter(counter-3)

  }

  const goNextPage = () => {

    if (currentPage >= Math.ceil(myModels.length / 3) - 1) return
    setCurrentPage((prev) => prev + 1)
    setCounter(counter+3)
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




  useEffect(()=>{
// console.log("hey Counter==========================", counter);
  },[counter])
  return (
    <>
      {schoolGladiators ?
        (<StyledViewer>
          <StyledCanvasWrapper>
            <StyledCanvasBack></StyledCanvasBack>
            <Canvas
              camera={{
                fov: cameraProps.fov,
                position: [53.25, 10.11, -0.79],
                rotation: [-1.64, 1.38, 1.65],
                target: [0, 10, 0],
              }}
              shadows
            >
              {/* <fog attach="fog" args={["white", 90, 150]} /> */}
              <ambientLight intensity={ambientLightProps.intensity} />
              <pointLight
                position={pointLightProps.position}
                castShadow
                decay={pointLightProps.decay}
                shadow-mapSize-height={pointLightProps.shadowMapSize}
                shadow-mapSize-width={pointLightProps.shadowMapSize}
              />
              <CameraLook />
              {/* <Controls
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={controlsProps.minPolarAngle}
                        maxDistance={controlsProps.maxDistance}
                        minDistance={controlsProps.minDistance}
                        target={controlsProps.target}
                        enableKeys
                    /> */}
              {/* <Dome /> */}
              {/* <GroundPlane /> */}
              <Suspense fallback={<Loader />}>
                {/* <Arena /> */}
                {getCurrentModels().map((item, index) => (
                  <Model
                    key={item.name + index}
                    data={{
                      setModel: () => true,
                      setColor: () => true,
                      setCurName: setCurName,
                      curSpeed: curSpeed,
                      animations: item?.model?.animations,
                      nodes: item?.model?.nodes,
                      colors: item?.colors ? item?.colors : colors,
                      nft: item,
                      position: {
                        ...item.glTFPosition,
                        z: item.glTFPosition.z - 6 * index + 2 * getCurrentModels().length,
                      },
                    }}
                  />
                ))}
              </Suspense>
            </Canvas>

            <StyledHealthBarWrapper>
              {getCurrentModels().map((item, index) => (
                <HealthBar nft={item} key={index} checking={check[counter+index]} />
              ))}
            </StyledHealthBarWrapper>

            <ButtonGroup />
          </StyledCanvasWrapper>
        </StyledViewer>
      ) : (
        <PageLoader />
      )}
    </>
  )
}

export default Viewer
