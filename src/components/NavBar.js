import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import contentful from "contentful"

function NavBar() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPage {
        nodes {
          slug
          title
          node_locale
        }
      }
    }
  `)

  const { allContentfulPage } = data

  let defaultLocale = {}
  let locales = []

  const ContentfulClient = contentful.createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
  })

  ContentfulClient.getLocales()
    .then(data =>
      data.items.forEach(item => {
        if (item.default) {
          Object.assign(defaultLocale, item)
          locales.push(item)
        } else {
          locales.push(item)
        }
      })
    )
    .catch(err => console.log(err))

  const changeLocale = code => {
    code === defaultLocale.code
      ? window.location.replace(`${window.location.origin}${subPath}`)
      : window.location.replace(`${window.location.origin}/${code}${subPath}`)
  }

  const getSubPath = () => {
    let pathname = window.location.pathname
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
    console.log(window.location.pathname)
    const pathname = window.location.pathname.match(/^\/\w\w\/|^\/\w\w$/)
    return pathname ? pathname[0].match(/\w\w/)[0] : ""
  }
  const currentLocale = getCurrentLocale()
  console.log("CURRENT LOCALE: ", currentLocale)

  const pages = () => {
    return currentLocale === ""
      ? allContentfulPage.nodes.map(node => {
          return node.node_locale === defaultLocale.code ? (
            <>
              <Link to={`${node.slug}`} className="navbar-item" key={node.slug}>
                {node.title}
              </Link>
            </>
          ) : null
        })
      : allContentfulPage.nodes.map(node => {
          // return window.location.pathname.includes(node.node_locale) ? (
          return node.node_locale === currentLocale ? (
            <>
              <Link
                to={`/${node.node_locale}${node.slug}`}
                className="navbar-item"
                key={node.slug}
              >
                {node.title}
              </Link>
            </>
          ) : null
        })
  }

  const subPath = getSubPath()

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
          href="#"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          {pages()}

          <Link
            to={currentLocale === "" ? `/blog` : `/${currentLocale}/blog`}
            className="navbar-item"
          >
            Blog
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#" className="navbar-link">
              Languages
            </a>

            <div className="navbar-dropdown">
              {locales.map(item => (
                <p
                  // to={
                  //   item.code === defaultLocale.code
                  //     ? `/${subPath}`
                  //     : `/${item.code}${subPath}`
                  // }
                  className="navbar-item"
                  key={item.name}
                  onClick={() => changeLocale(item.code)}
                >
                  {item.code}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
