import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Index } from "elasticlunr"

function LocaleSwitcher({ locales }) {
  const {
    siteSearchIndex: { index },
  } = useStaticQuery(graphql`
    query {
      siteSearchIndex {
        index
      }
    }
  `)

  const changeLocale = locale => {
    let pathname = window.location.pathname

    let path =
      pathname === "/" || /^\/\w\w$/.test(pathname) ? "basaltHome" : pathname

    let pages = Index.load(index)
      .search(path)
      .map(data => Index.load(index).documentStore.getDoc(data.ref))

    let pageID = pages[0].basaltID

    pages = Index.load(index)
      .search(pageID)
      .map(data => Index.load(index).documentStore.getDoc(data.ref))

    let slug = ""
    pages.forEach(page => {
      if (page.basaltLocale === locale && page.basaltID === pageID) {
        slug = page.slug
      }
    })

    window.location.replace(`${window.location.origin}${slug}`)
  }

  return (
    <>
      {locales.map(item => (
        <button
          className="navbar-item language-button"
          key={item.name}
          onClick={() => changeLocale(item.code)}
        >
          {item.code}
        </button>
      ))}
    </>
  )
}

export default LocaleSwitcher
