import React, { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useStore from '../../../store/store';
import CCapture from 'ccapture.js-npmfixed/src/CCapture';
import { pick, merge } from 'lodash';
import axios from 'axios';

interface ModelProps extends MeshProps {
  data: {
    setColor: (col: any) => void;
    setCurName: (name: any) => void;
    curSpeed: any;
    nodes: any;
    colors: any;
    animations: any;
    nft?: any;
    setModel: any;
    showToast: any;
  };
}

interface actions {
  current: {
    idle: {
      play: () => void,
      reset: () => void,
    };
  };
}

const capturerOptions = {
  verbose: false,
  display: true,
  framerate: 24,
  quality: 99,
  format: 'gif',
  timeLimit: 10, // seconds recording.
  frameLimit: 250, // max no of frames
  autoSaveTime: 0,
  workersPath: '/'
}

var capturer = new CCapture( capturerOptions );

const Model: (props: ModelProps) => JSX.Element | null = (props) => {
  const {
    data: { setModel, setCurName, curSpeed, nodes, colors, animations, nft, showToast },
  } = props;
  const group = useRef()

  const { gl, scene, camera } = useThree()

  const actions: actions = useRef();

  const [mixer] = useState(() => new THREE.AnimationMixer(group));

  const {buyFlag, updateBuyFlag} = useStore(state => state);
  const buyStatus = useStore( state => state.buyStatus );
  const updateBuyStatus = useStore( state => state.updateBuyStatus );
  const setNft = useStore(state => state.setNft)
  const isRecording = useStore(state => state.isRecording);
  const updateIsRecording = useStore(state => state.updateIsRecording);

  const {jsonHash, setJsonHash, picHash, setPicHash} = useStore(state => state)

  const exportPNG = () => {
    camera.position.x = 40;
    camera.position.y = 2.44;
    camera.position.z = 2.44;

    camera.rotation.x = -6.16;
    camera.rotation.y = 1.57;
    camera.rotation.z = 0;

    camera.quaternion.x = -2.16;
    camera.quaternion.y = 0.70;
    camera.quaternion.z = 2.16;
    camera.quaternion.w = 0.7;

    camera.zoom = 1;

    gl.setSize(1920, 1080, false);

    setTimeout(() => {
      if( animations.length ) {
        actions.current = {
          idle: mixer.clipAction(animations[nft.glTFAnimationIndex || 0], group.current),
        };
        actions.current.idle.reset();
      }

      gl.render(scene, camera);

      gl.domElement.toBlob(
        function (blob: any) {
          // console.log("going to deploy savePicToIPFS")
            savePicToIPFS(blob, 'HDImage');

            // var a = document.createElement("a");
            // document.body.appendChild(a);

            // var url  = window.URL.createObjectURL(blob);

            // a.href = url;
            // a.download = 'screenshot';
            // a.click();

            // window.URL.revokeObjectURL(url);
        },
        'image/png',
        1.0
      )
    })
  }

  const exportGIF = () => {
    updateIsRecording(isRecording + 1);
  }

  const saveNFTJSONToIPFS = (hash) => {
    const pinataApiKey = process.env.REACT_APP_pinataApiKey;
    const pinataSecretApiKey = process.env.REACT_APP_pinataSecretApiKey;
    const url = process.env.REACT_APP_pinJSONPostURL;
// console.log("bhaaaaaaaaaaaiiiiiiiiiiii in saveNFTJSONToIPFS")
    const data = {
      pinataMetadata: {
        name: 'NFT Info JSON',
      },
      pinataContent: {
        attributes: [
          pick(merge({}, nft, {colors}), ['colors', 'name', 'glTF', 'glTFPath', 'description', 'rarity', 'supply', 'attributes', 'weapons', 'abilities', 'token']),
        ],
        name: nft.name || 'NFT Info JSON',
        description: 'NFT Info JSON',
        image: `ipfs://${hash}`,
        external_url: "https://testnet.gladiators.finance/", 
      }
    }
    const dataForDb = {
      nft: {
        ...nft,
        colors
      }
    }
setNft(dataForDb)
    axios.post(url, data, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey
      }
    }).then((response) => {
      let temp = localStorage.getItem('myNfts') ? JSON.parse( localStorage.getItem('myNfts') ) : [];
      temp.push( response.data.IpfsHash );
      localStorage.setItem( 'myNfts', JSON.stringify(temp) );
      updateBuyStatus({ ...buyStatus, json: true });
      setJsonHash(response.data.IpfsHash)

    }).catch((err) => {
      showToast('error', 'Your purchase was not successful at this moment, please try again');
    })
  }

  const savePicToIPFS = (blob, name) => {
    const pinataApiKey : string = (process.env.REACT_APP_pinataApiKey as string);
    const pinataSecretApiKey : string = (process.env.REACT_APP_pinataSecretApiKey as string);
    const url : string = (process.env.REACT_APP_pinFilePostURL as string);
    const data = new FormData();
    data.append('file', blob);
    
    const metadata = JSON.stringify({
      name: name,
    });
    data.append('pinataMetadata', metadata);

    axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin':'https://localhost:3000',
        'Content-Type': `multipart/form-data; boundary=`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey
      }
    }).then((response) => {
      if( name === 'HDImage' ){
        updateBuyStatus({ image: true });
        setPicHash(response.data.IpfsHash);
        // console.log("going to deploy JSON")
        saveNFTJSONToIPFS(response.data.IpfsHash)
      }
      // else if( name === 'Gif Image' ){
      updateBuyStatus({ gif: true });
      // }
    }).catch((err) => {
      showToast('error', 'Your purchase was not successful at this moment, please try again');
    })
  }

  useEffect(() => {
    if( animations.length ) {
      actions.current = {
        idle: mixer.clipAction(animations[nft.glTFAnimationIndex || 0], group.current),
      };
      actions.current.idle.play();
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))

  }, [animations, mixer]);

  useEffect(() => {
    if( buyFlag) {
      // console.log("buyFlagbuyFlagbuyFlag", buyFlag)
      const scene = group.current;
      setModel(scene, animations);
      exportPNG();
      updateBuyFlag(false)
      // exportGIF();
    }
  }, [buyFlag]);

  useEffect(() => {
    if( isRecording === 48 ) {
      capturer.save((blob) => {
        savePicToIPFS(blob, 'Gif Image');

        capturer.stop();
        capturer = new CCapture( capturerOptions );
      });
    }
  }, [ isRecording ])

  useFrame((state) => {
    if( isRecording === 1 ) {
      capturer.start();
    }

    if( isRecording >= 1 ) {
      state.gl.setSize(480, 320, false);
      state.gl.render(scene, camera);

      capturer.capture(state.gl.domElement)
      updateIsRecording(isRecording + 1);

      if( isRecording === 48 ) {
        updateIsRecording(0);
        capturer.stop();

        state.gl.setSize(state.gl.domElement.getClientRects()[0].width, state.gl.domElement.getClientRects()[0].height, false);
      }
    }
  });

  useFrame((_, delta) => mixer.update(delta * curSpeed));
  const positionX = nft.glTFPosition?.x || 0;
  const positionY = nft.glTFPosition?.y || 0;
  const positionZ = nft.glTFPosition?.z || 0;
  
  const scaleX = nft.glTFScale?.x || 1;
  const scaleY = nft.glTFScale?.y || 1;
  const scaleZ = nft.glTFScale?.z || 1;

  const rotationX = nft.glTFRotation?.x || -Math.PI / 2;
  const rotationY = nft.glTFRotation?.y || 0;
  const rotationZ = nft.glTFRotation?.z || 0;
  
  return (
    <group position={[positionX, positionY, positionZ]}>
      <group ref={group} dispose={null} scale={[scaleX, scaleY, scaleZ]}>
        <group rotation={[rotationX, rotationY, rotationZ]}>
          <group >
            { nodes[nft.glTFRootNode || 'Armature_rootJoint'] ? 
              <primitive object={nodes[nft.glTFRootNode || 'Armature_rootJoint']} /> : null
            }
            {
              Object.keys(nodes).map((name) => {
                // console.log(`isSkin [${nodes[name].isSkinnedMesh}] name [${name}], uuid [${nodes[name].uuid}], color [${colors[name]}]`)
                return nodes[name].isSkinnedMesh ? (
                  <skinnedMesh
                    castShadow
                    key={nodes[name].uuid}
                    geometry={nodes[name].geometry}
                    material={nodes[name].material}
                    skeleton={nodes[name].skeleton}
                    morphTargetDictionary={nodes[name].morphTargetDictionary}
                    morphTargetInfluences={nodes[name].morphTargetInfluences}
                    material-color={colors[name] ? colors[name] : '#ffffff'}
                    onClick={(e) => { setCurName(name); e.stopPropagation() }}
                  />
                ) : nodes[name].isMesh ? (
                  <mesh
                    castShadow
                    key={nodes[name].uuid}
                    material={nodes[name].material}
                    material-color={colors[name] ? colors[name] : '#ffffff'}
                    onClick={(e) => { setCurName(name); e.stopPropagation() }}
                  />
                ) : null;
              })
            }
            </group>
        </group>
      </group>
    </group>
  );
};

export default Model;
