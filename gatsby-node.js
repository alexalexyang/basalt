const path = require("path")
const contentful = require("contentful")
const { GraphQLString, GraphQLJSON } = require("gatsby/graphql")

const ContentfulClient = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
})

let defaultLocale = {}
let locales = []

ContentfulClient.getLocales().then(data => {
  locales = data.items
  data.items.forEach(locale => {
    if (locale.default) {
      defaultLocale = locale
    }
  })
})

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  locales.forEach(locale => {
    return graphql(`
      {
        pages: allContentfulPage (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            id
            slug
            title
            createdAt
            node_locale
            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }

        blogposts: allContentfulBlogPost (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            id
            slug
            node_locale
            createdAt(formatString: "D MMM YYYY, HH:MM")
            title
            author
            body {
              childMarkdownRemark {
                html
              }
            }
            categories {
              title
            }
            tags
          }
        }

        categories: allContentfulCategory (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            id
            node_locale
            slug
            title
            description {
              childMarkdownRemark {
                html
              }
            }
            
            featuredImage {
              contentful_id
              fluid(maxHeight: 300) {
                srcSet
                src
                base64
                aspectRatio
                srcSetWebp
                srcWebp
              }
            }

            blog_post {
              title
              slug
              node_locale
              contentful_id
              createdAt(formatString: "D MMM YYYY, HH:MM")
            }
          }
        }
      }
    `).then(res => {
      if (res.errors) {
        return Promise.reject(res.errors)
      }

      // PAGE
      const pages = res.data.pages.nodes
      pages.forEach(page => {
        let route = ""
        if (page.node_locale == defaultLocale.code) {
          if (page.slug == "/") {
            route = ""
          }
          route = page.slug
        } else {
          route = `/${page.node_locale}${page.slug}`
        }

        createPage({
          path: route,
          component: path.resolve("src/templates/Page.js"),
          context: {
            page,
          },
        })
      })

      // BLOGPOST
      const blogposts = res.data.blogposts.nodes
      blogposts.forEach(post => {
        // const title = post.title.toLowerCase().replace(/ /g, "-")
        // const slug =
        //   post.node_locale === defaultLocale.code
        //     ? `/blog${post.slug}`
        //     : `/${post.node_locale}/blog${post.slug}`
        createPage({
          path: post.slug,
          component: path.resolve("src/templates/BlogPost.js"),
          context: {
            post,
          },
        })
      })

      // BLOG
      createPage({
        path:
          locale.code === defaultLocale.code ? `/blog` : `/${locale.code}/blog`,
        component: path.resolve("src/templates/Blog.js"),
        context: {
          blogposts,
        },
      })

      // CATEGORY
      const categories = res.data.categories.nodes
      categories.forEach(category => {
        createPage({
          path: category.slug,
          component: path.resolve("src/templates/Category.js"),
          context: {
            category,
          },
        })
      })

      // CATEGORIES
      createPage({
        path:
          locale.code === defaultLocale.code
            ? `/categories`
            : `/${locale.code}/categories`,
        component: path.resolve("src/templates/Categories.js"),
        context: {
          categories,
        },
      })
      // Create page for tags.
    })
  })
}

// Move slug logic here
// First, look for slug (by language)
// If slug does not exist, use title

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === `ContentfulBlogPost`) {
    return {
      slug: {
        type: GraphQLString,
        args: {},
        resolve: (source, fieldArgs) => {
          // const slug = `${source.title.toLowerCase().replace(/ /g, "-")}`
          const slug =
            source.node_locale === defaultLocale.code
              ? `/blog${source.slug}`
              : `/${source.node_locale}/blog${source.slug}`
          return slug
        },
      },
    }
  }

  if (type.name === `Site`) {
    return {
      defaultLocale: {
        type: GraphQLJSON,
        args: {},
        resolve: (source, fieldArgs) => {
          return defaultLocale
        },
      },
      locales: {
        type: GraphQLJSON,
        args: {},
        resolve: (source, fieldArgs) => {
          return locales
        },
      },
    }
  }
  return {}
}
