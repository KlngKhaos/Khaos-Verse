import { GalleryNft, SizeMeasure, WeightMeasure, LifeCycle, NftToken, ListingType } from './types'

export const IPFS_GATEWAY = 'https://cloudflare-ipfs.com'

/**
 * NOTE: https://cloudflare-ipfs.com does not support video streaming so for the video URLS we need to use
 * https://gateway.pinata.cloud
 */
const GalleryNfts: GalleryNft[] = [
  {
    name: 'Fuse Warrior',
    glTF: 'fuse_warrior',
    glTFPath: '/gallery/fuse_warrior/scene.gltf',
    glTFScale: {
      x: 0.05,
      y: 0.05,
      z: 0.05
    },
    glTFAnimationIndex: 1,
    glTFRotation: {
      x: -Math.PI / 2,
      y: Math.PI / 2,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      Shield_Default_OBJ_0: '/gallery/fuse_warrior/elements/OBJ_0.png',
      Object_79: '/gallery/fuse_warrior/elements/obj79.png',
      Object_80: '/gallery/fuse_warrior/elements/obj80.png',
      Object_81: '/gallery/fuse_warrior/elements/obj81.png',
      Object_82: '/gallery/fuse_warrior/elements/obj82.png'
    },
    description: '',
    rarity: 1,
    supply: null,
    size: 6.05,
    sizeMeasure: SizeMeasure.METER,
    weight: 2400,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 500,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 1250
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 2,
    bestTerrain: 'Glacial',
    staminaFillCoast: 150,
    attributes: {
      strength: 4,
      endurance: 5,
      agility: 10,
      precision: 6,
      intelligance: 7,
      willpower: 8
    },
    weapons: {
      oneHand: 9,
      twoHand: 4,
      shield: 5,
      ranged: 10,
      dual: 6,
      polearms: 7
    },
    abilities: {
      leadership: 8,
      coach: 9,
      cook: 4,
      medical: 5,
      smith: 10,
      torture: 6
    },
  },
  {
    name: 'Ol Veteran',
    glTF: 'ol_veteran',
    glTFPath: '/gallery/ol_veteran/scene.gltf',
    glTFScale: {
      x: 0.05,
      y: 0.05,
      z: 0.05
    },
    glTFRotation: {
      x: -Math.PI / 2,
      y: Math.PI / 2,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      Object_7: '/gallery/ol_veteran/elements/body.png'
    },
    description: '',
    rarity: 1,
    supply: null,
    size: 6.05,
    sizeMeasure: SizeMeasure.METER,
    weight: 2400,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 500,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 1250
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 2,
    bestTerrain: 'Glacial',
    staminaFillCoast: 150,
    attributes: {
      strength: 4,
      endurance: 5,
      agility: 10,
      precision: 6,
      intelligance: 7,
      willpower: 8
    },
    weapons: {
      oneHand: 9,
      twoHand: 4,
      shield: 5,
      ranged: 10,
      dual: 6,
      polearms: 7
    },
    abilities: {
      leadership: 8,
      coach: 9,
      cook: 4,
      medical: 5,
      smith: 10,
      torture: 6
    },
  },
  {
    name: 'Knight Battle',
    glTF: 'knight_battle',
    glTFPath: '/gallery/knight_battle/scene.gltf',
    glTFScale: {
      x: 0.06,
      y: 0.06,
      z: 0.06
    },
    glTFRotation: {
      x: -Math.PI / 2,
      y: 0,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      M_LRG_BlackKnightmo_Hat_Commando_BlackKnight_0: '/gallery/knight_battle/elements/head.png',
      Object_176: '/gallery/knight_battle/elements/body.png'
    },
    description: '',
    rarity: 1,
    supply: null,
    size: 6.05,
    sizeMeasure: SizeMeasure.METER,
    weight: 2400,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 500,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 1250
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 2,
    bestTerrain: 'Glacial',
    staminaFillCoast: 150,
    attributes: {
      strength: 4,
      endurance: 5,
      agility: 10,
      precision: 6,
      intelligance: 7,
      willpower: 8
    },
    weapons: {
      oneHand: 9,
      twoHand: 4,
      shield: 5,
      ranged: 10,
      dual: 6,
      polearms: 7
    },
    abilities: {
      leadership: 8,
      coach: 9,
      cook: 4,
      medical: 5,
      smith: 10,
      torture: 6
    },
  },
  {
    name: 'Gladiator Aware',
    glTF: 'gladiator-aware',
    glTFPath: '/gallery/gladiator-aware/scene.gltf',
    glTFScale: {
      x: 0.05,
      y: 0.05,
      z: 0.05
    },
    glTFRotation: {
      x: -Math.PI / 2,
      y: Math.PI / 2,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      'Shield_Shield#Mat0_0': '/gallery/gladiator-aware/elements/shield.png',
      'Weapon_Weapon#Mat0_0': '/gallery/gladiator-aware/elements/weapon.png',
      'MHead_MHead#Mat0_0': '/gallery/gladiator-aware/elements/head.png',
      'MArmor_MArmor#Mat0_0': '/gallery/gladiator-aware/elements/armor.png',
      'MBody_MBody#Mat0_0': '/gallery/gladiator-aware/elements/arms.png',
      'MBoots_MBoots#Mat0_0': '/gallery/gladiator-aware/elements/boots.png',
      'MGauntlets_MGauntlets#Mat0_0': '/gallery/gladiator-aware/elements/gauntlets.png'
    },
    description: '',
    rarity: 4,
    supply: null,
    size: 6.01,
    sizeMeasure: SizeMeasure.METER,
    weight: 2200,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 350,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 875
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 5,
    bestTerrain: 'Glacial',
    staminaFillCoast: 90,
    attributes: {
      strength: 7,
      endurance: 8,
      agility: 5,
      precision: 10,
      intelligance: 9,
      willpower: 4
    },
    weapons: {
      oneHand: 6,
      twoHand: 7,
      shield: 8,
      ranged: 5,
      dual: 10,
      polearms: 9
    },
    abilities: {
      leadership: 4,
      coach: 6,
      cook: 7,
      medical: 8,
      smith: 5,
      torture: 10
    },
  },
  {
    name: 'Heimjil',
    glTF: 'heimjil',
    glTFPath: '/gallery/heimjil/scene.gltf',
    glTFScale: {
      x: 0.1,
      y: 0.1,
      z: 0.1
    },
    glTFRotation: {
      x: -Math.PI / 2,
      y: Math.PI / 2,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    }
    , glTFRootNode: "_rootJoint"
    , bodyElements: {
      "SK_Dual_Blade_Axe5_M_Dual_Blade_Axe5_0": "/gallery/heimjil/elements/weapon.png",
      "6": "/gallery/heimjil/elements/armor.png",
      "5": "/gallery/heimjil/elements/boots.png",
      "0": "/gallery/heimjil/elements/body.png",
    }
    , description: ""
    , rarity: 3
    , supply: null
    , size: 6.15
    , sizeMeasure: SizeMeasure.METER
    , weight: 2300
    , weightMeasure: WeightMeasure.LBS
    , initialLifeCycle: {

      lifeCycle: LifeCycle.SLAVE,
      price: 100,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 250
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 8,
    bestTerrain: 'Desert',
    staminaFillCoast: 30,
    attributes: {
      strength: 10,
      endurance: 9,
      agility: 8,
      precision: 7,
      intelligance: 6,
      willpower: 5
    },
    weapons: {
      oneHand: 4,
      twoHand: 10,
      shield: 9,
      ranged: 8,
      dual: 7,
      polearms: 6
    },
    abilities: {
      leadership: 5,
      coach: 4,
      cook: 10,
      medical: 9,
      smith: 8,
      torture: 7
    },
  },
  {
    name: 'Hero Warrior',
    glTF: 'hero_warrior',
    glTFPath: '/gallery/hero_warrior/scene.gltf',
    glTFScale: {
      x: 0.25,
      y: 0.25,
      z: 0.25
    },
    glTFRotation: {
      x: -Math.PI / 2,
      y: Math.PI / 2,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      default__0: '/gallery/hero_warrior/elements/body.png'
    },
    description: '',
    rarity: 3,
    supply: null,
    size: 6.09,
    sizeMeasure: SizeMeasure.METER,
    weight: 2100,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 400,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 1000
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 4,
    bestTerrain: 'Mountains',
    staminaFillCoast: 110,
    attributes: {
      strength: 6,
      endurance: 7,
      agility: 4,
      precision: 5,
      intelligance: 8,
      willpower: 9
    },
    weapons: {
      oneHand: 10,
      twoHand: 6,
      shield: 7,
      ranged: 4,
      dual: 5,
      polearms: 8
    },
    abilities: {
      leadership: 9,
      coach: 10,
      cook: 6,
      medical: 7,
      smith: 4,
      torture: 5
    },
  },
  {
    name: 'Taunt Battlecry',
    glTF: 'standing_taunt_battlecry',
    glTFPath: '/gallery/standing_taunt_battlecry/scene.gltf',
    glTFScale: {
      x: 0.06,
      y: 0.06,
      z: 0.06
    },
    glTFRotation: {
      x: -Math.PI / 2,
      y: Math.PI / 2,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      // Object_9: '/gallery/standing_taunt_battlecry/elements/obj9.png',
      // Object_10: '/gallery/standing_taunt_battlecry/elements/obj10.png',
      // Object_12: '/gallery/standing_taunt_battlecry/elements/obj12.png',
      // Object_14: '/gallery/standing_taunt_battlecry/elements/obj14.png',
      Object_14: '/gallery/standing_taunt_battlecry/elements/preview.png',
    },
    description: '',
    rarity: 1,
    supply: null,
    size: 6.05,
    sizeMeasure: SizeMeasure.METER,
    weight: 2400,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 500,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 1250
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 2,
    bestTerrain: 'Glacial',
    staminaFillCoast: 150,
    attributes: {
      strength: 4,
      endurance: 5,
      agility: 10,
      precision: 6,
      intelligance: 7,
      willpower: 8
    },
    weapons: {
      oneHand: 9,
      twoHand: 4,
      shield: 5,
      ranged: 10,
      dual: 6,
      polearms: 7
    },
    abilities: {
      leadership: 8,
      coach: 9,
      cook: 4,
      medical: 5,
      smith: 10,
      torture: 6
    },
  },
  {
    name: 'Fantasy Warrior',
    glTF: 'fantasy_warrior',
    glTFPath: '/gallery/fantasy_warrior/scene.gltf',
    glTFScale: {
      x: 4,
      y: 4,
      z: 4
    },
    glTFRotation: {
      x: Math.PI / 2,
      y: -Math.PI / 2,
      z: Math.PI / 2
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      warrior_warrior_0: '/gallery/fantasy_warrior/elements/body.png',
      sword_warrior_0: '/gallery/fantasy_warrior/elements/weapon.png',
      shield_warrior_0: '/gallery/fantasy_warrior/elements/shield.png'
    },
    description: '',
    rarity: 6,
    supply: null,
    size: 6.14,
    sizeMeasure: SizeMeasure.METER,
    weight: 2700,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 200,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 500,
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 7,
    bestTerrain: 'Mountain',
    staminaFillCoast: 50,
    attributes: {
      strength: 9,
      endurance: 10,
      agility: 7,
      precision: 8,
      intelligance: 4,
      willpower: 6
    },
    weapons: {
      oneHand: 5,
      twoHand: 9,
      shield: 10,
      ranged: 7,
      dual: 8,
      polearms: 4
    },
    abilities: {
      leadership: 6,
      coach: 5,
      cook: 9,
      medical: 10,
      smith: 7,
      torture: 8
    },
  },
  {
    name: 'Third Legion Legionnaire',
    glTF: 'third_legion_legionnaire',
    glTFPath: '/gallery/third_legion_legionnaire/scene.gltf',
    glTFScale: {
      x: 0.04,
      y: 0.04,
      z: 0.04
    },
    glTFRotation: {
      x: -Math.PI / 2,
      y: 0,
      z: Math.PI / 3
    },
    glTFPosition: {
      x: 0,
      y: -4,
      z: 0
    },
    glTFRootNode: '_rootJoint',
    bodyElements: {
      Plane008_0: '/gallery/third_legion_legionnaire/elements/body.png'
    },
    description: '',
    rarity: 1,
    supply: null,
    size: 6.05,
    sizeMeasure: SizeMeasure.METER,
    weight: 2400,
    weightMeasure: WeightMeasure.LBS,
    initialLifeCycle: {
      lifeCycle: LifeCycle.SLAVE,
      price: 500,
      periodInMinutes: 120
    },
    finalLifeCycle: {
      lifeCycle: LifeCycle.GLADIATOR,
      price: 1250
    },
    token: NftToken.NRT,
    minTimeInSeconds: 7200,
    listingType: ListingType.CORE,
    orderBy: 0,
    limitSupply: 2,
    bestTerrain: 'Glacial',
    staminaFillCoast: 150,
    attributes: {
      strength: 4,
      endurance: 5,
      agility: 10,
      precision: 6,
      intelligance: 7,
      willpower: 8
    },
    weapons: {
      oneHand: 9,
      twoHand: 4,
      shield: 5,
      ranged: 10,
      dual: 6,
      polearms: 7
    },
    abilities: {
      leadership: 8,
      coach: 9,
      cook: 4,
      medical: 5,
      smith: 10,
      torture: 6
    },
  },
]

export default GalleryNfts
