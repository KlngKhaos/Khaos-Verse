import { createGlobalStyle } from 'styled-components'

import goodTimes from './GOODTIME.TTF'

export default createGlobalStyle`
    @font-face {
        font-family: 'Good Times';
        src: url(${goodTimes})  format('truetype');
    }
`
