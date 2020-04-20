import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SocialMedia from "./SocialMedia"
import OrgDetails from "./OrgDetails"

function Footer({ translationLocale }) {
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

  return (
    <footer className="section">
      <div className="level">
        <div className="level-left">
          <article className="level-item">
            <div className="footer-item">
              {translations.sourceCode[translationLocale] ? (
                <h3 className="title">
                  {translations.sourceCode[translationLocale]}
                </h3>
              ) : null}
              <p>
                <a href={siteSettings.sourceCodeLink[defaultLocale.code]}>
                  {translations.sourceCode[translationLocale]}
                </a>
              </p>
            </div>
          </article>
        </div>
        <div className="level-right">
          <SocialMedia translationLocale={translationLocale} />
          <OrgDetails translationLocale={translationLocale} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
