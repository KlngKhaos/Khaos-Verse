import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Text, Input, Flex, Box, CardFooter, ExpandableLabel } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus } from 'config/constants/types'
// import WhitelistedBiddersButton from '../WhitelistedBiddersButton'

const FooterInner = styled(Box)`
  background-color: #000000;
`
const LabelWrapper = styled.div``
const ExpandableText = styled.div`
  color: #d9ab3a;
`
const IconImage = styled.div`
  width: 24px;
  margin-right: 8px;
`
const LabelText = styled.div`
  margin-top:5px;
  display: flex;
`

type ValueI = 'ability' | 'weapon' | 'attributes' | 'characteristics' | 'rarity'

interface AbilitiesFilterProps {
  handleChangeAbilities: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearFilterStates: (value: ValueI) => void
}

const AbilitiesFilter: React.FC<AbilitiesFilterProps> = ({ handleChangeAbilities, clearFilterStates }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()
  const minInputRef = useRef<HTMLInputElement | null>(null)
  const maxInputRef = useRef<HTMLInputElement | null>(null)
  // const { topLeaderboard, status } = auction

  // const isLiveOrPendingAuction = status === AuctionStatus.Pending || status === AuctionStatus.Open
  return (
    <CardFooter p="0">
      {isExpanded && (
        <FooterInner>
          <Flex p="16px" flexDirection="column">
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/leadership.png" alt="Leadership" />
                </IconImage>
                <Text textTransform="uppercase">{t('Leadership')}</Text>
              </LabelText>

              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minLeadership"
                  onChange={(e) => handleChangeAbilities(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxLeadership"
                  onChange={(e) => handleChangeAbilities(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/coach.png" alt="Coach" />
                </IconImage>
                <Text textTransform="uppercase">{t('Coach')}</Text>
              </LabelText>

              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minCoach"
                  onChange={(e) => handleChangeAbilities(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxCoach"
                  onChange={(e) => handleChangeAbilities(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/cook.png" alt="Cook" />
                </IconImage>
                <Text textTransform="uppercase">{t('Cook')}</Text>
              </LabelText>

              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minCook"
                  onChange={(e) => handleChangeAbilities(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxCook"
                  onChange={(e) => handleChangeAbilities(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/medical.png" alt="Medical" />
                </IconImage>
                <Text textTransform="uppercase">{t('Medical')}</Text>
              </LabelText>

              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minMedical"
                  onChange={(e) => handleChangeAbilities(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxMedical"
                  onChange={(e) => handleChangeAbilities(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/smith.png" alt="Smith" />
                </IconImage>
                <Text textTransform="uppercase">{t('Smith')}</Text>
              </LabelText>

              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minSmith"
                  onChange={(e) => handleChangeAbilities(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxSmith"
                  onChange={(e) => handleChangeAbilities(e)}
                />
              </Flex>
            </LabelWrapper>
            <LabelWrapper>
              <LabelText>
                <IconImage>
                  <img src="/images/battles/icons/torture.png" alt="Torture" />
                </IconImage>
                <Text textTransform="uppercase">{t('Torture')}</Text>
              </LabelText>

              <Flex width="100%" pt="8px" px="6px">
                <Input
                  ref={minInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Min"
                  name="minTorture"
                  onChange={(e) => handleChangeAbilities(e)}
                />
                <Flex pt="8px" px="5px">
                  {t('to')}
                </Flex>
                <Input
                  ref={maxInputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  placeholder="Max"
                  name="maxTorture"
                  onChange={(e) => handleChangeAbilities(e)}
                />
              </Flex>
            </LabelWrapper>
          </Flex>
        </FooterInner>
      )}
      <Flex p="8px" alignItems="center" justifyContent="center">
        <ExpandableLabel
          expanded={isExpanded}
          onClick={() => {
            if (isExpanded) {
              clearFilterStates('ability')
            }
            setIsExpanded((prev) => !prev)
          }}
        >
          <ExpandableText>{isExpanded ? t('Hide Abilities') : t('Abilities')}</ExpandableText>
        </ExpandableLabel>
      </Flex>
    </CardFooter>
  )
}

export default AbilitiesFilter
