import { ethers } from 'ethers'
import { getMulticallContract } from 'utils/contractHelpers'
import { Interface } from '@ethersproject/abi'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}

const multicall = async <T = any>(abi: any[], calls: Call[]): Promise<T> => {
  const multi = getMulticallContract()
  const itf = new ethers.utils.Interface(abi)

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))
  // console.log("calldatacalldata", calldata)
  const { returnData } = await multi.aggregate(calldata)

  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))

  return res as any
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
): Promise<T> => {
  // console.log("callscallscallscalls   callscallscallscalls", calls)
  const { requireSuccess } = options
  const multi = getMulticallContract()
  const itf = new Interface(abi)

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }))
  // console.log("calldatacalldatacalldatacalldata", calldata)
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  // console.log("returnDatareturnDatareturnData", returnData)

  const res = returnData.map((call, i) => {
    const [result, data] = call
    // console.log("result, dataresult, dataresult, data", result, data)

    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })
  // console.log("resres  resres  resresres", res)

  return res as any
}

export default multicall
