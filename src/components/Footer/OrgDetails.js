import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import FooterItem from "./FooterItem"
import address from "../../images/contact/address.svg"
import email from "../../images/contact/email.svg"
import phone from "../../images/contact/phone.svg"

function OrgDetails({ translationLocale }) {
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
    siteSettings.email || siteSettings.phoneNumber || siteSettings.address
      ? true
      : false

  if (display) {
    return (
      <>
        {translations.contactDetails[translationLocale] ? (
          <h3 className="title">
            {translations.contactDetails[translationLocale]}
          </h3>
        ) : null}
        <ul>
          <FooterItem
            siteSettings={siteSettings}
            itemName="email"
            linkAvailable={true}
            itemLink={`mailto:${siteSettings.email[defaultLocale.code]}`}
            itemText={
              siteSettings.email && siteSettings.email[defaultLocale.code]
            }
            defaultLocale={defaultLocale}
            svg={email}
          />

          <FooterItem
            siteSettings={siteSettings}
            itemName="phoneNumber"
            itemText={
              siteSettings.phoneNumber &&
              siteSettings.phoneNumber[defaultLocale.code]
            }
            defaultLocale={defaultLocale}
            svg={phone}
          />
          <FooterItem
            siteSettings={siteSettings}
            itemName="address"
            itemText={
              siteSettings.address && siteSettings.address[defaultLocale.code]
            }
            defaultLocale={defaultLocale}
            svg={address}
          />
        </ul>
      </>
    )
  }

  return null
}

export default OrgDetails
