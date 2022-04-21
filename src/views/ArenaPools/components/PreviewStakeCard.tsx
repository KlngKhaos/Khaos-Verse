import React from 'react'
import styled from 'styled-components'
// import { GalleryNft } from 'config/constants/gallery/types'
import GalleryNft from '../../../config/constants/gallery/gallery'
import { useTranslation } from 'contexts/Localization'
import { useLocation } from 'react-router-dom'

// interface PreviewStakeCardProps {
//     nft: GalleryNft
// }

const Container = styled.div`
  background-color: #000;
//   position: relative;
  width: 100%;
  overflow: hidden;
    padding: 15px;
`

const StyledImage = styled.img`
  transition: opacity 1s linear;
  object-fit: scale-down;
  border-radius: 24px 24px 0 0;
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

// const PreviewStakeCard: React.FC<PreviewStakeCardProps> = ({nft}) => {
  const PreviewStakeCard = () => {
  const { t } = useTranslation()
    const location=useLocation();
const glTF = GalleryNft.map(x=>x.glTF)
console.log(glTF, 'gltf')
let obj =location.state as any;
    // : React.FC<PreviewStakeCard>
    // { nft, isOwned = false }
    // const { glTF, name, userData } = nft


    const image = location?.state?   glTF.filter((i:any)=>i===obj?.currentStatics?.glTF)[0]: ""
    // <img src="/images/decorations/5.png" alt={t('RoomPools')} />
    const previewImageSrc = `/gallery/${image}/preview.png`
console.log("IMAGE", image)
    const previewImage = <StyledImage src={previewImageSrc} alt="Name" />

    return (
        <Container>
            {/* {isOwned ? (
                <a href={userData.ipfs} target="_blank" rel="noreferrer noopener">
                    {previewImage}
                </a>
            ) : ( */}
            {/* {previewImage} */}
            <img src={image!==""? previewImageSrc: "/images/decorations/5.png"} alt="name" />
            
            {/* )} */}
        </Container>
    )
}

export default PreviewStakeCard
