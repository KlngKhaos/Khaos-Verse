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
import PriceFilter from './PriceFilter'
import RarityFilter from './RarityFilter'
import CharacteristicsFilter from './CharacteristicsFilter'
import useTheme from '../../../../hooks/useTheme'
import AttributesFilter from './AttributesFilter'
import WeaponMasteryFilter from './WeaponMasteryFilter'
import AbilitiesFilter from './AbilitiesFilter'

const FilterCardCard = styled(Card)`
  flex: 1;
  background-color: #d9ab3a;
`

const NewCardHeader = styled(CardHeader)`
  background: linear-gradient(166.77deg, #d9ab3a 100%, #d9ab3a 100%);
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
  z-index: 12;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

interface RarityI {
  1: Boolean
  2: Boolean
  3: Boolean
  4: Boolean
  5: Boolean
  6: Boolean
}
type ValueI = 'ability' | 'weapon' | 'attributes' | 'characteristics' | 'rarity'

interface FilterCardProps {
  handleCurrency: (e: string) => void
  handleChangeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMinNRTsQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMaxNRTsQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeAttributes: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeWeapons: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeCharacteristics: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeAbilities: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeRarity: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSortOptionChange: (option: OptionProps) => void
  clearFilterStates: (value: ValueI) => void
  rarity: RarityI
  freshwaterOnly: boolean
  saltwaterOnly: boolean
  setFreshwaterOnly: (a: boolean) => void
  setSaltwaterOnly: (a: boolean) => void
}

const FilterCard: React.FC<FilterCardProps> = ({
  handleChangeQuery,
  handleSortOptionChange,
  freshwaterOnly,
  setFreshwaterOnly,
  saltwaterOnly,
  setSaltwaterOnly,
  handleMinNRTsQuery,
  handleMaxNRTsQuery,
  handleChangeCharacteristics,
  handleChangeAttributes,
  handleChangeWeapons,
  handleChangeAbilities,
  handleChangeRarity,
  clearFilterStates,
  handleCurrency,
  rarity,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  return (
    <FilterCardCard mb={['24px', null, null, '0']}>
      <NewCardHeader>
        <NewHeading>{t('Filter')}</NewHeading>
      </NewCardHeader>
      <CardBody>
        <ControlContainer>
          {/* <ViewControls>
            <ToggleWrapper>
              <Toggle checked={freshwaterOnly} onChange={() => setFreshwaterOnly(!freshwaterOnly)} scale="sm"/>  */}
          {/* <Toggle checked scale="sm" /> */}
          {/* <Text> {t('Core Arenas')}</Text>
            </ToggleWrapper>
            <ToggleWrapper>
              <Toggle checked={saltwaterOnly} onChange={() => setSaltwaterOnly(!saltwaterOnly)} scale="sm" /> */}
          {/* <Toggle checked scale="sm" /> */}
          {/* <Text> {t('Community Arenas')}</Text>
            </ToggleWrapper>
          </ViewControls> */}
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Gallery" />
            </LabelWrapper>
          </FilterContainer>
          <FilterContainer>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Sort by')}</Text>
              <Select
                z-index="auto"
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('Rarity'),
                    value: 'rarity',
                  },
                  {
                    label: t('Supply'),
                    value: 'supply',
                  },
                  // {
                  //   label: t('Earned'),
                  //   value: 'earned',
                  // },
                  {
                    label: t('School Price'),
                    value: 'school price',
                  },
                  {
                    label: t('Gladiator Ready'),
                    value: 'gladiator ready',
                  },
                ]}
                onOptionChange={handleSortOptionChange}
              />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
      </CardBody>
      <PriceFilter handleCurrency={handleCurrency} handleMinNRTsQuery={handleMinNRTsQuery} handleMaxNRTsQuery={handleMaxNRTsQuery} />

      <RarityFilter rarity={rarity} handleChangeRarity={handleChangeRarity} clearFilterStates={clearFilterStates} />
      {/* <CharacteristicsFilter  
      handleChangeCharacteristics={ handleChangeCharacteristics}
      clearFilterStates={clearFilterStates}
      /> */}

      <AttributesFilter handleChangeAttributes={handleChangeAttributes} clearFilterStates={clearFilterStates} />

      <WeaponMasteryFilter handleChangeWeapons={handleChangeWeapons} clearFilterStates={clearFilterStates} />

      <AbilitiesFilter handleChangeAbilities={handleChangeAbilities} clearFilterStates={clearFilterStates} />
    </FilterCardCard>
  )
}

export default FilterCard
