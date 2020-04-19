import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SocialMedia from "./SocialMedia"
import OrgDetails from "./OrgDetails"
import { getCurrentLocale } from "../utils"

function Footer() {
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

  const currentLocale =
    getCurrentLocale() === "" ? defaultLocale.code : getCurrentLocale()

  return (
    <footer className="section">
      <div className="level">
        <div className="level-left">
          <article className="level-item">
            <div className="footer-item">
              {siteSettings.siteName[defaultLocale.code] ? (
                <h3 className="title">
                  {siteSettings.siteName[defaultLocale.code]}
                </h3>
              ) : null}
              <p>
                <a href="https://github.com/alexalexyang/basalt">Source code</a>
              </p>
            </div>
          </article>
        </div>
        <div className="level-right">
          <SocialMedia />
          <OrgDetails />
        </div>
      </div>
    </footer>
  )
}

export default Footer
