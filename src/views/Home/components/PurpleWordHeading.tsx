import React from 'react'
import { Heading, TextProps } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'

interface HeadingProps extends TextProps {
  text: string
}

const NewHeading = styled(Heading)`
  white-space: nowrap;
`

const PurpleWordHeading: React.FC<HeadingProps> = ({ text, ...props }) => {
  const { theme } = useTheme()
  const split = text.split(' ')
  const firstWord = `${split[0]} ${split[1]}`
  const remainingWords = split.slice(2).join(' ')
  return (
    <NewHeading scale="xl" mb="24px" {...props}>
      <span style={{ color: theme.colors.secondary }}>{firstWord}</span>
      <br />
      {remainingWords}
    </NewHeading>
  )
}

export default PurpleWordHeading
