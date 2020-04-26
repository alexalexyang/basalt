import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { getCurrentLocale, getTranslationLocale } from "../components/utils"

const NotFoundPage = () => {
  const {
    site: { defaultLocale, translations },
  } = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        siteSettings
        translations
      }
    }
  `)

  const currentLocale = getCurrentLocale()
  const translationLocale = getTranslationLocale(
    currentLocale,
    defaultLocale.code
  )

  return (
    <Layout>
      <SEO title={`404: ${translations.pageNotFound[translationLocale]}`} />
      <h1 className="title">{translations.pageNotFound[translationLocale]}</h1>
      <p className="content">{translations.text404[translationLocale]}</p>
    </Layout>
  )
}

export default NotFoundPage
