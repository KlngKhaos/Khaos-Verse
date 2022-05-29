import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@pancakeswap/sdk'

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export const addTransaction = createAction<{
  chainId: any
  hash: string
  from: string
  approval?: { tokenAddress: string; spender: string }
  claim?: { recipient: string }
  summary?: string
}>('transactions/addTransaction')
export const clearAllTransactions = createAction<{ chainId: any }>('transactions/clearAllTransactions')
export const finalizeTransaction = createAction<{
  chainId: any
  hash: string
  receipt: SerializableTransactionReceipt
}>('transactions/finalizeTransaction')
export const checkedTransaction = createAction<{
  chainId: any
  hash: string
  blockNumber: number
}>('transactions/checkedTransaction')
