import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import facebook from "../../images/socialMedia/facebook.svg"
import twitter from "../../images/socialMedia/twitter.svg"
import instagram from "../../images/socialMedia/instagram.svg"

function SocialMedia() {
  const {
    site: { defaultLocale, siteSettings },
  } = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        siteSettings
        translations
      }
    }
  `)
  return (
    <>
      {siteSettings.facebookLink ||
      siteSettings.twitterLink ||
      siteSettings.instagramLink ? (
        <div>
          {siteSettings.siteName[defaultLocale.code] ? (
            <h3 className="title">
              {siteSettings.siteName[defaultLocale.code]}
            </h3>
          ) : null}
          <ul>
            {siteSettings.facebookLink[defaultLocale.code] ? (
              <li className="">
                <a href={siteSettings.facebookLink[defaultLocale.code]}>
                  <img
                    src={facebook}
                    width="13"
                    height="13"
                    alt="Bulma logo."
                  />{" "}
                  Facebook
                </a>
              </li>
            ) : null}
            {siteSettings.twitterLink[defaultLocale.code] ? (
              <li className="">
                <a href={siteSettings.twitterLink[defaultLocale.code]}>
                  <img src={twitter} width="13" height="13" alt="Bulma logo." />{" "}
                  Twitter
                </a>
              </li>
            ) : null}
            {siteSettings.instagramLink[defaultLocale.code] ? (
              <li className="">
                <a href={siteSettings.instagramLink[defaultLocale.code]}>
                  <img
                    src={instagram}
                    width="13"
                    height="13"
                    alt="Bulma logo."
                  />{" "}
                  Instagram
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </>
  )
}

export default SocialMedia
