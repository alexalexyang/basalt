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
      <div className="footer-level">
        <article className="footer-column">
          {translations.sourceCode[translationLocale] ? (
            <h3 className="title">
              <a href={siteSettings.sourceCodeLink[defaultLocale.code]}>
                {translations.sourceCode[translationLocale]}
              </a>
            </h3>
          ) : null}
          <p></p>
        </article>
        <article className="footer-column">
          <SocialMedia translationLocale={translationLocale} />
        </article>
        <article className="footer-column">
          <OrgDetails translationLocale={translationLocale} />
        </article>
      </div>
    </footer>
  )
}

export default Footer
