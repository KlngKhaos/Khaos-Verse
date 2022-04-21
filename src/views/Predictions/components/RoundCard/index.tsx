import React, { useEffect, useState, useReducer } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useGetBetByEpoch, useGetCurrentEpoch } from 'state/predictions/hooks'
import { BetPosition, NodeRound } from 'state/types'
import { getMultiplierV2 } from '../../helpers'
import ExpiredRoundCard from './ExpiredRoundCard'
import LiveRoundCard from './LiveRoundCard'
import OpenRoundCard from './OpenRoundCard'
import SoonRoundCard from './SoonRoundCard'
import LiveBattle from './LiveBattle'
import ExpiredBattle from './ExpiredBattle'
import SoonBattle from './SoonBattle'
import LaterBattle from './LaterBattle'
import { useBattleNft } from 'hooks/useContract'
import { useHistory } from 'react-router-dom'
interface RoundCardProps {
  // round?: NodeRound
  type?: any
  battles?: any
  remainingTime: any
  index?: number | string
}

const RoundCard: React.FC<RoundCardProps> = ({ type, battles, remainingTime, index }) => {
  // const history= useHistory()
  // const battlaContract = useBattleNft()

  // const initialState = {
  //   currentBattle: null,
  //   upcomingBattlee: null,
  //   previousBattles: [],
  // }
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case 'current':
  //       return {
  //         ...state,
  //         currentBattle: action.payload,
  //       }
  //     case 'upcoming':
  //       return {
  //         ...state,
  //         upcomingBattlee: action.payload,
  //       }
  //     case 'previous':
  //       return {
  //         ...state,
  //         previousBattles: action.payload,
  //       }
  //     default:
  //       return
  //   }
  // }
  // const [state, dispatch] = useReducer(reducer, initialState)
  // const { epoch, lockPrice, closePrice, totalAmount, bullAmount, bearAmount } = round
  // const currentEpoch = useGetCurrentEpoch()
  // const { account } = useWeb3React()
  // const ledger = useGetBetByEpoch(account, epoch)
  // const hasEntered = ledger ? ledger.amount.gt(0) : false
  // const hasEnteredUp = hasEntered && ledger.position === BetPosition.BULL
  // const hasEnteredDown = hasEntered && ledger.position === BetPosition.BEAR
  // const hasClaimedUp = hasEntered && ledger.claimed && ledger.position === BetPosition.BULL
  // const hasClaimedDown = hasEntered && ledger.claimed && ledger.position === BetPosition.BEAR

  // const bullMultiplier = getMultiplierV2(totalAmount, bullAmount)
  // const bearMultiplier = getMultiplierV2(totalAmount, bearAmount)

  // const formattedBullMultiplier = bullMultiplier.toUnsafeFloat().toFixed(bullMultiplier.isZero() ? 0 : 2)
  // const formattedBearMultiplier = bearMultiplier.toUnsafeFloat().toFixed(bearMultiplier.isZero() ? 0 : 2)

  // Fake future rounds
  // if (epoch > currentEpoch) {
  //   return <SoonRoundCard round={round} />
  // }

  // Past rounds
  // const getCurrentBattleCount = async () => {
  //   try {
  //     // console.log("battlaContract.currentBattleCount()", battlaContract);
  //     const data = await battlaContract.currentBattleCount()
  //     const currentBattle = await battlaContract.battles((parseInt(data._hex, 16) - 1).toString())
  //     const upcomingBattle = await battlaContract.battles(parseInt(data._hex, 16).toString())
  //     const previousBattle1 = await battlaContract.battles((parseInt(data._hex, 16) - 2).toString())
  //     const previousBattle2 = await battlaContract.battles((parseInt(data._hex, 16) - 3).toString())
  //     dispatch({type: "current", payload: { ...currentBattle, round: parseInt(data._hex, 16) - 1 }})
  //     dispatch({type: "upcoming", payload: { ...upcomingBattle, round: parseInt(data._hex, 16) }})
  //     dispatch({type: "previous", payload: [
  //       { ...previousBattle1, round: parseInt(data._hex, 16) - 2 },
  //       { ...previousBattle2, round: parseInt(data._hex, 16) - 3 },
  //     ]})
  //   } catch (error) {
  //     history.push("/")
  //     // console.log("data._hexdata._hex error");
  //   }
  // }
  // useEffect(() => {
  //   if(account){
  //     getCurrentBattleCount()
  //     // console.log("accountaccountaccount", account);
  //   }

  // }, [account])
  // const myInterval = setInterval(() => {
  //   getCurrentBattleCount()
  // }, 5000)
  // useEffect(() => {
  //   return () => {
  //     clearInterval(myInterval)
  //   }
  // }, [])
  // Next (open) round
  if (type === 'expired') {
    return (
      <>
          <ExpiredBattle 
          currentBattle={battles} 
          remainingTime={remainingTime} 
          />
      </>
    )
  }

  // Live round
  if (type === 'live') {
    return <LiveBattle  
    currentBattle={battles} 
    remainingTime={remainingTime}
    />
  }
  // Live round
  if (type === 'soon') {
    return (
      <SoonBattle 
      currentBattle={battles} 
      remainingTime={remainingTime} 
      />
    )
  }

    // Later round
    if (type === 'later') {
      return (
        <LaterBattle 
        index={5}
        laterBattle={battles}
        remainingTime={remainingTime} 
        />
      )
    }
  

  // return (
  //   // <ExpiredRoundCard
  //   //   round={round}
  //   //   hasEnteredDown={hasEnteredDown}
  //   //   hasEnteredUp={hasEnteredUp}
  //   //   hasClaimedDown={hasClaimedDown}
  //   //   hasClaimedUp={hasClaimedUp}
  //   //   betAmount={ledger?.amount}
  //   //   bullMultiplier={formattedBullMultiplier}
  //   //   bearMultiplier={formattedBearMultiplier}
  //   // />
  //   <div style={{ display: 'flex', alignItems: 'center' }}>
  //     {/* <ExpiredBattle /> */}
  //     {/* <SoonBattle /> */}
  //   </div>
  // )
}

export default RoundCard
