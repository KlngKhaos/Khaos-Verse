import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GalleryState } from 'state/types'
import collections from 'config/constants/nfts/collections'
import { NftType } from 'config/constants/gallery/types'
import { getAddress } from 'utils/addressHelpers'
import { getErc721Contract } from 'utils/contractHelpers'
import { getNftByTokenId } from 'utils/collectibles'
import { ethers } from 'ethers'

const initialState: GalleryState = {
  isInitialized: false,
  isLoading: true,
  data: {},
  models: []
}

type NftSourceItem = [number, string]

// Thunks
export const fetchWalletGalleryNfts = createAsyncThunk<NftSourceItem[], string>(
  'gallery/fetchWalletGalleryNfts',
  async (account) => {
    // For each nft source get nft data
    const nftSourcePromises = Object.keys(collections).map(async (nftSourceType) => {
      const { address: addressObj } = collections[nftSourceType as NftType]
      const address = getAddress(addressObj)
      const contract = getErc721Contract(address)

      const getTokenIdAndData = async (index: number) => {
        try {
          const tokenIdBn: ethers.BigNumber = await contract.tokenOfOwnerByIndex(account, index)
          const tokenId = tokenIdBn.toNumber()

          const walletNft = await getNftByTokenId(address, tokenId)
          return [tokenId, walletNft.identifier]
        } catch (error) {
          console.error('getTokenIdAndData', error)
          return null
        }
      }

      const balanceOfResponse = await contract.balanceOf(account)
      const balanceOf = balanceOfResponse.toNumber()

      if (balanceOf === 0) {
        return []
      }

      const nftDataFetchPromises = []

      // For each index get the tokenId and data associated with it
      for (let i = 0; i < balanceOf; i++) {
        nftDataFetchPromises.push(getTokenIdAndData(i))
      }

      const nftData = await Promise.all(nftDataFetchPromises)
      return nftData
    })

    const nftSourceData = await Promise.all(nftSourcePromises)

    return nftSourceData.flat()
  },
)

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWalletGalleryNfts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchWalletGalleryNfts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isInitialized = true
      state.data = action.payload.reduce((accum, association) => {
        if (!association) {
          return accum
        }

        const [tokenId, identifier] = association as NftSourceItem

        return {
          ...accum,
          [identifier]: accum[identifier] ? [...accum[identifier], tokenId] : [tokenId],
        }
      }, {})
    })
  },
})

export default gallerySlice.reducer
