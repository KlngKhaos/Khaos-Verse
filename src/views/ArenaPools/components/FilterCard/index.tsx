import React from 'react'
import styled from 'styled-components'
import {
  Text,
  Heading,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Spinner,
  Skeleton,
  Tag,
  Button,
  Toggle,
  useModal,
} from '@pancakeswap/uikit'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { useTranslation } from 'contexts/Localization'
import { Auction, AuctionStatus, ConnectedBidder } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
// import PlaceBidModal from '../PlaceBidModal'
import AuctionSchedule from './AuctionSchedule'
import CannotBidMessage from './CannotBidMessage'
import AprApyFilter from './AprApyFilter'
import RarityFilter from './RarityFilter'
import CharacteristicsFilter from './CharacteristicsFilter'
import useTheme from '../../../../hooks/useTheme'

const FilterCardCard = styled(Card)`
  flex: 1;
  background-color: #D9AB3A;
`
const NewCardHeader = styled.div`
    background: linear-gradient(166.77deg,#D9AB3A 100%,#D9AB3A 100%);
    padding: 24px;
`
const NewHeading = styled(Heading)`
  color: #000;
  text-align: center;
  font-size: 24px;
`
const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 0;
  }
`
const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  > div {
    padding: 8px 0px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;

  ${Text} {
    margin-left: 8px;
  }
`
const LabelWrapper = styled.div`
  margin-bottom: 10px;

  > ${Text} {
    font-size: 12px;
  }
`
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`
interface FilterCardProps {
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAprApyFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSortOptionChange: (option: OptionProps) => void
  freshwaterOnly?: boolean
  saltwaterOnly?: boolean
  setFreshwaterOnly?: (a: boolean) => void
  setSaltwaterOnly?: (a: boolean) => void
}

const FilterCard: React.FC<FilterCardProps> = ({ handleAprApyFilter, handleChangeQuery, handleSortOptionChange,
  freshwaterOnly, setFreshwaterOnly, saltwaterOnly, setSaltwaterOnly }) => {
  const { t } = useTranslation()

  return (
    <FilterCardCard mb={['24px', null, null, '0']}>
      <NewCardHeader>
        <NewHeading>{t('Filter')}</NewHeading>
      </NewCardHeader>
      <CardBody>
        <ControlContainer>
          {/* <ViewControls>
            <ToggleWrapper> */}
          {/* <Toggle checked={freshwaterOnly} onChange={() => setFreshwaterOnly(!freshwaterOnly)} scale="sm" /> */}
          {/* <Toggle checked scale="sm" />
              <Text> {t('Gladiators Schools')}</Text>
            </ToggleWrapper>
            <ToggleWrapper> */}
          {/* <Toggle checked={saltwaterOnly} onChange={() => setSaltwaterOnly(!saltwaterOnly)} scale="sm" /> */}
          {/* <Toggle checked scale="sm" />
              <Text> {t('Arenas')}</Text>
            </ToggleWrapper>
          </ViewControls> */}

          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput
                onChange={handleChangeQuery}
                placeholder="Stake Tokens" />
            </LabelWrapper>
          </FilterContainer>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
              <Select
                z-index="auto"
                options={[
                  {
                    label: t('APR'),
                    value: 'apr',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Total staked'),
                    value: 'totalStaked',
                  },
                ]}
                onOptionChange={handleSortOptionChange}
              />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
      </CardBody>
      <AprApyFilter />
      {/* <RarityFilter/> */}
      {/* <CharacteristicsFilter/> */}
    </FilterCardCard>
  )
}

export default FilterCard
