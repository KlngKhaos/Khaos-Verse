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

interface AbilitiesProps {
    handleAttributesFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
    attributes: GalleryNft["abilities"]
}

const Abilities: React.FC<AbilitiesProps> = ({ handleAttributesFilter, attributes }) => {
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
                                    <img src="/images/battles/icons/leadership.png" alt="Leadership" />
                                </IconImage>
                                <Text>{t('Leadership')}</Text>
                            </LabelText>
                            <Text>{attributes.leadership}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/coach.png" alt="Coach" />
                                </IconImage>
                                <Text>{t('Coach')}</Text>
                            </LabelText>
                            <Text>{attributes.coach}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/cook.png" alt="Cook" />
                                </IconImage>
                                <Text>{t('Cook')}</Text>
                            </LabelText>
                            <Text>{attributes.cook}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/medical.png" alt="Medical" />
                                </IconImage>
                                <Text>{t('Medical')}</Text>
                            </LabelText>
                            <Text>{attributes.medical}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/smith.png" alt="Smith" />
                                </IconImage>
                                <Text>{t('Smith')}</Text>
                            </LabelText>
                            <Text>{attributes.smith}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/torture.png" alt="Torture" />
                                </IconImage>
                                <Text>{t('Torture')}</Text>
                            </LabelText>
                            <Text>{attributes.torture}</Text>
                        </LabelWrapper>
                    </Flex>
                </FooterInner>
            )}
            <Flex p="8px" alignItems="center" justifyContent="center">
                <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
                    <ExpandableText>
                        {isExpanded ? t('Hide Abilities') : t('Abilities')}
                    </ExpandableText>
                </ExpandableLabel>
            </Flex>
        </NewCardFooter>
    )
}

export default Abilities