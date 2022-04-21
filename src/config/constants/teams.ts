import { IPFS_GATEWAY } from '../index'
import { Team } from './types'

const teams: Team[] = [
  {
    id: 1,
    name: 'Hermeses',
    description: "Meaning 'god of good luck', a skillful set of fighters in ancient Rome",
    images: {
      lg: 'hermes-lg.png',
      md: 'hermes-md.png',
      sm: 'hermes-sm.png',
      alt: 'hermes-alt.png',
      ipfs: `${IPFS_GATEWAY}/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/hermes.png`,
    },
    background: 'hermes-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
  {
    id: 2,
    name: 'Flammas',
    description: "Meaning 'the flame' was one of the most formidable and capable gladiators",
    images: {
      lg: 'flamma-lg.png',
      md: 'flamma-md.png',
      sm: 'flamma-sm.png',
      alt: 'flamma-alt.png',
      ipfs: `${IPFS_GATEWAY}/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/flamma.png`,
    },
    background: 'flamma-bg.svg',
    textColor: '#FFFFFF',
    users: 0,
    points: 0,
  },
  {
    id: 3,
    name: 'Spartacus',
    description: 'From the city of Sparta was the most famous gladiators of Ancient Rome',
    images: {
      lg: 'spartacus-lg.png',
      md: 'spartacus-md.png',
      sm: 'spartacus-sm.png',
      alt: 'spartacus-alt.png',
      ipfs: `${IPFS_GATEWAY}/QmXKzSojwzYjtDCVgR6mVx7w7DbyYpS7zip4ovJB9fQdMG/spartacus.png`,
    },
    background: 'spartacus-bg.svg',
    textColor: '#191326',
    users: 0,
    points: 0,
  },
]

export default teams
