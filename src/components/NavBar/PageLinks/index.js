import React from "react"
import { Link } from "gatsby"

function Index({ currentLocale, allContentfulPage, defaultLocale }) {
  const pages = allContentfulPage.nodes

  const pageLinks = () => {
    let pageArray = []
    if (currentLocale === "") {
      pages.map(page => {
        if (page.node_locale === defaultLocale.code) {
          pageArray.push(page)
        }
      })
    } else {
      pages.map(page => {
        if (page.node_locale === currentLocale) {
          pageArray.push(page)
        }
      })
    }

    return pageArray.map(page => (
      <Link to={`/${page.fields.slug}`} className="navbar-item" key={page.id}>
        {page.title}
      </Link>
    ))
  }
  return <>{pageLinks()}</>
}

export default Index
