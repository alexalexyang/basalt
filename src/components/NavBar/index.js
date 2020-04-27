import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Search from "../Search"
import LocaleSwitch from "./LocaleSwitch"
import Burger from "./Burger"
import PageLinks from "./PageLinks"
import BlogLink from "./BlogLink"
import logo from "../../images/logo.svg"

function NavBar({ currentLocale, translationLocale }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        locales
        translations
        siteSettings
      }
      allContentfulPage {
        nodes {
          id
          fields {
            slug
          }
          title
          node_locale
        }
      }
    }
  `)

  const {
    site: { defaultLocale, locales, translations, siteSettings },
    allContentfulPage,
  } = data

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={currentLocale}>
          <img src={logo} width="112" height="28" alt="Bulma logo." />{" "}
          <h1 className="title">{siteSettings.siteName[defaultLocale.code]}</h1>
        </Link>

        <Burger />
      </div>

      <div id="navbar-menu" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          {defaultLocale ? (
            <PageLinks
              currentLocale={currentLocale}
              allContentfulPage={allContentfulPage}
              defaultLocale={defaultLocale}
            />
          ) : null}

          <BlogLink
            currentLocale={currentLocale}
            defaultLocale={defaultLocale}
            translations={translations}
            translationLocale={translationLocale}
          />

          <LocaleSwitch
            locales={locales}
            defaultLocale={defaultLocale}
            translations={translations}
            translationLocale={translationLocale}
          />

          <div className="navbar-item">
            <Search
              noSearchResults={translations.noSearchResults[translationLocale]}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
