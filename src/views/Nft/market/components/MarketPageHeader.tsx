import React from 'react'
import styled from 'styled-components'
import PageHeader, { PageHeaderProps } from 'components/PageHeader'

const Background = styled(PageHeader)`
  background-image: url(/images/decorations/BG.png);
  background-position: center;
  object-fit: cover;
`

const MarketPageHeader: React.FC<PageHeaderProps> = (props) => {
  return <Background {...props} />
}

export default MarketPageHeader
