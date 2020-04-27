import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import FooterItem from "./FooterItem"
import facebook from "../../images/socialMedia/facebook.svg"
import twitter from "../../images/socialMedia/twitter.svg"
import instagram from "../../images/socialMedia/instagram.svg"

function SocialMedia({ translationLocale }) {
  const {
    site: { defaultLocale, siteSettings, translations },
  } = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        siteSettings
        translations
      }
    }
  `)

  const display =
    siteSettings.facebookLink ||
    siteSettings.twitterLink ||
    siteSettings.instagramLink
      ? true
      : false

  if (display) {
    return (
      <>
        {translations.socialMedia[translationLocale] ? (
          <h3 className="title">
            {translations.socialMedia[translationLocale]}
          </h3>
        ) : null}
        <ul>
          <FooterItem
            siteSettings={siteSettings}
            itemName="facebookLink"
            itemText="Facebook"
            linkAvailable={true}
            defaultLocale={defaultLocale}
            svg={facebook}
          />
          <FooterItem
            siteSettings={siteSettings}
            itemName="twitterLink"
            itemText="Twitter"
            linkAvailable={true}
            defaultLocale={defaultLocale}
            svg={twitter}
          />
          <FooterItem
            siteSettings={siteSettings}
            itemName="instagramLink"
            itemText="Instagram"
            linkAvailable={true}
            defaultLocale={defaultLocale}
            svg={instagram}
          />
        </ul>
      </>
    )
  }

  return null
}

export default SocialMedia
