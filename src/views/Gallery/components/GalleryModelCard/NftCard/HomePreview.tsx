import React from 'react'
import styled from 'styled-components'
import { GalleryNft } from 'config/constants/gallery/types'

interface HomePreviewProps {
  nft: GalleryNft
  isOwned?: boolean
}

const Container = styled.div`
  background-color: #000;
  position: relative;
  width: 100%;
  overflow: hidden;
//   padding-bottom: 100%;
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
  @media (min-width: 0px) and (max-width: 480px) {
    /* max-height: auto; */
    max-width: 100%;
    /* width: auto; */
    /* height: auto; */
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`

const HomePreview: React.FC<HomePreviewProps> = ({ nft, isOwned = false }) => {
  const { glTF, name, userData } = nft
  const previewImageSrc = `/gallery/${glTF}/preview.png`

  // if (video) {
  //   const videoComponent = (
  //     <StyledVideo autoPlay controls={false} loop muted poster={previewImageSrc}>
  //       <source src={video.webm} type="video/webm" />
  //       <source src={video.mp4} type="video/mp4" />
  //     </StyledVideo>
  //   )

  //   return isOwned ? (
  //     <a href={images.ipfs} target="_blank" rel="noreferrer noopener">
  //       {videoComponent}
  //     </a>
  //   ) : (
  //     videoComponent
  //   )
  // }

  const previewImage = <StyledImage src={previewImageSrc} alt={name} />

  return (
    <Container>
      {isOwned ? (
        <a href={userData.ipfs} target="_blank" rel="noreferrer noopener">
          {previewImage}
        </a>
      ) : (
        previewImage
      )}
    </Container>
  )
}

export default HomePreview
