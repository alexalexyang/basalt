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

  return (
    <>
      {display ? (
        <div>
          {siteSettings.siteName[defaultLocale.code] ? (
            <h3 className="title">
              {siteSettings.siteName[defaultLocale.code]}
            </h3>
          ) : null}
          <ul>
            {siteSettings.email[defaultLocale.code] ? (
              <li className="">{siteSettings.email[defaultLocale.code]}</li>
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
      ) : null}
    </>
  )
}

export default OrgDetails
