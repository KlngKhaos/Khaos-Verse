import React, {useEffect} from 'react'
import { Progress, ProgressProps } from '@pancakeswap/uikit'
import useCountdown from 'views/Predictions/hooks/useCountdown'
import { formatRoundTime } from 'views/Predictions/helpers'

interface RoundProgressProps extends ProgressProps {
  lockTimestamp: number
  closeTimestamp: number
  remainingTime?: number
  openCalculatingModal?: any
}

const RoundProgress: React.FC<RoundProgressProps> = ({ lockTimestamp, closeTimestamp,remainingTime, openCalculatingModal, ...props }) => {
  // const startMs = lockTimestamp * 1000
  // const endMs = closeTimestamp * 1000
  // const now = Date.now()
  // const rawProgress = ((now - startMs) / (endMs - startMs)) * 100
  // const progress = rawProgress <= 100 ? rawProgress : 100
  const { secondsRemaining } = useCountdown(remainingTime)
// console.log("remainingTime", secondsRemaining)
useEffect(() => {
  if(secondsRemaining<12){
    openCalculatingModal(true)
  }else {
    openCalculatingModal(false)
  }
},[secondsRemaining])
  return <Progress primaryStep={100 - secondsRemaining/3} {...props} />
}

export default RoundProgress
