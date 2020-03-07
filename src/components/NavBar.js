import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

function NavBar() {
  const data = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        locales
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
    site: { defaultLocale, locales },
    allContentfulPage,
  } = data

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
    let pathname = typeof window !== "undefined" && window.location.pathname
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

  const getCurrentLocale = () => {
    const pathname =
      typeof window !== "undefined" &&
      window.location.pathname.match(/^\/\w\w\/|^\/\w\w$/)
    return pathname ? pathname[0].match(/\w\w/)[0] : ""
  }
  const currentLocale = getCurrentLocale()

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

        <button
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          {defaultLocale ? pages() : null}

          <div className="navbar-item has-dropdown is-hoverable">
            <Link
              to={currentLocale === "" ? `/blog` : `/${currentLocale}/blog`}
              className="navbar-item"
            >
              Blog
            </Link>
            <div className="navbar-dropdown">
              <Link
                to={
                  currentLocale === ""
                    ? `/categories`
                    : `/${currentLocale}/categories`
                }
              >
                Categories
              </Link>
            </div>
          </div>

          {locales ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <Link to={getSubPath()} className="navbar-link">
                Languages
              </Link>
              <div className="navbar-dropdown">
                {locales.map(item => (
                  <p
                    className="navbar-item"
                    key={item.name}
                    onClick={() => changeLocale(item.code)}
                  >
                    {item.code}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
