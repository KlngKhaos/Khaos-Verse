import React, { useState, useEffect } from 'react'
import { formatUnits } from '@ethersproject/units'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useNrt, useGladiatorCollectibleFactory } from 'hooks/useContract'
import { useGetNrtBalance } from 'hooks/useTokenBalance'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import ApproveConfirmButtons from 'components/ApproveConfirmButtons'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'
import { fetchUserNfts } from 'state/nftMarket/reducer'
import { useGetCollections } from 'state/nftMarket/hooks'
import { getNftsFromCollectionApi } from 'state/nftMarket/helpers'
import { ApiSingleTokenData } from 'state/nftMarket/types'
import { gladiatorCollectiblesAddress } from 'views/Nft/market/constants'
import { FetchStatus } from 'config/constants/types'
import SelectionCard from './SelectionCard'
import NextStepButton from './NextStepButton'
import useProfileCreation from './contexts/hook'
import { MINT_COST, STARTER_NFT_GLADIATOR_COLLECTIBLE_IDS } from './config'

interface MintNftData extends ApiSingleTokenData {
  gladiatorCollectibleId?: string
}

const Mint: React.FC = () => {
  const [selectedBunnyId, setSelectedBunnyId] = useState<string>('')
  const [starterNfts, setStarterNfts] = useState<MintNftData[]>([])
  const { actions, minimumNrtRequired, allowance } = useProfileCreation()
  const collections = useGetCollections()
  const { toastSuccess } = useToast()
  const dispatch = useAppDispatch()

  const { account } = useWeb3React()
  const nrtContract = useNrt()
  const gladiatorCollectibleFactoryContract = useGladiatorCollectibleFactory()
  const { t } = useTranslation()
  const { balance: nrtBalance, fetchStatus } = useGetNrtBalance()
  const hasMinimumNrtRequired = fetchStatus === FetchStatus.Fetched && nrtBalance.gte(MINT_COST)
  const { callWithGasPrice } = useCallWithGasPrice()

  useEffect(() => {
    const getStarterNfts = async () => {
      const { data: allPbTokens } = await getNftsFromCollectionApi(gladiatorCollectiblesAddress)
      const nfts = STARTER_NFT_GLADIATOR_COLLECTIBLE_IDS.map((gladiatorCollectibleId) => {
        if (allPbTokens && allPbTokens[gladiatorCollectibleId]) {
          return { ...allPbTokens[gladiatorCollectibleId], gladiatorCollectibleId }
        }
        return undefined
      })
      setStarterNfts(nfts)
    }
    if (starterNfts.length === 0) {
      getStarterNfts()
    }
  }, [starterNfts])

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        // TODO: Move this to a helper, this check will be probably be used many times
        try {
          const response = await nrtContract.allowance(account, gladiatorCollectibleFactoryContract.address)
          return response.gte(minimumNrtRequired)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice(nrtContract, 'approve', [gladiatorCollectibleFactoryContract.address, allowance.toString()])
      },
      onConfirm: () => {
        return callWithGasPrice(gladiatorCollectibleFactoryContract, 'mintNFT', [selectedBunnyId])
      },
      onApproveSuccess: () => {
        toastSuccess(t('Enabled'), t("Press 'confirm' to mint this NFT"))
      },
      onSuccess: () => {
        toastSuccess(t('Success'), t('You have minted your starter NFT'))
        dispatch(fetchUserNfts({ account, collections }))
        actions.nextStep()
      },
    })

  return (
    <>
      <Text fontSize="20px" color="textSubtle" bold>
        {t('Step %num%', { num: 1 })}
      </Text>
      <Heading as="h3" scale="xl" mb="24px">
        {t('Get Starter Collectible')}
      </Heading>
      <Text as="p">{t('Every profile starts by making a “starter” collectible (NFT).')}</Text>
      <Text as="p">{t('This starter will also become your first profile picture.')}</Text>
      <Text as="p" mb="24px">
        {t('You can change your profile pic later if you get another approved Gladiators Collectible.')}
      </Text>
      <Card mb="24px">
        <CardBody>
          <Heading as="h4" scale="lg" mb="8px">
            {t('Choose your Starter!')}
          </Heading>
          <Text as="p" color="textSubtle">
            {t('Choose wisely: you can only ever make one starter collectible!')}
          </Text>
          <Text as="p" mb="24px" color="textSubtle">
            {t('Cost: %num% NRT', { num: formatUnits(MINT_COST) })}
          </Text>
          {starterNfts.map((nft) => {
            const handleChange = (value: string) => setSelectedBunnyId(value)

            return (
              <SelectionCard
                key={nft?.name}
                name="mintStarter"
                value={nft?.gladiatorCollectibleId}
                image={nft?.image.thumbnail}
                isChecked={selectedBunnyId === nft?.gladiatorCollectibleId}
                onChange={handleChange}
                disabled={isApproving || isConfirming || isConfirmed || !hasMinimumNrtRequired}
              >
                <Text bold>{nft?.name}</Text>
              </SelectionCard>
            )
          })}
          {!hasMinimumNrtRequired && (
            <Text color="failure" mb="16px">
              {t('A minimum of %num% NRT is required', { num: formatUnits(MINT_COST) })}
            </Text>
          )}
          <ApproveConfirmButtons
            isApproveDisabled={selectedBunnyId === null || isConfirmed || isConfirming || isApproved}
            isApproving={isApproving}
            isConfirmDisabled={!isApproved || isConfirmed || !hasMinimumNrtRequired}
            isConfirming={isConfirming}
            onApprove={handleApprove}
            onConfirm={handleConfirm}
          />
        </CardBody>
      </Card>
      <NextStepButton onClick={actions.nextStep} disabled={!isConfirmed}>
        {t('Next Step')}
      </NextStepButton>
    </>
  )
}

export default Mint
