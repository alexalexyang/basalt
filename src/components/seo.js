/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, meta, title, locale, socialMediaImage }) {
  const {
    site: { siteSettings, defaultLocale },
  } = useStaticQuery(
    graphql`
      query {
        site {
          defaultLocale
          siteSettings
        }
      }
    `
  )

  let defaultImage = ""
  if (
    Object.keys(siteSettings.defaultImage[locale].fields.file).includes(locale)
  ) {
    defaultImage = siteSettings.defaultImage[locale].fields.file[locale].url
  } else {
    defaultImage =
      siteSettings.defaultImage[defaultLocale.code].fields.file[
        defaultLocale.code
      ].url
  }

  const metaDescription = description || siteSettings.siteDescription[locale]
  const image = socialMediaImage
    ? `https:${socialMediaImage}`
    : `https:${defaultImage}`

  return (
    <Helmet
      htmlAttributes={{
        locale,
      }}
      title={title}
      titleTemplate={`%s | ${siteSettings.siteName[defaultLocale.code]}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteSettings.author[defaultLocale.code],
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: image,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
