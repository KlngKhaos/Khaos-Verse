import React, { useEffect, useState, useReducer } from 'react'
import styled from 'styled-components'
import SwiperCore, { Keyboard, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Flex } from '@pancakeswap/uikit'
import { useGetCurrentEpoch, useGetSortedRounds } from 'state/predictions/hooks'
import 'swiper/swiper.min.css'
import RoundCard from './components/RoundCard'
import Menu from './components/Menu'
import useSwiper from './hooks/useSwiper'
import useOnNextRound from './hooks/useOnNextRound'
import useOnViewChange from './hooks/useOnViewChange'
import { PageView } from './types'
import { useBattleNft } from 'hooks/useContract'
import { useHistory } from "react-router-dom"
import { useWeb3React } from '@web3-react/core'
import PageLoader from 'components/Loader/PageLoader'
import useStore from "./store"

SwiperCore.use([Keyboard, Mousewheel])

const StyledSwiper = styled.div`
  .swiper-wrapper {
    align-items: center;
    display: flex;
  }

  .swiper-slide {
    width: auto;
    margin-top: 20px;
  }
`
const BattleHeading = styled.div`
  background-image: url(/images/battles/heading2-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 400px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #7d91ad;
`

const Positions: React.FC<{ view?: PageView }> = ({ view }) => {
  const { setSwiper } = useSwiper()
  const { setImage } = useStore(state => state)
  const rounds = useGetSortedRounds()
  const currentEpoch = useGetCurrentEpoch()
  const previousEpoch = currentEpoch > 0 ? currentEpoch - 1 : currentEpoch
  const previousRound = rounds.find((round) => round.epoch === previousEpoch)
  const swiperIndex = rounds.indexOf(previousRound)

  useOnNextRound()
  useOnViewChange(7, view)
  const history = useHistory()
  const battlaContract = useBattleNft()
  const { account } = useWeb3React()

  const initialState = {
    currentBattle: null,
    upcomingBattlee: null,
    previousBattles: [],
  }
  function reducer(state, action) {
    switch (action.type) {
      case 'current':
        return {
          ...state,
          currentBattle: action.payload,
        }
      case 'upcoming':
        return {
          ...state,
          upcomingBattlee: action.payload,
        }
      case 'previous':
        return {
          ...state,
          previousBattles: action.payload,
        }
      default:
        return
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const timerState = {
    remainingTime: 0
  }
  function timerReducer(state, action) {
    switch (action.type) {
      case 'change':
        return {
          ...state,
          remainingTime: action.payload,
        }
      default:
        return
    }
  }
  const [state2, dispatch1] = useReducer(timerReducer, timerState)
  const [bgImage, setBgImage] = useState("")
  const [preBattlesCount, setPreBattleCount] = useState<number>(0)
  // console.log("state<><><><><><>", state)
  const getCurrentBattleCount = async () => {
    try {
      // console.log("battlaContract.currentBattleCount()", battlaContract);
      const data = await battlaContract.currentBattleCount()
      // console.log('dataaaaaaaa', parseInt(data._hex, 16))
      
      if (parseInt(data._hex, 16) - 1 > 1) {

        const currentBattle = await battlaContract.battles((parseInt(data._hex, 16) - 1).toString())
        // console.log("currentBattlecurrentBattlecurrentBattle", currentBattle)
        if(currentBattle.arena === "Arles Arena"){
          setBgImage("arles_arena")
        } else if(currentBattle.arena === "Ateia Trebellia"){
          setBgImage("ateia_trebellia")
        } else if(currentBattle.arena === "Gladiator Arena"){
          setBgImage("gladiator_arena")
        } else if(currentBattle.arena === "Matia Piso"){
          setBgImage("matia_piso")
        } else if(currentBattle.arena === "Nimes Amphitheatre"){
          setBgImage("nimes_amphitheatre")
        } else if(currentBattle.arena === "Nimes Amphitheatre"){
          setBgImage("nimes_amphitheatre")
        }
        else {
          setBgImage(currentBattle.arena.toLowerCase())
        }

        // setBgImage(currentBattle.arena.toLowerCase())
        dispatch1({ type: "change", payload: parseInt(currentBattle.closeTimestamp._hex, 16) + 300 + 12 })
        dispatch({ type: 'current', payload: { ...currentBattle, round: parseInt(data._hex, 16) - 1 } })
      }
      // console.log("currentBattlecurrentBattle", currentBattle)

      const upcomingBattle = await battlaContract.battles(parseInt(data._hex, 16).toString())
      // console.log("upcomingBattleupcomingBattle", parseInt(upcomingBattle.startTimestamp._hex, 16)+300)
      dispatch({ type: 'upcoming', payload: { ...upcomingBattle, round: parseInt(data._hex, 16) } })

      let previousBattle1, previousBattle2, previousBattle3, previousBattle4, previousBattle5;
      if (parseInt(data._hex, 16) - 1 >= 3) {
        // console.log("33333333333333333333")
        previousBattle1 = await battlaContract.battles((parseInt(data._hex, 16) - 2).toString())

      }
      if (parseInt(data._hex, 16) - 1 >= 4) {
        // console.log("4444444444444444444")
        previousBattle2 = await battlaContract.battles((parseInt(data._hex, 16) - 3).toString())
      }
      if (parseInt(data._hex, 16) - 1 >= 5) {
        // console.log("555555555555555555555555")
        previousBattle3 = await battlaContract.battles((parseInt(data._hex, 16) - 4).toString())
      }
      if (parseInt(data._hex, 16) - 1 >= 6) {
        // console.log("6666666666666666666666666")
        previousBattle4 = await battlaContract.battles((parseInt(data._hex, 16) - 5).toString())
      }
      if (parseInt(data._hex, 16) - 1 >= 7) {
        // console.log("77777777777777777777777777")
        previousBattle5 = await battlaContract.battles((parseInt(data._hex, 16) - 6).toString())
      }
      // console.log("previousBattle1, previousBattle2, previousBattle3, previousBattle4, previousBattle5;", previousBattle1, previousBattle2, previousBattle3, previousBattle4, previousBattle5);
      dispatch({
        type: 'previous',
        payload: [
          { ...previousBattle5, round: parseInt(data._hex, 16) - 6 },
          { ...previousBattle4, round: parseInt(data._hex, 16) - 5 },
          { ...previousBattle3, round: parseInt(data._hex, 16) - 4 },
          { ...previousBattle2, round: parseInt(data._hex, 16) - 3 },
          { ...previousBattle1, round: parseInt(data._hex, 16) - 2 },

        ],
      })

    } catch (error) {
      history.push('/')
      // getCurrentBattleCount()
      // console.log("data._hexdata._hex error");
    }
  }
  // console.log("stateeeeeeeee", state)
  useEffect(() => {
    if (account) {
      getCurrentBattleCount()
      // console.log("accountaccountaccount", account);
    }
  }, [account])
  useEffect(() => {
    const stateCopy = { ...state }
    const count = stateCopy.previousBattles.filter(battle => battle.round >= 0)
    if (count.length) {
      setPreBattleCount(count.length)
    }
  }, [state])
  useEffect(() => {
    const interval = setInterval(() => {

      getCurrentBattleCount()
    }, 10000)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    setImage(bgImage)
  }, [bgImage])
  // console.log("stateeeeeeeee", state)
  if (!state.currentBattle &&
    !state.upcomingBattlee &&
    !state.previousBattles.length) {
    return <PageLoader />
  }

  // console.log("state3state3state3state3state3", state3);
  return (
    <Box overflow="hidden">
      <Menu
        // liveCard={state?.previousBattles?.length} 
        liveCard={preBattlesCount}
        remainingTime={Number(state2.remainingTime)}
      />
      <StyledSwiper>
        <Flex justifyContent="center" pt="15px" pb="15px">
          {/* <BattleHeading>
            Battle
          </BattleHeading> */}
        </Flex>
        {/* <Swiper initialSlide={0}
          onSwiper={setSwiper}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode
          freeModeSticky
          centeredSlides
          freeModeMomentumRatio={0.25}
          freeModeMomentumVelocityRatio={0.5}
          mousewheel
          keyboard
          resizeObserver
        >
          <SwiperSlide>
            <RoundCard />
          </SwiperSlide>
        </Swiper> */}
        <Swiper
          initialSlide={swiperIndex}
          onSwiper={setSwiper}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode
          freeModeSticky
          centeredSlides
          freeModeMomentumRatio={0.25}
          freeModeMomentumVelocityRatio={0.5}
          mousewheel
          keyboard
          resizeObserver
        >
          {/* {rounds.map((round) => (
            <SwiperSlide key={round.epoch}>
              <RoundCard round={round} />
            </SwiperSlide>
          ))} */}
          {state?.previousBattles.length > 0 &&
            state?.previousBattles.map((battle, index) => {
              if (battle?.round >= 0) {
                return (
                  <SwiperSlide key={index}>
                    <RoundCard
                      type="expired"
                      battles={battle}
                      remainingTime={state2.remainingTime}
                    />
                  </SwiperSlide>
                )
              }
            })}
          {state?.currentBattle && (
            <SwiperSlide>
              <RoundCard
                type="live"
                battles={state?.currentBattle}
                remainingTime={state2.remainingTime}
              // index={state?.previousBattles.length+1}
              />
            </SwiperSlide>
          )}
          {state?.upcomingBattlee && (
            <SwiperSlide>
              <RoundCard
                type="soon"
                battles={state?.upcomingBattlee}
                remainingTime={state2.remainingTime}
              />
            </SwiperSlide>
          )}
          <SwiperSlide>
            <RoundCard
              type="later"
              battles={state?.currentBattle?.round + 2}
              remainingTime={state2.remainingTime + 320}
              // index={preBattlesCount + 2}
            />
          </SwiperSlide>
          <SwiperSlide>
            <RoundCard
              type="later"
              battles={state?.currentBattle?.round + 3}
              remainingTime={state2.remainingTime + 620}
              // index={preBattlesCount + 2}
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <RoundCard />
          </SwiperSlide>
          <SwiperSlide>
            <RoundCard />
          </SwiperSlide> */}
        </Swiper>
        {/* <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper> */}
      </StyledSwiper>
    </Box>
  )
}

export default Positions
