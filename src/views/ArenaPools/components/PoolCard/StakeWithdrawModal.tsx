import React, { useState, useEffect } from 'react'
import { CardBody, Flex, Text, CardRibbon, Button, useModal, Modal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useGladiatorNft } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import useStore from '../../../PoolTour3D/store'
import { getAllGladiators } from 'state/nftMarket/helpers'
const CardFlip = styled.div`
  background-color: transparent;
  width: 100%;
  height: 400px;
  perspective: 1000px;
`

const Left = styled.div`
  z-index: 4;
  position: relative;
  left: 1vh;
  top: 13vh;
  & svg:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 100px;
  }
`

const Right = styled.div`
  z-index: 4;

  position: relative;
  left: 34.5vh;
  top: 13vh;
  & svg:hover {
    cursor: pointer;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: 100px;
  }
`

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 640px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 324px;
  }
`
const Slide = styled.img`
  width: 640px;
  margin-top: 50px;
`

const SliderImage = styled.div`
  background-image: url(images/decorations/BG.png);
  border-radius: 24px;
  border: 3px solid #d9ab3a;
  width: 640px;
  height: 440px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 324px;
  }
`

const NewModal = styled(Modal)`
  height: 500px;
  width: 420px;
  overflow-x: hidden;
`

const ConfirmModal = styled(Modal)`
  height: 160px;
  width: 420px;
  overflow-x: hidden;
`

const InnerCard = styled.div`
  height: 100%;
  position: relative;
`
const ButtonMargin = styled.div`
  margin-left: 10px;
  position: relative;
`

const CardFront = styled.div`
  align-items: center;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  & > div {
    flex: 1;
  }
`
interface StakeWithdrawModalProps {
  onDismiss?: () => void
  id: number
}

const StakeWithdrawModal : React.FC<StakeWithdrawModalProps> = ({onDismiss, id}) => {
  
  const [number, setNumber] = useState(0)
  console.log("iddddddddddddddddddddd",id)
  const [image, setImage] = useState('')
  const [show, setShow] = useState(true)
  interface tokenIdI {
    room0: any
    room1: any
    room2: any
    room3: any
  }
  const initialState: tokenIdI = {
    room0: [],
    room1: [],
    room2: [],
    room3: [],
  }
  const [tokenId, setTokenId] = useState<tokenIdI>(initialState)
  const { currentStatics } = useStore((state) => state)
  const gladiatorNftContract = useGladiatorNft()
  console.log('withdrawal', gladiatorNftContract)
  const { account } = useWeb3React()
  console.log('tokenIdtokenIdtokenId', tokenId)
  const withdrawalStake = async () => {
    // console.log('store', currentStatics)

    const data = await gladiatorNftContract.getUserGladiator(account)
    console.log('dataaaa', data)
    for (let i = 0; i < data.length; i++) {
      console.log('FUNCTION WORKING')
      const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
      const claim = userInfo.spot
      console.log('USER INFO===>', userInfo)
      const tokenIdCopy = { ...tokenId }
      if (claim === 'room0') {
        tokenIdCopy.room0.push(parseInt(data[i]._hex.toString(), 16))
      }
      if (claim === 'room1') {
        tokenIdCopy.room1.push(parseInt(data[i]._hex.toString(), 16))
      }
      if (claim === 'room2') {
        tokenIdCopy.room2.push(parseInt(data[i]._hex.toString(), 16))
      }
      if (claim === 'room3') {
        tokenIdCopy.room3.push(parseInt(data[i]._hex.toString(), 16))
      }

      setTokenId(tokenIdCopy)
    }
  }

  // console.log("length",tokenId.room0.length);
  const claimGladiator = () => {
    let idOfGladiator = tokenId[`room${id}`][number]
    console.log(idOfGladiator)
    gladiatorNftContract.withdraw(idOfGladiator)
  }

  const [claim] = useModal(
    <ConfirmModal title="Confirm Withdraw">
      <InnerCard>
        <ButtonMargin>
          <Button onClick={claimGladiator}>Yes</Button>
          <Button onClick={onDismiss}>No</Button>
        </ButtonMargin>
      </InnerCard>
    </ConfirmModal>,
  )

  const rightClick = () => {
    setShow(!show)
setNumber(number + 1)
  }

  const leftClick = () => {
    setShow(!show)
    
    setNumber(number - 1)
      }

  useEffect(() => {
    let idOfGladiator = tokenId[`room${id}`][number]
    console.log('idOfGladiator', idOfGladiator)
    const getgladiators = async () => {
      let gladiators = await getAllGladiators()
      let mygladiator = gladiators.filter((g: any) => g.tokenId == idOfGladiator)[0]?.ipfsJson?.nft?.glTF
      setImage(`/gallery/${mygladiator}/preview.png`)
      console.log('IMAGEE', image, gladiators)
    }
    getgladiators()
  }, [tokenId,number])

  useEffect(() => {
    withdrawalStake()
  }, [gladiatorNftContract, account])
  return (
  <NewModal title="Withdraw Gladiator" onDismiss={onDismiss}>
      {tokenId[`room${id}`][number - 1] && (
        <Left onClick={leftClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#D9AB3A" />
            <path d="M8 12L14 6V18L8 12Z" fill="black" />
          </svg>
        </Left>
      )}
      {tokenId[`room${id}`][number +1] ?  (
        <Right onClick={rightClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="#D9AB3A" />
            <path d="M16 12L10 18V6L16 12Z" fill="black" />
          </svg>
        </Right>): (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="transparent" />
            <path d="M16 12L10 18V6L16 12Z" fill="black" />
          </svg>
        )
      }
      <CardFlip>
        <InnerCard>
          <CardFront>
            <img src={image} alt="nft.name" style={{ width: 'auto', height: '300px' }} />
            {show ? <Button onClick={claim} variant="primary" mt="24px" style={{ backgroundColor: 'green' }}>
              Claim Gladiator
            </Button>: <Button onClick={claim} variant="primary" mt="2px" style={{ backgroundColor: 'green' }}>
              Claim Gladiator
            </Button>}
          </CardFront>
        </InnerCard>
      </CardFlip>
    </NewModal>
  )
}

export default StakeWithdrawModal
