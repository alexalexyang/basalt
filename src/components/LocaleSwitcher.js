import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
    console.log("PATH: ", path)

    let pages = Index.load(index)
      .search(path)
      .map(data => Index.load(index).documentStore.getDoc(data.ref))

    if (pages.length === 0) {
      return window.location.replace(`${window.location.origin}${pathname}`)
    }

    let pageID = pages[0].basaltID
    console.log("PAGE ID: ", pageID)

    pages = Index.load(index)
      .search(pageID)
      .map(data => Index.load(index).documentStore.getDoc(data.ref))

    let slug = ""
    console.log("PAGES: ", pages)
    pages.forEach(page => {
      if (page.basaltLocale === locale && page.basaltID === pageID) {
        slug = page.slug
        console.log("SLUG: ", slug)
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
