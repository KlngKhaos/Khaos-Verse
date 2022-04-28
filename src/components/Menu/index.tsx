import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { Menu as UikitMenu } from '@pancakeswap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useNrtBusdPrice, useDenaPrice } from 'hooks/useBUSDPrice'
import { useProfile } from 'state/profile/hooks'
import config from './config/config'
import UserMenu from './UserMenu'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
import styled from 'styled-components'

const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const nrtBusdPrice = useNrtBusdPrice()
  const denaPrice = useDenaPrice()
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useLocation()

  const activeMenuItem = getActiveMenuItem({ menuConfig: config(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const logoHtml: any = navRef.current.querySelector(`a > svg`).parentNode
    logoHtml.setAttribute('aria-label', 'Khaos Home Page')
    logoHtml.innerHTML = '<img src="/khaos.png" alt="Khaos" />'
  }, [])

  return (
    <StyledMenu ref={navRef}>
      <UikitMenu
        userMenu={<UserMenu />}
        globalMenu={<GlobalSettings />}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        nrtPriceUsd={nrtBusdPrice}
        denaPriceUsd={denaPrice}
        links={config(t)}
        subLinks={activeMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        footerLinks={footerLinks(t)}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        buyCakeLabel={t('Buy')}
        profile={{
          username: profile?.username,
          image: profile?.nft?.image?.thumbnail,
          profileLink: '/profile',
          noProfileLink: '/profile',
          showPip: !profile?.username,
        }}
        {...props}
      />
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  nav {
    background: #000 !important;
  }
  li {
    color: #9a6aff !important;
  }
  ul + div {
    display: none;
  }
`

export default Menu
