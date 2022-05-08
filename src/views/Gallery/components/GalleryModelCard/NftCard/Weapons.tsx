import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Text, Input, Flex, Box, CardFooter, ExpandableLabel } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus } from 'config/constants/types'
// import WhitelistedBiddersButton from '../WhitelistedBiddersButton'
import { GalleryNft } from 'config/constants/gallery/types'


const FooterInner = styled(Box)`
  background-color: #000000;
`
const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
`
const ExpandableText = styled.div`
  color:  #D9AB3A;
`
const NewCardFooter = styled(CardFooter)`
//   border-top: none !important;
`
const IconImage = styled.div`
  width: 24px;
  margin-right: 8px;
`
const LabelText = styled.div`
  display: flex;
`

interface WeaponsProps {
    handleAttributesFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
    attributes: GalleryNft["weapons"]
}

const Weapons: React.FC<WeaponsProps> = ({ handleAttributesFilter, attributes }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const { t } = useTranslation()
    const minInputRef = useRef<HTMLInputElement | null>(null)
    const maxInputRef = useRef<HTMLInputElement | null>(null)
    // const { topLeaderboard, status } = auction

    // const isLiveOrPendingAuction = status === AuctionStatus.Pending || status === AuctionStatus.Open

    return (
        <NewCardFooter p="0">
            {isExpanded && (
                <FooterInner>
                    <Flex p="24px" flexDirection="column">
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/one-handed.png" alt="One-hand" />
                                </IconImage>
                                <Text>{t('One-hand')}</Text>
                            </LabelText>
                            <Text>{attributes.oneHand}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/two-handed.png" alt="Two-hand" />
                                </IconImage>
                                <Text>{t('Two-hand')}</Text>
                            </LabelText>
                            <Text>{attributes.twoHand}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/shield.png" alt="Shield" />
                                </IconImage>
                                <Text>{t('Shield')}</Text>
                            </LabelText>
                            <Text>{attributes.shield}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/ranged.png" alt="Ranged" />
                                </IconImage>
                                <Text>{t('Ranged')}</Text>
                            </LabelText>
                            <Text>{attributes.ranged}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/dual.png" alt="Dual" />
                                </IconImage>
                                <Text>{t('Dual')}</Text>
                            </LabelText>
                            <Text>{attributes.dual}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/polearms.png" alt="Polearms" />
                                </IconImage>
                                <Text>{t('Polearms')}</Text>
                            </LabelText>
                            <Text>{attributes.polearms}</Text>
                        </LabelWrapper>
                    </Flex>
                </FooterInner>
            )}
            <Flex p="8px" alignItems="center" justifyContent="center">
                <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
                    <ExpandableText>
                        {isExpanded ? t('Hide Weapons') : t('Weapons')}
                    </ExpandableText>
                </ExpandableLabel>
            </Flex>
        </NewCardFooter>
    )
}

export default Weapons