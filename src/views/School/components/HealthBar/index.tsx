import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Flex, BalanceInput, Modal, Text, useModal, Box } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGladiatorNft } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import GalleryNfts from 'config/constants/gallery/gallery'
import { Progress } from '@pancakeswap/uikit'

const StyledHealthBar = styled.div`
  width: 192px;
  height: 300px;
  background: #121212;
  border-radius: 10px;
  border: 3px solid #121212;
  margin: 0 3.5vw;
  padding: 0.1vw 0.5vw;
  position: relative;
  bottom: -7vw;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    bottom: -46px;
    -webkit-bottom: -46px;
    -moz-bottom: -46px;
    -ms-bottom: -46px;
    -o-bottom: -46px;
  }
`

const StyledAvatar = styled.img`
  height: 165px;
  margin-bottom: 2px;
`

const StyledName = styled.div`
  font-size: 17px;
  color: white;
`

const StyledRemaining = styled.div`
  font-size: 13px;
  color: white;
`

const StyledBar = styled.div`
  width: 100%;
  height: 15px;
  background: green;
  margin: 5px 0;
  text: 100;
`
const NewModal = styled(Modal)`
  height: 500px;
  width: 420px;
  overflow-x: hidden;
`
const CardFlip = styled.div`
  background-color: transparent;
  width: 100%;
  height: 400px;
  perspective: 1000px;
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
const InnerCard = styled.div`
  height: 100%;
  position: relative;
`

const HealthBar = ({ nft, checking }) => {
  const [primaryStep, setPrimaryStep] = useState(checking)
  // console.log(nft);
  const { account } = useWeb3React()
  const [remaining, setRemaining] = useState(null)
  const [check, setCheck] = useState([])
  const gladiatorNftContract = useGladiatorNft()
  let minTime = GalleryNfts.map((time: any) => Number(time?.minTimeInSeconds))
  let arr = []

  const getRemainingTime = async () => {
    try {
      const data = await gladiatorNftContract.getUserGladiator(account)
      for (let i = 0; i < data.length; i++) {
        const userInfo = await gladiatorNftContract.userInfo(account, data[i]._hex.toString())
        // console.log(userInfo)
        if (userInfo['spot'] === 'school') {
          const startTime = userInfo.startTime
          let convert = startTime._hex.toString()
          convert = parseInt(convert, 16)
          convert = Number(convert + '000')
          // convert = new Date(convert)
          let date = Date.parse(new Date() as any)
          let remainingTime = (convert + Number(minTime[0] + `000`) - date) / 60000
          remainingTime = remainingTime.toFixed(0) as any
          arr.push(remainingTime)
          // setRemaining(remainingTime)
          // console.log(remainingTime);

          // return remaining
          // return remainingTime.toFixed(0);

          // console.log()
          // convert = Number(convert);
          // console.log(minTime);
        }
      }
      Promise.all([arr]).then((res) => {
        // console.log("hey shawal=======================",res)
        setCheck(res[0])
        // return res
      })
      const remTime = arr.map((rem) => setRemaining(rem))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRemainingTime()
  }, [])

  useEffect(() => {
    if (check.length > 0) {
    }
  }, [check])

  const { t } = useTranslation()
  const [flip, setFlip] = useState(false)
  const [value, setValue] = useState('')

  const handleClick = () => {
    setFlip(!flip)
  }

  useEffect(() => {
    // console.log(flip)
  }, [flip])

  const handleInputChange = (e) => {
    setValue(e?.target?.value)
  }

  const [withdraw] = useModal(
    <NewModal title="Withdraw Gladiator">
      <CardFlip>
        <InnerCard>
          <CardFront>
            <img src={`/gallery/${nft.glTF}/preview.png`} alt="nft.name" style={{ width: 'auto', height: '300px' }} />
            <Button variant="primary" mt="15px" >
              Claim Gladiator
            </Button>
          </CardFront>
        </InnerCard>
      </CardFlip>
    </NewModal>,
  )

  return (
    <StyledHealthBar>
      {/* {check.map((d)=>{
        return(
          <StyledRemaining>Remaining Time: {d} min</StyledRemaining>
        )
      })} */}

      <StyledRemaining>Remaining Time: {checking > 0 ? checking : 0} min</StyledRemaining>

      {/* <StyledBar></StyledBar> */}
      <div style={{ margin: '4px', backgroundColor: 'green' }}  >
        <Progress variant='flat' primaryStep={checking > 0 ? (checking * 100) / 120 : 0} />
      </div>
      <StyledAvatar src={`/gallery/${nft.glTF}/preview.png`}></StyledAvatar>

      <StyledName>{nft.name}</StyledName>

      <Button
        variant="primary"
        scale="sm"
        mt="20px"
        width="100%"
        style={{ backgroundColor: 'green' }}
        onClick={withdraw}
      >
        Withdraw
      </Button>
    </StyledHealthBar>
  )
}

export default HealthBar
