import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Footer() {
  const {
    site: { defaultLocale, siteSettings },
  } = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        siteSettings
      }
    }
  `)

  console.log(siteSettings)

  return (
    <footer className="section">
      <div className="container">
        <div className="level-left">
          <div className="level-item">
            <a href="https://github.com/alexalexyang/basalt">Source code</a>
          </div>
        </div>
        <div className="level-right">
          <article className="level-item">
            <div>
              <h3 className="heading">
                {siteSettings.siteName[defaultLocale.code]}
              </h3>
              <ul>
                <li>{siteSettings.facebookLink[defaultLocale.code]}</li>
                <li>{siteSettings.twitterLink[defaultLocale.code]}</li>
                <li>{siteSettings.instagramLink[defaultLocale.code]}</li>
              </ul>
            </div>
          </article>
          <article className="level-item">
            <div>
              <h3 className="heading">
                {siteSettings.siteName[defaultLocale.code]}
              </h3>
              <p>
                <ul>
                  <li>{siteSettings.email[defaultLocale.code]}</li>
                  <li>{siteSettings.phoneNumber[defaultLocale.code]}</li>
                  <li>{siteSettings.address[defaultLocale.code]}</li>
                </ul>
              </p>
            </div>
          </article>
        </div>
      </div>
    </footer>
  )
}

export default Footer
