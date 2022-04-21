export enum SizeMeasure {
  CM = "centimeters",
  METER = "meters"
}

export enum WeightMeasure {
  GRAMS = "grams",
  LBS = "lbs",
  TONS = "tons",
}

export enum LifeCycle {
  SLAVE = "slave",
  GLADIATOR = "gladiator"
}

export type LifeCyclePricing = {
  lifeCycle: LifeCycle,
  price: number,
  periodInMinutes?: number
}

export enum NftToken {
  NRT = "NRT",
  DENA = "DENA",
}

export enum ListingType {
  CORE,
  COMMUNITY,
  PARTNER
}

export interface GltfXyz {
  x: number
  y: number
  z: number
}

export type GalleryNft = {
  name: string
  orderBy: number
  description: string
  glTF: string
  glTFRootNode?: string
  glTFPath: string
  glTFPosition?: GltfXyz
  glTFScale?: GltfXyz
  glTFRotation?: GltfXyz
  glTFAnimationIndex?: number
  bodyElements: any
  rarity: number | string
  supply: number | string
  size: number | string
  sizeMeasure: SizeMeasure
  weight: number | string
  weightMeasure: WeightMeasure
  initialLifeCycle: LifeCyclePricing
  finalLifeCycle: LifeCyclePricing
  token: NftToken
  minTimeInSeconds: number | string
  inactive?: boolean
  isPromoted?: boolean
  listingType?: ListingType
  userData?: {
    allowance: string
    tokenBalance: string
    stakedBalance: string
    earnings: string
    ipfs: string
  }
  limitSupply: number
  bestTerrain: string
  staminaFillCoast: number
  attributes?: {
    strength: number
    endurance: number
    agility: number
    precision: number
    intelligance: number
    willpower: number
  }
  weapons?: {
    oneHand: number
    twoHand: number
    shield: number
    ranged: number
    dual: number
    polearms: number
  }
  abilities?: {
    leadership: number
    coach: number
    cook: number
    medical: number
    smith: number
    torture: number
  }
}

export enum NftType {
  PANCAKE = 'pancake',
  MIXIE = 'mixie',
}
