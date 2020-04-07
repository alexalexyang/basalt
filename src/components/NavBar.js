import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Search from "./Search"
import LocaleSwitcher from "./LocaleSwitcher"
import logo from "../images/logo.svg"

function NavBar() {
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

  console.log(siteSettings)

  const getCurrentLocale = () => {
    const pathname =
      typeof window !== "undefined" &&
      window.location.pathname.match(/^\/\w\w\/|^\/\w\w$/)
    return pathname ? pathname[0].match(/\w\w/)[0] : ""
  }

  const currentLocale = getCurrentLocale()

  const getTranslationLocale = () => {
    const locale = currentLocale === "" ? defaultLocale.code : currentLocale
    return locale
  }

  const pages = () => {
    return currentLocale === ""
      ? allContentfulPage.nodes.map(node => {
          return node.node_locale === defaultLocale.code ? (
            <Link
              to={`${node.fields.slug}`}
              className="navbar-item"
              key={node.id}
            >
              {node.title}
            </Link>
          ) : null
        })
      : allContentfulPage.nodes.map(node => {
          return node.node_locale === currentLocale ? (
            <Link
              to={`/${node.fields.slug}`}
              className="navbar-item"
              key={node.id}
            >
              {node.title}
            </Link>
          ) : null
        })
  }

  const burger = () => {
    const burger = document.getElementById("navbar-burger")
    burger.classList.toggle("is-active")
    const navbarMenu = document.getElementById("navbar-menu")
    navbarMenu.classList.toggle("is-active")
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={currentLocale}>
          <img src={logo} width="112" height="28" alt="Bulma logo." />
        </Link>

        <span
          className="navbar-burger burger"
          id="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-burger"
          onClick={() => burger()}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div id="navbar-menu" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          {defaultLocale ? pages() : null}

          <div className="navbar-item has-dropdown is-hoverable">
            <Link
              to={
                currentLocale === ""
                  ? `/${translations.blog[defaultLocale.code].toLowerCase()}`
                  : `/${currentLocale}/${translations.blog[
                      getTranslationLocale()
                    ].toLowerCase()}`
              }
              className="navbar-item"
            >
              {translations.blog[getTranslationLocale()]}
            </Link>
            <div className="navbar-dropdown">
              <Link
                to={
                  currentLocale === ""
                    ? `/${translations.categories[
                        defaultLocale.code
                      ].toLowerCase()}`
                    : `/${currentLocale}/${translations.categories[
                        getTranslationLocale()
                      ].toLowerCase()}`
                }
              >
                {translations.categories[getTranslationLocale()]}
              </Link>
            </div>
          </div>

          {locales ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <Link to={`/`} className="navbar-link">
                {translations.languages[getTranslationLocale()]}
              </Link>
              <div className="navbar-dropdown">
                <LocaleSwitcher
                  defaultLocale={defaultLocale.code}
                  locales={locales}
                />
              </div>
            </div>
          ) : null}
          <div className="navbar-item">
            <Search
              noSearchResults={
                translations.noSearchResults[getTranslationLocale()]
              }
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
