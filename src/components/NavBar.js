import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Search from "./Search"

function NavBar() {
  const data = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        locales
        translations
      }
      allContentfulPage {
        nodes {
          id
          slug
          title
          node_locale
        }
      }
    }
  `)

  const {
    site: { defaultLocale, locales, translations },
    allContentfulPage,
  } = data

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

  const changeLocale = code => {
    typeof window !== "undefined" &&
    defaultLocale &&
    code === defaultLocale.code
      ? window.location.replace(`${window.location.origin}${getSubPath()}`)
      : window.location.replace(
          `${window.location.origin}/${code}${getSubPath()}`
        )
  }

  const getSubPath = () => {
    let pathname =
      typeof window !== "undefined" && window.location.pathname
        ? window.location.pathname
        : ""
    let subPath = ""

    // If path is "example.com"
    if (pathname.match(/^\/\D\D\//) == null && pathname.length === 1) {
      subPath = ""
    }

    // If path is "example.com/page"
    if (pathname.match(/^\/\D\D\//) == null && pathname.length > 3) {
      // return "/page"
      subPath = pathname
    }

    // If path is "example.com/en/page"
    if (pathname.match(/^\/\D\D\//) && pathname.length > 1) {
      let locale = pathname.match(/^\/\D\D\//)
      subPath = pathname.replace(locale, "/")
    }

    return subPath
  }

  const pages = () => {
    return currentLocale === ""
      ? allContentfulPage.nodes.map(node => {
          return node.node_locale === defaultLocale.code ? (
            <Link to={`${node.slug}`} className="navbar-item" key={node.id}>
              {node.title}
            </Link>
          ) : null
        })
      : allContentfulPage.nodes.map(node => {
          return node.node_locale === currentLocale ? (
            <Link
              to={`/${node.node_locale}${node.slug}`}
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
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Bulma logo."
          />
        </Link>

        <span
          // role="span"
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
                  ? `/${translations.blog[defaultLocale.code]}`
                  : `/${currentLocale}/${translations.blog[defaultLocale.code]}`
              }
              className="navbar-item"
            >
              {translations.blog[getTranslationLocale()]}
            </Link>
            <div className="navbar-dropdown">
              <Link
                to={
                  currentLocale === ""
                    ? `/${translations.categories[defaultLocale.code]}`
                    : `/${currentLocale}/${
                        translations.categories[defaultLocale.code]
                      }`
                }
              >
                {translations.categories[getTranslationLocale()]}
              </Link>
            </div>
          </div>

          {locales ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <Link to={getSubPath()} className="navbar-link">
                {translations.languages[getTranslationLocale()]}
              </Link>
              <div className="navbar-dropdown">
                {locales.map(item => (
                  <button
                    className="navbar-item language-button"
                    key={item.name}
                    onClick={() => changeLocale(item.code)}
                  >
                    {item.code}
                  </button>
                ))}
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
