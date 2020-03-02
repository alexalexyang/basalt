import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
const contentful = require("contentful")

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

  const [defaultLocale, setDefaultLocale] = useState()
  const [locales, setLocales] = useState()

  const ContentfulClient = contentful.createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
  })

  ContentfulClient.getLocales()
    .then(data => {
      let locales = []
      data.items.forEach(item => {
        if (item.default) {
          locales.push(item)
          setDefaultLocale(item)
        } else {
          locales.push(item)
        }
      })
      return locales
    })
    .then(locales => setLocales(locales))
    .catch(err => console.log(err))

  const changeLocale = code => {
    typeof window !== "undefined" && code === defaultLocale.code
      ? window.location.replace(`${window.location.origin}${subPath}`)
      : window.location.replace(`${window.location.origin}/${code}${subPath}`)
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
            <>
              <Link to={`${node.slug}`} className="navbar-item" key={node.slug}>
                {node.title}
              </Link>
            </>
          ) : null
        })
      : allContentfulPage.nodes.map(node => {
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

  const subPath = typeof window !== "undefined" && getSubPath()
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
        {/* 
        <a
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
        </a> */}
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          {defaultLocale && pages()}

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
              {locales &&
                locales.map(item => (
                  <p
                    className="navbar-item"
                    key={item.name}
                    onClick={() => changeLocale(item.code)}
                  >
                    {item.code}
                    {console.log("ITEM: ", item)}
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
