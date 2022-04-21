import { GalleryNft } from 'config/constants/gallery/types'

const isArchivedGalleryNft = (nft: GalleryNft) => nft.inactive

export default isArchivedGalleryNft
