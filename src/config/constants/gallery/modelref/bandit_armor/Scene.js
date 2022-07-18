/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: wolkoed (https://sketchfab.com/wolkoed)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/bandit-armor-and-clothes-game-model-d6cf54210a564ff5ab2c288bac7cd66f
title: Bandit Armor and Clothes - Game Model
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group name="metarig" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              geometry={nodes['bandit_makehuman_Low-Poly_Gray_0'].geometry}
              material={nodes['bandit_makehuman_Low-Poly_Gray_0'].material}
              skeleton={nodes['bandit_makehuman_Low-Poly_Gray_0'].skeleton}
            />
            <skinnedMesh
              geometry={nodes.bandit_head_Gray_0.geometry}
              material={nodes.bandit_head_Gray_0.material}
              skeleton={nodes.bandit_head_Gray_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.BanditSuit_BanditSuit_0.geometry}
              material={materials.BanditSuit}
              skeleton={nodes.BanditSuit_BanditSuit_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Pants_Jeans_DarkBlue_01_Pants_0.geometry}
              material={materials.Pants}
              skeleton={nodes.Pants_Jeans_DarkBlue_01_Pants_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.MageBoots_game_Boots_0.geometry}
              material={materials.Boots}
              skeleton={nodes.MageBoots_game_Boots_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Arms_hires_Gray_0.geometry}
              material={nodes.Arms_hires_Gray_0.material}
              skeleton={nodes.Arms_hires_Gray_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Bandit_armourSet01_ArmorMetal_0.geometry}
              material={materials.ArmorMetal}
              skeleton={nodes.Bandit_armourSet01_ArmorMetal_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Axe_rigged_Weapons_0.geometry}
              material={nodes.Axe_rigged_Weapons_0.material}
              skeleton={nodes.Axe_rigged_Weapons_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Sheaths_rigged_Weapons_0.geometry}
              material={nodes.Sheaths_rigged_Weapons_0.material}
              skeleton={nodes.Sheaths_rigged_Weapons_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.VikingShieldLowpoly_Shield_0.geometry}
              material={materials.Shield}
              skeleton={nodes.VikingShieldLowpoly_Shield_0.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Sword_rigged_Weapons_0.geometry}
              material={nodes.Sword_rigged_Weapons_0.material}
              skeleton={nodes.Sword_rigged_Weapons_0.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')