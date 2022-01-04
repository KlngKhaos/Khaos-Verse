import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: black;

    img {
      height: auto;
      max-width: 100%;
    }
  }

  @font-face {
    font-family: 'Good Times';
    src: url('/assets/fonts/Good-Times-Font/good\ times\ rg.ttf');
  }
  
  @font-face {
    font-family: 'Helvetica';
    src: url('/assets/fonts/Helvetica-Font/Helvetica.ttf');
  }
`

export default GlobalStyle
