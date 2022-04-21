import { GladiatorsCollectionKey } from 'config/constants/nftsCollections/types'
import gladiatorsCollections from 'config/constants/nftsCollections'
import { getAddress } from 'utils/addressHelpers'

export const nftsBaseUrl = '/nfts'
export const gladiatorCollectiblesAddress = getAddress(gladiatorsCollections[GladiatorsCollectionKey.GLADIATORS].address)
export const gladiatorsSquadAddress = getAddress(gladiatorsCollections[GladiatorsCollectionKey.SQUAD].address)
