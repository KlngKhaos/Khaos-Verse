import React, { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useStore from '../../../store';

interface ModelProps extends MeshProps {
  data: {
    setModel: (model: any) => void;
    setColor: (col: any) => void;
    setCurName: (name: any) => void;
    curSpeed: any;
    nodes: any;
    colors: any;
    animations: any;
    nft?: any;
    position: any;
  };
}

interface actions {
  current: {
    idle: {
      play: () => void,
    };
  };
}

const Model: (props: ModelProps) => JSX.Element | null = (props) => {
  const {
    data: { setModel, setCurName, curSpeed, nodes, colors, animations, nft, position },
  } = props;
  const group = useRef()

  const actions: actions = useRef();

  const [mixer] = useState(() => new THREE.AnimationMixer(group));

  const showStatics = useStore(state => state.showStatics);
  const updateShowStatics = useStore(state => state.updateShowStatics);
  const currentStatics = useStore(state => state.currentStatics);
  const updateCurrentStatics = useStore(state => state.updateCurrentStatics);
  const currentHoverModel = useStore(state => state.currentHoverModel);
  const updateCurrentHoverModel = useStore(state => state.updateCurrentHoverModel);

  useEffect(() => {
    setModel({ 'scene': group.current });
  }, [setModel]);

  useEffect(() => {
    if (animations.length) {
      actions.current = {
        idle: mixer.clipAction(animations[nft.glTFAnimationIndex || 0], group.current),
      };
      actions.current.idle.play();
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))

  }, [animations, mixer]);

  useFrame((_, delta) => mixer.update(delta * curSpeed));
  const positionX = position?.x || 0;
  const positionY = position?.y || 0;
  const positionZ = position?.z || 0;

  const scaleX = nft.glTFScale?.x || 1;
  const scaleY = nft.glTFScale?.y || 1;
  const scaleZ = nft.glTFScale?.z || 1;

  const rotationX = nft.glTFRotation?.x || -Math.PI / 2;
  const rotationY = nft.glTFRotation?.y || 0;
  const rotationZ = nft.glTFRotation?.z || 0;

  const setModelStatics = () => {
    const temp = { ...nft };
    delete temp.model;
    updateCurrentStatics(temp);
  }
  const isSelected = () => (!showStatics && !currentHoverModel) || currentHoverModel?.hash === nft.hash || nft.hash === currentStatics?.hash;

  return (
    <group position={[positionX, positionY, positionZ]}>
      <group ref={group} dispose={null} scale={[scaleX, scaleY, scaleZ]}>
        <group rotation={[rotationX, rotationY, rotationZ]}>
          <group >
            {nodes[nft.glTFRootNode || 'Armature_rootJoint'] ?
              <primitive object={nodes[nft.glTFRootNode || 'Armature_rootJoint']} /> : null
            }
            {
              Object.keys(nodes).map((name) => {
                return nodes[name].isSkinnedMesh ? (
                  <skinnedMesh
                    castShadow
                    key={nodes[name].uuid}
                    geometry={nodes[name].geometry}
                    material={nodes[name].material}
                    skeleton={nodes[name].skeleton}
                    morphTargetDictionary={nodes[name].morphTargetDictionary}
                    morphTargetInfluences={nodes[name].morphTargetInfluences}
                    material-color={isSelected() ? (colors[name] ? colors[name] : '#ffffff') : '#111111'}
                    onClick={(e) => { setCurName(name); setModelStatics(); e.stopPropagation(); }}
                    onPointerMove={() => updateCurrentHoverModel(nft)}
                    onPointerOut={() => updateCurrentHoverModel(null)}
                  />
                ) : nodes[name].isMesh ? (
                  <mesh
                    castShadow
                    key={nodes[name].uuid}
                    material={nodes[name].material}
                    material-color={isSelected() ? (colors[name] ? colors[name] : '#ffffff') : '#111111'}
                    morphTargetDictionary={nodes[name].morphTargetDictionary}
                    morphTargetInfluences={nodes[name].morphTargetInfluences}
                    onClick={(e) => { setCurName(name); setModelStatics(); e.stopPropagation() }}
                    onPointerMove={() => updateCurrentHoverModel(nft)}
                    onPointerOut={() => updateCurrentHoverModel(null)}
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