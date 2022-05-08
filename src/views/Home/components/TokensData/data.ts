import { TokensDataProps } from '.'

export const tokensData: TokensDataProps = {
  headingText: 'Gladiator makes Our World go round.',
  bodyText: 'NRT token is at the heart of the gladiator Finance ecosystem.Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it! ',
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.gladiators.finance/',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/tokens-data/',
    attributes: [
      { src: 'gladiator-tokens', alt: 'gladiator tokens' },
    ],
  }
}