import { ChainId, Currency, currencyEquals, JSBI, Price } from '@pancakeswap/sdk'
import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import tokens, { mainnetTokens, testnetTokens} from 'config/constants/tokens'
import { PairState, usePairs } from './usePairs'
import { wrappedCurrency } from '../utils/wrappedCurrency'

const BUSD_MAINNET = {
  56: mainnetTokens.busd,
  941: testnetTokens.busd
}

const { wbnb: WBNB } = tokens

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
 export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  console.log("chainId", chainId);
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && currencyEquals(WBNB, wrapped) ? undefined : currency, chainId ? WBNB : undefined],
      [wrapped?.equals(BUSD_MAINNET[chainId]) ? undefined : wrapped, chainId === ChainId.MAINNET ? BUSD_MAINNET[chainId] : undefined],
      [chainId ? WBNB : undefined, chainId === ChainId.MAINNET ? BUSD_MAINNET[chainId] : undefined],
    ],
    [chainId, currency, wrapped],
  )
  const [[ethPairState, ethPair], [busdPairState, busdPair], [busdEthPairState, busdEthPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WBNB)) {
      if (busdPair) {
        const price = busdPair.priceOf(WBNB)
        return new Price(currency, BUSD_MAINNET[chainId], price.denominator, price.numerator)
      }
      return undefined
    }
    // handle busd
    if (wrapped.equals(BUSD_MAINNET[chainId])) {
      return new Price(BUSD_MAINNET[chainId], BUSD_MAINNET[chainId], '1', '1')
    }

    const ethPairETHAmount = ethPair?.reserveOf(WBNB)
    const ethPairETHBUSDValue: JSBI =
      ethPairETHAmount && busdEthPair ? busdEthPair.priceOf(WBNB).quote(ethPairETHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the busd pair
    if (
      busdPairState === PairState.EXISTS &&
      busdPair &&
      busdPair.reserveOf(BUSD_MAINNET[chainId]).greaterThan(ethPairETHBUSDValue)
    ) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, BUSD_MAINNET[chainId], price.denominator, price.numerator)
    }
    if (ethPairState === PairState.EXISTS && ethPair && busdEthPairState === PairState.EXISTS && busdEthPair) {
      if (busdEthPair.reserveOf(BUSD_MAINNET[chainId]).greaterThan('0') && ethPair.reserveOf(WBNB).greaterThan('0')) {
        const ethBusdPrice = busdEthPair.priceOf(BUSD_MAINNET[chainId])
        const currencyEthPrice = ethPair.priceOf(WBNB)
        const busdPrice = ethBusdPrice.multiply(currencyEthPrice).invert()
        return new Price(currency, BUSD_MAINNET[chainId], busdPrice.denominator, busdPrice.numerator)
      }
    }

    return undefined
  }, [chainId, currency, ethPair, ethPairState, busdEthPair, busdEthPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): Price | undefined => {
  const cakeBusdPrice = useBUSDPrice(tokens.cake)

  return cakeBusdPrice
}

export const useNrtBusdPrice = (): Price | undefined => {
  const nrtBusdPrice = useBUSDPrice(tokens.nrt)

  return nrtBusdPrice
}
export const useDenaPrice = (): Price | undefined => {
  const denaPrice = useBUSDPrice(tokens.dena)
  return denaPrice
}
export const useBNBBusdPrice = (): Price | undefined => {
  const bnbBusdPrice = useBUSDPrice(tokens.wbnb)
  return bnbBusdPrice
}
