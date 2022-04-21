import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import styled from 'styled-components'
import { GalleryNft } from 'config/constants/gallery/types'
import Controls from './THREE/Controls';
import Model from './THREE/Model';
import Loader from './UI/Loader';

import {
    ambientLightProps,
    cameraProps,
    controlsProps,
    pointLightProps,
    BackPaths
} from '../utils/constant';


let home2;

const StyledViewer = styled.div`
    ${!home2 ? "80%" : "100%"};
    padding: 5px;
    text-align: center;
`
const StyledCanvasWrapper = styled.div`
    height: ${!home2 ? "600px" : "478px"};
    background-color: transparent;
    width: ${!home2 ? "100%" : "500px"};
`

const StyledElementWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    overflow: auto;
`
const StyledElement = styled.div`
    width: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    height: 100px;
    border: 0px solid #f1416c;
    margin-top: 10px;
    margin-left: 15px;

    &:hover {
        cursor: pointer;
        border: 5px solid #b84969;
    }
`

type ChildProps = {
    setModel?: any,
    nft: any | null,
    curColor: string,
    curName: string,
    setCurName?: (arg0: string) => void,
    curSpeed: any,
    curBack: any,
    colors: any,
    showToast?: any,
    home?: any,
    hideBackground?: any,
    noCameraControl?: any,
}

const ViewerSolo: React.FC<ChildProps> = ({ nft, curName, setCurName, curSpeed, curBack, colors, setModel, showToast, home, hideBackground, noCameraControl }) => {
    const ShowModel = () => {
        const model = useLoader(GLTFLoader, nft.glTFPath);
        const { nodes, animations } = model;
        React.useEffect(() => {
            if (home) {
                home2 = home
                // console.log(home2);
            }
            // eslint-disable-next-line
        }, [home])
        return (
            <Model
                data={{
                    'setModel': setModel,
                    'setColor': () => true,
                    'setCurName': setCurName,
                    'curSpeed': curSpeed,
                    'animations': animations,
                    'nodes': nodes,
                    'colors': colors,
                    'nft': nft,
                    'showToast': showToast,
                }}
            />
        );
    }
    const imageURL = (name) => `url(${nft.bodyElements[name]})`
    const ShowElements = () => {
        if (nft.bodyElements)
            return (
                <>
                    {
                        Object.keys(nft.bodyElements).map((name) => {
                            return <StyledElement
                                onClick={() => { setCurName(name) }}
                                key={name}
                                style={{ backgroundImage: imageURL(name), borderWidth: name === curName ? 5 : 0 }} />
                        })
                    }
                </>
            );
        return null;
    }

    const Dome = () => {
        const texture = useLoader(THREE.TextureLoader, BackPaths[curBack])
        return (
            <mesh>
                <sphereBufferGeometry attach="geometry" args={[50, 100, 100]} />
                <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
            </mesh>
        )
    }

    const GroundPlane = () => {
        const texture = useLoader(THREE.TextureLoader, '/images/gallery/textures/1.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(64, 64);
        texture.anisotropy = 16;

        return (
            <mesh receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
                <planeBufferGeometry attach="geometry" args={[500, 500]} />
                <meshPhongMaterial attach="material" map={texture} side={THREE.DoubleSide} />
            </mesh>
        );
    }

    return (
        <StyledViewer style={{ width: "100%" }}>
            <StyledCanvasWrapper>
                <Canvas camera={cameraProps} shadows>
                    <fog attach="fog" args={["white", 90, 150]} />

                    <ambientLight intensity={ambientLightProps.intensity} />
                    <pointLight
                        position={pointLightProps.position}
                        castShadow
                        decay={pointLightProps.decay}
                        shadow-mapSize-height={pointLightProps.shadowMapSize}
                        shadow-mapSize-width={pointLightProps.shadowMapSize}
                    />
                    {!home && <Controls
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={controlsProps.minPolarAngle}
                        maxDistance={controlsProps.maxDistance}
                        minDistance={controlsProps.minDistance}
                        target={controlsProps.target}
                        enableKeys
                    />}
                    <Suspense fallback={<Loader />}>
                        {!home && <Dome />}
                        {!home && <GroundPlane />}
                        <ShowModel />
                    </Suspense>
                </Canvas>
            </StyledCanvasWrapper>
            <StyledElementWrapper>
                {!home && <ShowElements />}
            </StyledElementWrapper>
        </StyledViewer>
    )
}

export default ViewerSolo