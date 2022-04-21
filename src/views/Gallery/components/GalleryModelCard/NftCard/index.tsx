import React, { Suspense, useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { ethers } from 'ethers'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  VerifiedIcon,
  CommunityIcon,
  RefreshIcon,
  AutoRenewIcon,
  TagProps,
  TimerIcon,
  BlockIcon,
  Skeleton,
  Text,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  useTooltip,
  CardFooter,
  useModal,
  Box,
  Flex,
  ArrowForwardIcon,
} from '@pancakeswap/uikit'
import { CommunityTag, CoreTag, PartnerTag } from 'components/Tags'
import { useProfile } from 'state/profile/hooks'
import { useTranslation } from 'contexts/Localization'
import { GalleryNft, ListingType } from 'config/constants/gallery/types'
import Loader from 'views/Configurator/components/UI/Loader'
import { useGladiatorNft } from 'hooks/useContract'
import { parseUnits } from '@ethersproject/units'

// import InfoRow from '../InfoRow'
// import TransferNftModal from '../TransferNftModal'
// import ClaimNftModal from '../ClaimNftModal'
// import View3DNftModal from '../../View3DNftModal'
import Configurator3DNftModal from '../../Configurator3DNftModal'
// import LifeCycleModal from './LifeCycleModal'

import DetailsSection from './DetailsSection'
import Preview from './Preview'
import Attributes from './Attributes'
import Weapons from './Weapons'
import Abilities from './Abilities'
import { useHistory } from 'react-router-dom'

export interface NftCardProps {
  nft: GalleryNft
  canClaim?: boolean
  tokenIds?: number[]
  onClaim?: () => Promise<ethers.providers.TransactionResponse>
  refresh: () => void
}

const InfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text' })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 24px;
`

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 75fr 2fr;
  cursor: pointer;
`

const GridPrice = styled.div`
  display: grid;
  grid-gap: 16px 8px;
  margin-top: 24px;
  grid-template-columns: repeat(2, auto);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 16px;
  }
`

const LifeCycleGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  cursor: pointer;
`
const Wrapper = styled.div``
const Info = styled(Box)`
  font-size: 10px;
`
const NftCard: React.FC<NftCardProps> = ({ nft, canClaim = false, tokenIds = [], onClaim, refresh }) => {
  const history = useHistory()
  const [remainingSupply, setRemainingSupply] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const { profile } = useProfile()
  const { name, description, supply } = nft
  const walletOwnsNft = tokenIds.length > 0
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const handleSuccess = () => {
    refresh()
  }

  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   t('Initial stage'),
  //   { placement: 'top-end', tooltipOffset: [20, 10] },
  // )

  // const [onPresentTransferModal] = useModal(
  //   <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  // )
const [modal, setModal]=useState(true)
  // const [onPresentLifeCycleModal] = useModal(<LifeCycleModal nft={nft} onDismiss={handleSuccess} />)

  // const [onPresentView3DNftModal] = useModal(<View3DNftModal nft={nft} onDismiss={handleSuccess} />)

  const [onPresentConfigurator3DNftModal] = useModal(
    <Configurator3DNftModal nft={nft} onDismiss={handleSuccess} history={history} />,
  )
  const sizeFormatted = `${nft.size.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${nft.sizeMeasure}`
  const weightFormatted = `${nft.weight.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${nft.weightMeasure}`
  const initialCostFormatted = `${nft.initialLifeCycle.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  const initialCostExplained = `${t('School time: ')}${nft.initialLifeCycle.periodInMinutes / 60}h`
  const finalCostFormatted = `${nft.finalLifeCycle.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  const finalCostExplained = `${t('Gladiator Ready')}`
  const gladiatorNftContract = useGladiatorNft()

  const getGladiatorSupply = async () => {
    const resp = await gladiatorNftContract.gladiator(nft.name)
    // console.log("parseUnitsparseUnits", parseInt(resp.gladiatorCount._hex.toString(), 16));
    // console.log("parseUnitsparseUnits", parseInt(resp.gladiatorSupply._hex.toString(), 16));
    setRemainingSupply(
      Number(parseInt(resp.gladiatorSupply._hex.toString(), 16) - parseInt(resp.gladiatorCount._hex.toString(), 16)),
    )

    // console.log(nft.name, resp.gladiatorCount, resp.gladiatorSupply)
  }

  useEffect(() => {
    getGladiatorSupply()
  }, [nft, useGladiatorNft])
  useEffect(() => {
    if (remainingSupply) {
      nft.supply = remainingSupply
    }
  }, [remainingSupply])
  //   useEffect(() => {
  //     (async () => {
  // const {data} = await axios.get("https://gateway.pinata.cloud/ipfs/QmZHnVZTjGjY3fdSPrJHHqwdgitbtvx9ZBiW9RrhZn2ruT")
  // console.log("datadatadatadatadatadata", data);
  //     })()
  //   }, [])

  return (
    <Card isActive={walletOwnsNft} key={nft.glTF} style={{ background: '#d9ab3a' }}>
      <Preview nft={nft} isOwned={walletOwnsNft} />
      <CardBody>
        <Header>
          <Heading>
            <Grid>
              <Flex>{name}</Flex>
              <Flex>
                {nft.listingType === ListingType.COMMUNITY ? (
                  <CommunityTag />
                ) : nft.listingType === ListingType.PARTNER ? (
                  <PartnerTag />
                ) : (
                  <CoreTag />
                )}
              </Flex>
              {/* <Flex onClick={onPresentView3DNftModal}>
                <Tag ml="5px" mt="5px" variant="success" startIcon={<VoteIcon width="18px" color="success" mr="4px" />}>
                  {t('View 3D')}
                </Tag>
              </Flex> */}
            </Grid>
          </Heading>
          {walletOwnsNft && (
            <Tag outline variant="secondary">
              {t('In Wallet')}
            </Tag>
          )}

          {/* {profile?.nft?.identifier === identifier && (
            <Tag outline variant="success">
              {t('Profile Pic')}
            </Tag>
          )} */}
        </Header>

        <Wrapper>
          <Flex justifyContent="space-between">
            <Text>{t('Rarity')}:</Text>
            <Text>{nft.rarity}</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>{t('Supply')}:</Text>
            <Text>{nft.supply}</Text>
          </Flex>
          {/* <Flex justifyContent="space-between">
          <Text>{t('Size')}:</Text>
          {sizeFormatted ? <Text>{sizeFormatted}</Text> : <Skeleton width={75} height={25} />}
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('Weight')}:</Text>
          {weightFormatted ? <Text>{weightFormatted}</Text> : <Skeleton width={75} height={25} />}
        </Flex>  */}
        </Wrapper>

        <GridPrice>
          <Flex>
            <img src="/nrtlogo.png" width="32px" height="32px" alt="" />
            <Box>
              <Flex>
                <Heading ml="10px">{initialCostFormatted}</Heading>
                {nft.token}
              </Flex>
              <Info ml="10px">{initialCostExplained}</Info>
            </Box>
          </Flex>

          <Flex justifyContent="right">
            <img src="/nrtlogo.png" width="32px" height="32px" alt="" />
            <Box>
              <Flex>
                <Heading ml="10px">{finalCostFormatted}</Heading>
                {nft.token}
              </Flex>
              <Info ml="10px">{finalCostExplained}</Info>
            </Box>
          </Flex>
        </GridPrice>

        {/* <Tag outline variant="secondary">
            {t('In Wallet')}
          </Tag>
          <Tag outline variant="success">
            {t('In Wallet')}
          </Tag> */}

        <Suspense fallback={<Loader />}>
          <Button width="100%" mt="24px" onClick={onPresentConfigurator3DNftModal}>
            {t('Personalize & Buy')}
          </Button>
        </Suspense>

        {/* {canClaim && (
          <Button width="100%" mt="24px" onClick={onPresentClaimModal}>
            {t('Claim this NFT')}
          </Button>
        )} */}
        {/* {walletOwnsNft && (
          <Button width="100%" variant="secondary" mt="24px" onClick={onPresentTransferModal}>
            {t('Transfer')}
          </Button>
        )} */}
      </CardBody>
      <Attributes attributes={nft.attributes} />
      <Weapons attributes={nft.weapons} />
      <Abilities attributes={nft.abilities} />
      {/* <CardFooter p="0">
        <DetailsButton width="100%" endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {t('Details')}
        </DetailsButton>
        {isOpen && (
          <InfoBlock>
            <DetailsSection nftModel={nft} />
          </InfoBlock>
        )}
      </CardFooter> */}
    </Card>
  )
}

export default NftCard
