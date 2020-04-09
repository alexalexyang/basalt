import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import SocialMedia from "./SocialMedia"
import OrgDetails from "./OrgDetails"
import { getCurrentLocale } from "../utils"

function Footer() {
  const {
    site: { defaultLocale },
  } = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        siteSettings
      }
    }
  `)

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
            <SocialMedia />
          </article>
          <article className="level-item">
            <OrgDetails />
          </article>
        </div>
      </div>
    </footer>
  )
}

export default Footer
