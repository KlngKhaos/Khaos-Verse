import { Address } from '../types'

export enum GladiatorsCollectionKey {
  GLADIATORS = 'gladiators',
  SQUAD = 'pancakeSquad',
}

export type GladiatorsCollection = {
  name: string
  description?: string
  slug: string
  address: Address
}

export type GladiatorsCollections = {
  [key in GladiatorsCollectionKey]: GladiatorsCollection
}
