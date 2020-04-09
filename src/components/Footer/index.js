import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SocialMediaSection from "./SocialMediaSection"

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

  const getCurrentLocale = () => {
    const pathname =
      typeof window !== "undefined" &&
      window.location.pathname.match(/^\/\w\w\/|^\/\w\w$/)
    return pathname ? pathname[0].match(/\w\w/)[0] : ""
  }

  const currentLocale =
    getCurrentLocale() === "" ? defaultLocale.code : getCurrentLocale()

  console.log("CURRENT LOCALE: ", currentLocale)

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
            <SocialMediaSection />
          </article>
          <article className="level-item">
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
                  <li className="">
                    {siteSettings.address[defaultLocale.code]}
                  </li>
                ) : null}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </footer>
  )
}

export default Footer
