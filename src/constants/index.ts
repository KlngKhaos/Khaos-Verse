import { ChainId, JSBI, Percent, Token, WETH } from '@pancakeswap-libs/sdk'

export const ROUTER_ADDRESS = '0x77195D81261690c9e4e3B1bCF0cf819680be7615'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const CAKE = new Token(ChainId.TESTNET, '0xb1d05c39B1bC7184537283c58813C3c29Ad39De2', 18, 'CAKE', 'PancakeSwap Token')
export const WBNB = new Token(ChainId.TESTNET, '0xa405edD998eac068F51269D06615c38FEfFDcaCf', 18, 'WBNB', 'Wrapped BNB')
export const DAI = new Token(ChainId.TESTNET, '0x4D67200261cDD46834e2cA44B6eE38A9Eb330272', 18, 'DAI', 'Dai Stablecoin')
export const BUSD = new Token(ChainId.TESTNET, '0xc8cbF2af4BC6DEafb998b2f6CFb4e97439a68E28', 18, 'BUSD', 'Binance USD')
export const BTCB = new Token(ChainId.TESTNET, '0x61872FbC9f7e58095F65e23339a0027F4b51a3D0', 18, 'BTCB', 'Binance BTC')
export const USDT = new Token(ChainId.TESTNET, '0xf598765Af61E513F985e871f1778F9ef18247c58', 18, 'USDT', 'Tether USD')
export const UST = new Token(
  ChainId.TESTNET,
  '0x2B57AbA057CA170c4451C6FdF8Df71033209d7C7',
  18,
  'UST',
  'Wrapped UST Token'
)
export const ETH = new Token(
  ChainId.TESTNET,
  '0x40CD9Bd0F1162074DC78211C02eEf4998c6D9C17',
  18,
  'ETH',
  'Binance-Peg Ethereum Token'
)

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.TESTNET]: [...WETH_ONLY[ChainId.TESTNET], DAI, BUSD, BTCB, USDT, UST, ETH],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.TESTNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.TESTNET]: [...WETH_ONLY[ChainId.TESTNET], DAI, BUSD, USDT],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.TESTNET]: [...WETH_ONLY[ChainId.TESTNET], DAI, BUSD, BTCB, USDT],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.TESTNET]: [
    [CAKE, WBNB],
    [BUSD, USDT],
    [DAI, USDT],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH