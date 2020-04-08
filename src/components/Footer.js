import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import FooterItem from "./FooterItem"

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
              <FooterItem
                siteSettings={siteSettings}
                item={"siteName"}
                locale={defaultLocale.code}
                htmlTag="h3"
              />
              <ul>
                <FooterItem
                  siteSettings={siteSettings}
                  item={"facebookLink"}
                  locale={defaultLocale.code}
                  htmlTag="li"
                />
                <FooterItem
                  siteSettings={siteSettings}
                  item={"twitterLink"}
                  locale={defaultLocale.code}
                  htmlTag="li"
                />
                <FooterItem
                  siteSettings={siteSettings}
                  item={"instagramLink"}
                  locale={defaultLocale.code}
                  htmlTag="li"
                />
              </ul>
            </div>
          </article>
          <article className="level-item">
            <div>
              <FooterItem
                siteSettings={siteSettings}
                item={"siteName"}
                locale={defaultLocale.code}
                htmlTag="h3"
              />
              <p>
                <ul>
                  <FooterItem
                    siteSettings={siteSettings}
                    item={"email"}
                    locale={defaultLocale.code}
                    htmlTag="li"
                  />
                  <FooterItem
                    siteSettings={siteSettings}
                    item={"phoneNumber"}
                    locale={defaultLocale.code}
                    htmlTag="li"
                  />
                  <FooterItem
                    siteSettings={siteSettings}
                    item={"address"}
                    locale={defaultLocale.code}
                    htmlTag="li"
                  />
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
