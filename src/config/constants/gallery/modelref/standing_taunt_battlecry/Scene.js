/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: 2030978 (https://sketchfab.com/2030978)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/standing-taunt-battlecry-e1ad07ed66e9435ca96b63968f67fca2
title: Standing Taunt Battlecry
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={1.6}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group>
              <group>
                <group>
                  <primitive object={nodes._rootJoint} />
                  <group />
                  <group />
                  <group />
                  <group />
                  <group />
                  <group />
                  <group />
                  <group />
                  <group />
                  <skinnedMesh geometry={nodes.Object_6.geometry} material={nodes.Object_6.material} skeleton={nodes.Object_6.skeleton} />
                  <skinnedMesh geometry={nodes.Object_7.geometry} material={nodes.Object_7.material} skeleton={nodes.Object_7.skeleton} />
                  <skinnedMesh geometry={nodes.Object_9.geometry} material={nodes.Object_9.material} skeleton={nodes.Object_9.skeleton} />
                  <skinnedMesh geometry={nodes.Object_10.geometry} material={nodes.Object_10.material} skeleton={nodes.Object_10.skeleton} />
                  <skinnedMesh geometry={nodes.Object_12.geometry} material={nodes.Object_12.material} skeleton={nodes.Object_12.skeleton} />
                  <skinnedMesh geometry={nodes.Object_14.geometry} material={nodes.Object_14.material} skeleton={nodes.Object_14.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
