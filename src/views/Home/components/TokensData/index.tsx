import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Heading, Skeleton, Button, Link } from '@pancakeswap/uikit'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import CompositeImage, { CompositeImageProps } from '../CompositeImage'
import PurpleWordHeading from '../PurpleWordHeading'
import NrtDenaData from '../NrtDenaData'


const TokensSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: between;
    @media (min-width: 320px) and (max-width: 768px) {
        flex-direction: column;
    }
`
const TokenContent = styled.div`
    display: flex;
    flex-direction: column;
`
const TokenData = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 100px;
    @media (min-width: 320px) and (max-width: 768px) {
        margin-left: 0px;
        margin-top: 40px;
    }
`
interface TokenDataButton {
    to: string
    text: string
    external: boolean
}


export interface TokensDataProps {
    headingText: string
    bodyText: string
    primaryButton: TokenDataButton
    secondaryButton: TokenDataButton
    images: CompositeImageProps
}

const TokensData: React.FC<TokensDataProps> = (props) => {
    const { t } = useTranslation()
    const { headingText, bodyText, primaryButton, secondaryButton, images } = props
    const headingTranslatedText = t(headingText)
    const bodyTranslatedText = t(bodyText)


    return (
        <>
            <TokensSection>
                <TokenContent>
                    <CompositeImage {...images} />
                    <PurpleWordHeading text={headingTranslatedText} />
                    <Text color="textSubtle" mb="24px">
                        {bodyTranslatedText}
                    </Text>
                    <Flex>
                        <Button mr="16px">
                            {primaryButton.external ? (
                                <Link external href={primaryButton.to}>
                                    <Text color="card" bold fontSize="16px">
                                        {t(primaryButton.text)}
                                    </Text>
                                </Link>
                            ) : (
                                <RouterLink to={primaryButton.to}>
                                    <Text color="card" bold fontSize="16px">
                                        {t(primaryButton.text)}
                                    </Text>
                                </RouterLink>
                            )}
                        </Button>
                        {secondaryButton.external ? (
                            <Link external href={secondaryButton.to}>
                                {t(secondaryButton.text)}
                            </Link>
                        ) : (
                            <RouterLink to={secondaryButton.to}>{t(secondaryButton.text)}</RouterLink>
                        )}
                    </Flex>
                </TokenContent>
                <TokenData>
                    <NrtDenaData />
                </TokenData>
            </TokensSection>
        </>
    )
}

export default TokensData