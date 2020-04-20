import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { getCurrentLocale, getTranslationLocale } from "./utils"
import NavBar from "./NavBar"
import "../css/style.scss"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const {
    site: { defaultLocale },
  } = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
      }
    }
  `)

  const currentLocale = getCurrentLocale()
  const translationLocale = getTranslationLocale(
    currentLocale,
    defaultLocale.code
  )

  return (
    <>
      <NavBar
        currentLocale={currentLocale}
        translationLocale={translationLocale}
      />
      <main>{children}</main>
      <Footer
        currentLocale={currentLocale}
        translationLocale={translationLocale}
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
