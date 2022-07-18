import { ChainId } from '@pancakeswap/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getMasterChefAddress = () => {
  console.log("fetch chain id from node_modules", ChainId)
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getGladiatorProfileAddress = () => {
  return getAddress(addresses.gladiatorProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits)
}
export const getGladiatorCollectibleFactoryAddress = () => {
  return getAddress(addresses.gladiatorCollectibleFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}
export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
export const getBunnySpecialCakeVaultAddress = () => {
  return getAddress(addresses.bunnySpecialCakeVault)
}
export const getBunnySpecialPredictionAddress = () => {
  return getAddress(addresses.bunnySpecialPrediction)
}
export const getBunnySpecialLotteryAddress = () => {
  return getAddress(addresses.bunnySpecialLottery)
}
export const getFarmAuctionAddress = () => {
  return getAddress(addresses.farmAuction)
}
export const getAnniversaryAchievement = () => {
  return getAddress(addresses.AnniversaryAchievement)
}

export const getNftMarketAddress = () => {
  return getAddress(addresses.nftMarket)
}
export const getNftSaleAddress = () => {
  return getAddress(addresses.nftSale)
}
export const getPancakeSquadAddress = () => {
  return getAddress(addresses.pancakeSquad)
}
export const getGlaidatorNftAddress = () => {
  return getAddress(addresses.gladiatorNft)
}
export const getGlaidatorAchievementsAddress = () => {
  return getAddress(addresses.gladiatorAchievements)
}
export const getBattleNftAddress = () => {
  return getAddress(addresses.battleNft)
}
export const getAchievementNftAddress = () => {
  return getAddress(addresses.achievementsNft)
}
export const getReferralsNftAddress = () => {
  return getAddress(addresses.referralsNft)
}
export const getPredictionNftAddress = () => {
  return getAddress(addresses.predictions)
}
export const getGlaidatorEquipmentAddress = () => {
  return getAddress(addresses.gladiatorEquipments)
}