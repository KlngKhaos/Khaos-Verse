import React from 'react'
import { ModalProvider, light, dark, darkColors } from '@pancakeswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'styled-components'
import { useThemeManager } from 'state/user/hooks'
import { getLibrary } from 'utils/web3React'
import { LanguageProvider } from 'contexts/Localization'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ToastsProvider } from 'contexts/ToastsContext'
import store from 'state'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'

const ThemeProviderWrapper = (props) => {
  // ignoring light theme for now.
  // const [isDark] = useThemeManager()
  // return <ThemeProvider theme={isDark ? dark : light} {...props} />
  // const updatedTheme =
  dark.colors.primary = '#7645D9'
  dark.colors.secondary = '#7645D9'
  dark.colors.gradients = {
    bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
    inverseBubblegum: 'linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)',
    cardHeader: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    violetAlt: 'linear-gradient(180deg, #434575 0%, #66578D 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
  }
  return <ThemeProvider theme={dark} {...props} />
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper>
              <LanguageProvider>
                <RefreshContextProvider>
                  <SWRConfig
                    value={{
                      use: [fetchStatusMiddleware],
                    }}
                  >
                    <ModalProvider>{children}</ModalProvider>
                  </SWRConfig>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
