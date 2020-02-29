require("dotenv").config()
const contentful = require("contentful")

const ContentfulClient = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
})

let defaultLocale = () => {
  let dLocale = {}
  ContentfulClient.getLocales()
    .then(data =>
      data.items.forEach(item => {
        if (item.default) {
          item["path"] = ""
          Object.assign(dLocale, item)
          locales.push(item)
        } else {
        }
      })
    )
    .catch(err => console.log(err))
  return dLocale
}
let locales = []

ContentfulClient.getLocales()
  .then(data =>
    data.items.forEach(item => {
      if (item.default) {
        item["path"] = ""
        Object.assign(defaultLocale, item)
        locales.push(item)
      } else {
        item["path"] = item.code
        locales.push(item)
      }
    })
  )
  .catch(err => console.log(err))

module.exports = {
  siteMetadata: {
    title: `Firstahjalp`,
    description: `A multilingual first aid site`,
    author: `Alex`,
    defaultLocale: defaultLocale(),
    locales,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
