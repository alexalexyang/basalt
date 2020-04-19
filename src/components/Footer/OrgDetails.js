import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function OrgDetails() {
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

  const display =
    siteSettings.email || siteSettings.phoneNumber || siteSettings.address
      ? true
      : false

  if (display) {
    return (
      <article className="level-item">
        <div className="footer-item">
          {siteSettings.siteName[defaultLocale.code] ? (
            <h3 className="title">
              {siteSettings.siteName[defaultLocale.code]}
            </h3>
          ) : null}
          <ul>
            {siteSettings.email[defaultLocale.code] ? (
              <li className="">
                <a href={`mailto:${siteSettings.email[defaultLocale.code]}`}>
                  {siteSettings.email[defaultLocale.code]}
                </a>
              </li>
            ) : null}
            {siteSettings.phoneNumber[defaultLocale.code] ? (
              <li className="">
                {siteSettings.phoneNumber[defaultLocale.code]}
              </li>
            ) : null}
            {siteSettings.address[defaultLocale.code] ? (
              <li className="">{siteSettings.address[defaultLocale.code]}</li>
            ) : null}
          </ul>
        </div>
      </article>
    )
  }

  return null
}

export default OrgDetails
