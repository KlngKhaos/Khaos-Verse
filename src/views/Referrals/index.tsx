import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import {
    Heading, IconButton, Text, Flex, Card, CardBody, CardHeader, Box
} from '@pancakeswap/uikit'
import PageHeader from 'components/PageHeader'
import Page from 'components/Layout/Page'
import StyledInternalLink from '../../components/Links'
import CopyReferralLink from './CopyReferralLink'




const StyledHeader = styled(PageHeader)`
  max-height: max-content;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: 600px;
  }
`
const Left = styled(Flex)`
  flex-direction: column;
  flex: 1;
`
const NewHeading = styled(Heading)`
  color: #D9AB3A;
`
const NewCardHeader = styled(CardHeader)`
  background: #000 !important;
  border-bottom: 1px solid #D9AB3A;
`
const ReferralCard = styled(Card)`
  width: 100%;
  margin: 0px 20px;
`
const ReferralCardLink = styled(Card)`
  margin: 40px 20px 0px 20px !important;
`
const ReferralLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ReferralLinkBonus = styled.div`
  margin-top: 15px;
`

const Referrals: React.FC = () => {
    const { t } = useTranslation()

    return (
        <>
            <StyledHeader>
                <Flex flexDirection={['column-reverse', null, 'row']}>
                    <Left>
                        <NewHeading as="h3" scale="xl" my="24px" textAlign="center">
                            {t('Gladiators Finance Referral Program')}
                        </NewHeading>
                        <Text color="textSubtle" mb="64px" textAlign="center">
                            {t("Share the referral link below to invite your friends and earn 1% of your friends' earnings FOREVER!")}
                        </Text>
                    </Left>
                </Flex>
            </StyledHeader>
            <Page>
                <Flex flexDirection={['column', 'row']} justifyContent={['space-between']}>
                    <ReferralCard id="top-traders-card">
                        <Box width="100%">
                            <NewCardHeader>
                                <Heading color="textSubtle" scale="md">
                                    {t('Total Referrals')}
                                </Heading>
                            </NewCardHeader>
                            <CardBody>
                                {t('0')}
                            </CardBody>
                        </Box>
                    </ReferralCard>
                    <ReferralCard id="top-traders-card">
                        <Box width="100%">
                            <NewCardHeader>
                                <Heading color="textSubtle" scale="md">
                                    {t('Referral Bonus Rate')}
                                </Heading>
                            </NewCardHeader>
                            <CardBody>
                                {t('1.0%')}
                                <ReferralLinkBonus>
                                    {t('The referral bonus rate will go up occasionally in marketing campaigns.Keep an eye out for our announcement!')}
                                </ReferralLinkBonus>
                            </CardBody>
                        </Box>
                    </ReferralCard>
                </Flex>
                <ReferralCardLink id="top-traders-card">
                    <Box width="100%">
                        <NewCardHeader>
                            <Heading color="textSubtle" scale="md">
                                {t('Your Referral Link')}
                            </Heading>
                        </NewCardHeader>
                        <CardBody>
                            <ReferralLink>
                                <StyledInternalLink to="https://gladiators.finance/?ref=jnsjnjdncjd8uhs87efmsjdmnjdend">
                                    {t('https://gladiators.finance/?ref=jnsjnjdncjd8uhs87efmsjdmnjdend')}
                                </StyledInternalLink>
                                <IconButton variant="text" scale="sm">
                                    <CopyReferralLink account="https://gladiators.finance/?ref=jnsjnjdncjd8uhs87efmsjdmnjdend" />
                                </IconButton>
                            </ReferralLink>
                        </CardBody>
                    </Box>
                </ReferralCardLink>
            </Page>
        </>
    )
}

export default Referrals