require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Firstahjalp`,
    description: `A multilingual first aid site`,
    author: `Alex`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
              withWebP: true,
              backgroundColor: "transparent",
              showCaptions: true,
            },
          },
        ],
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
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`author`, `title`, `body`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          ContentfulBlogPost: {
            id: node => node.id,
            node_locale: node => node.node_locale,
            slug: node => node.fields.slug,
            createdAt: node => node.createdAt,
            author: node => node.author,
            title: node => node.title,
            body: (node, getNode) => getNode(node.body___NODE).body,
            featuredImage: (node, getNode) =>
              getNode(node.featuredImage___NODE),
          },
          ContentfulPage: {
            id: node => node.id,
            node_locale: node => node.node_locale,
            slug: node => node.slug,
            createdAt: node => node.createdAt,
            author: node => node.author,
            title: node => node.title,
            body: (node, getNode) => getNode(node.body___NODE).body,
            featuredImage: (node, getNode) =>
              getNode(node.featuredImage___NODE),
          },
        },
        // Optional filter to limit indexed nodes
        // filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
