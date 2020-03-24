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

let translations = {}
let transBlog = ""
let transCategories = ""
let transCategory = ""
ContentfulClient.getEntries({
  content_type: "translations",
  locale: "*",
})
  .then(data => {
    translations = data.items[0].fields
    transBlog = translations.blog[defaultLocale.code]
    transCategories = translations.categories[defaultLocale.code]
    transCategory = translations.category[defaultLocale.code]
  })
  .catch(console.error)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  locales.forEach(locale => {
    return graphql(`
      {

        translations: allContentfulTranslations {
          nodes {
            languages
            writtenByAuthorOnDate
            blog
            categories
            category
            tags
            noSearchResults
          }
        }

        pages: allContentfulPage (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            id
            slug
            title
            createdAt
            node_locale

            featuredImage {
              contentful_id
              fluid {
                sizes
                srcSet
                src
                base64
                aspectRatio
                srcSetWebp
                srcWebp
              }
            }

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
            fields {
              slug
            }
            node_locale
            createdAt(formatString: "D MMM YYYY, HH:MM")
            title
            author

            featuredImage {
              contentful_id
              fluid {
                sizes
                srcSet
                src
                base64
                aspectRatio
                srcSetWebp
                srcWebp
              }
            }

            body {
              childMarkdownRemark {
                html
              }
            }
            categories {
              id
              title
            }
            tags
          }
        }

        categories: allContentfulCategory (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            id
            node_locale
            fields {
              slug
            }
            title
            description {
              childMarkdownRemark {
                html
              }
            }
            
            featuredImage {
              contentful_id
              fluid {
                sizes
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
              fields {
                slug
              }
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
        createPage({
          path: post.fields.slug,
          component: path.resolve("src/templates/BlogPost.js"),
          context: {
            locale: locale.code,
            post,
          },
        })
      })

      // BLOG
      createPage({
        path:
          locale.code === defaultLocale.code
            ? `/${transBlog}`
            : `/${locale.code}/${transBlog}`,
        component: path.resolve("src/templates/Blog.js"),
        context: {
          locale: locale.code,
          blogposts,
          translations,
        },
      })

      // CATEGORY
      const categories = res.data.categories.nodes
      categories.forEach(category => {
        createPage({
          path: category.fields.slug,
          component: path.resolve("src/templates/Category.js"),
          context: {
            locale: locale.code,
            category,
            translations,
          },
        })
      })

      // CATEGORIES
      createPage({
        path:
          locale.code === defaultLocale.code
            ? `/${transCategories}`
            : `/${locale.code}/${transCategories}`,
        component: path.resolve("src/templates/Categories.js"),
        context: {
          locale: locale.code,
          categories,
          translations,
        },
      })
      // Create page for tags.
    })
  })
}

// Move slug logic here
// First, look for slug (by language)
// If slug does not exist, use title

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `ContentfulBlogPost`) {
    const slug =
      node.node_locale === defaultLocale.code
        ? `/${transBlog}${node.slug}`
        : `/${node.node_locale}/${transBlog}${node.slug}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.internal.type === `ContentfulCategory`) {
    const slug =
      node.node_locale === defaultLocale.code
        ? `/${transCategory}${node.slug}`
        : `/${node.node_locale}/${transCategory}${node.slug}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  // if (type.name === `ContentfulBlogPost`) {
  //   return {
  //     slug: {
  //       type: GraphQLString,
  //       args: {},
  //       resolve: (source, fieldArgs) => {
  //         const slug =
  //           source.node_locale === defaultLocale.code
  //             ? `/blog${source.slug}`
  //             : `/${source.node_locale}/blog${source.slug}`
  //         return slug
  //       },
  //     },
  //   }
  // }

  // if (type.name === `ContentfulCategory`) {
  //   return {
  //     slug: {
  //       type: GraphQLString,
  //       args: {},
  //       resolve: (source, fieldArgs) => {
  //         const slug =
  //           source.node_locale === defaultLocale.code
  //             ? `/category${source.slug}`
  //             : `/${source.node_locale}/category${source.slug}`
  //         return slug
  //       },
  //     },
  //   }
  // }

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
      translations: {
        type: GraphQLJSON,
        args: {},
        resolve: (source, fieldArgs) => {
          return translations
        },
      },
    }
  }
  return {}
}
