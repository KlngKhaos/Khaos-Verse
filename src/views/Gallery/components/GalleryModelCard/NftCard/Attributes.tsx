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

interface AttributesProps {
    handleAttributesFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
    attributes: GalleryNft["attributes"]
}

const Attributes: React.FC<AttributesProps> = ({ handleAttributesFilter, attributes }) => {
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
                                    <img src="/images/battles/icons/strength.png" alt="strength" />
                                </IconImage>
                                <Text>{t('Strength')}</Text>
                            </LabelText>
                            <Text>{attributes.strength}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/endurance.png" alt="Endurance" />
                                </IconImage>
                                <Text>{t('Endurance')}</Text>
                            </LabelText>
                            <Text>{attributes.endurance}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/agility.png" alt="Agility" />
                                </IconImage>
                                <Text>{t('Agility')}</Text>
                            </LabelText>
                            <Text>{attributes.agility}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/precision.png" alt="Precision" />
                                </IconImage>
                                <Text>{t('Precision')}</Text>
                            </LabelText>
                            <Text>{attributes.precision}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/intelligence.png" alt="Intelligance" />
                                </IconImage>
                                <Text>{t('Intelligance')}</Text>
                            </LabelText>
                            <Text>{attributes.intelligance}</Text>
                        </LabelWrapper>
                        <LabelWrapper>
                            <LabelText>
                                <IconImage>
                                    <img src="/images/battles/icons/willpower.png" alt="Willpower" />
                                </IconImage>
                                <Text>{t('Willpower')}</Text>
                            </LabelText>
                            <Text>{attributes.willpower}</Text>
                        </LabelWrapper>
                    </Flex>
                </FooterInner>
            )}
            <Flex p="8px" alignItems="center" justifyContent="center">
                <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)}>
                    <ExpandableText>
                        {isExpanded ? t('Hide Attributes') : t('Attributes')}
                    </ExpandableText>
                </ExpandableLabel>
            </Flex>
        </NewCardFooter>
    )
}

export default Attributes