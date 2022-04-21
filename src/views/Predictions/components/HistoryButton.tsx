import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { AutoRenewIcon, HistoryIcon, IconButton } from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import { setHistoryPaneState } from 'state/predictions'
import { useGetIsFetchingHistory } from 'state/predictions/hooks'
import styled from 'styled-components'

const NewIconButton = styled(IconButton)`
background-color: #007587;
`

const HistoryButton = () => {
  const isFetchingHistory = useGetIsFetchingHistory()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleClick = () => {
    dispatch(setHistoryPaneState(true))
  }

  return (
    <NewIconButton
      id="prediction-history-button"
      // variant="light"
      onClick={handleClick}
      isLoading={isFetchingHistory}
      disabled={!account}
    >
      {isFetchingHistory ? <AutoRenewIcon spin color="white" /> : <HistoryIcon width="24px" color="white" />}
    </NewIconButton>
  )
}

export default HistoryButton
