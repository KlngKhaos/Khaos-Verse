import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import GalleryNfts from 'config/constants/gallery/gallery'
import { State } from '../types'
import { fetchWalletGalleryNfts } from './index'

export const useGetGallery = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { isInitialized, isLoading, data } = useSelector((state: State) => state.gallery)
  const identifiers = Object.keys(data)

  useEffect(() => {
    // Fetch nfts only if we have not done so already
    if (!isInitialized) {
      dispatch(fetchWalletGalleryNfts(account))
    }
  }, [isInitialized, account, dispatch])

  return {
    isInitialized,
    isLoading,
    data,
    models: GalleryNfts,
    nftsInWallet: GalleryNfts.filter((nft) => identifiers.includes(nft.glTF)),
  }
}
