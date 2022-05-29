import {  Token } from '@pancakeswap/sdk'
import { Tags, TokenInfo, TokenList } from '@uniswap/token-lists'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_LIST_OF_LISTS } from 'config/constants/lists'
import { AppState } from '../index'
import DEFAULT_TOKEN_LIST from '../../config/constants/tokenLists/pancake-default.tokenlist.json'
import { UNSUPPORTED_LIST_URLS } from '../../config/constants/lists'
import UNSUPPORTED_TOKEN_LIST from '../../config/constants/tokenLists/pancake-unsupported.tokenlist.json'

type TagDetails = Tags[keyof Tags]
export interface TagInfo extends TagDetails {
  id: string
}
const ChainId  = {
  MAINNET: 56,
  TESTNET: 941
}
// use ordering of default list of lists to assign priority
function sortByListPriority(urlA: string, urlB: string) {
  const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER
  const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER

  // need reverse order to make sure mapping includes top priority last
  if (first < second) return 1
  if (first > second) return -1
  return 0
}

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: any

  public readonly tags: any[]

  constructor(tokenInfo: any, tags: any[]) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
    this.tokenInfo = tokenInfo
    this.tags = tags
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI
  }
}

// export type TokenAddressMap = Readonly<
//   { [chainId in ChainId]: Readonly<{ [tokenAddress: string]: { token: WrappedTokenInfo; list: TokenList } }> }
// >

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: any = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {},
}

const listCache: WeakMap<TokenList, any> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<TokenList, any>() : null

export function listToTokenMap(list: TokenList): any {
  const result = listCache?.get(list)
  if (result) return result
console.log("listlistlist", list)
  const map = list.tokens.reduce<any>(
    (tokenMap, tokenInfo) => {
      console.log("tokenInfotokenInfo", tokenInfo)
      console.log("tokenMaptokenMap", tokenMap)
      const tags: TagInfo[] =
        tokenInfo.tags
          ?.map((tagId) => {
            if (!list.tags?.[tagId]) return undefined
            return { ...list.tags[tagId], id: tagId }
          })
          ?.filter((x): x is TagInfo => Boolean(x)) ?? []
          console.log("tagstags", tags)
      const token = new WrappedTokenInfo(tokenInfo, tags)
      console.log("tokentokentoken", token)
      if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.')
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: {
            token,
            list,
          },
        },
      }
    },
    { ...EMPTY_LIST },
  )
  listCache?.set(list, map)
  return map
}

export function useAllLists(): {
  readonly [url: string]: {
    readonly current: TokenList | null
    readonly pendingUpdate: TokenList | null
    readonly loadingRequestId: string | null
    readonly error: string | null
  }
} {
  return useSelector<AppState, AppState['lists']['byUrl']>((state) => state.lists.byUrl)
}

function combineMaps(map1: any, map2: any): any {
  return {
    [ChainId.MAINNET]: { ...map1[ChainId.MAINNET], ...map2[ChainId.MAINNET] },
    [ChainId.TESTNET]: { ...map1[ChainId.TESTNET], ...map2[ChainId.TESTNET] },
  }
}

// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls: string[] | undefined): any {
  const lists = useAllLists()
console.log("lists", lists)
  return useMemo(() => {
    if (!urls) return EMPTY_LIST
console.log("urls", urls.slice())
console.log("EMPTY_LIST", EMPTY_LIST)
    return (
      urls
        .slice()
        // sort by priority so top priority goes last
        .sort(sortByListPriority)
        .reduce((allTokens, currentUrl) => {
          console.log("allTokens", allTokens)
          const current = lists[currentUrl]?.current
          if (!current) return allTokens
          try {
            const newTokens = Object.assign(listToTokenMap(current))
            return combineMaps(allTokens, newTokens)
          } catch (error) {
            console.error('Could not show token list due to error', error)
            return allTokens
          }
        }, EMPTY_LIST)
    )
  }, [lists, urls])
}

// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
  return useSelector<AppState, AppState['lists']['activeListUrls']>((state) => state.lists.activeListUrls)?.filter(
    (url) => !UNSUPPORTED_LIST_URLS.includes(url),
  )
}

export function useInactiveListUrls(): string[] {
  const lists = useAllLists()
  const allActiveListUrls = useActiveListUrls()
  return Object.keys(lists).filter((url) => !allActiveListUrls?.includes(url) && !UNSUPPORTED_LIST_URLS.includes(url))
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): any {
  const activeListUrls = useActiveListUrls()
  const activeTokens = useCombinedTokenMapFromUrls(activeListUrls)
  const defaultTokenMap = listToTokenMap(DEFAULT_TOKEN_LIST)
  return combineMaps(activeTokens, defaultTokenMap)
}

// all tokens from inactive lists
export function useCombinedInactiveList(): any {
  const allInactiveListUrls: string[] = useInactiveListUrls()
  console.log("allInactiveListUrls", allInactiveListUrls)
  return useCombinedTokenMapFromUrls(allInactiveListUrls)
}

// used to hide warnings on import for default tokens
export function useDefaultTokenList(): any {
  return listToTokenMap(DEFAULT_TOKEN_LIST)
}

// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList(): any {
  // get hard coded unsupported tokens
  const localUnsupportedListMap = listToTokenMap(UNSUPPORTED_TOKEN_LIST)

  // get any loaded unsupported tokens
  const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS)

  // format into one token address map
  return combineMaps(localUnsupportedListMap, loadedUnsupportedListMap)
}

export function useIsListActive(url: string): boolean {
  const activeListUrls = useActiveListUrls()
  return Boolean(activeListUrls?.includes(url))
}
