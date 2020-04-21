const path = require("path")
const contentful = require("contentful")
const { GraphQLString, GraphQLJSON } = require("gatsby/graphql")
const http = require("http")
const fs = require("fs")

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
let transCategory = ""
ContentfulClient.getEntries({
  content_type: "translations",
  locale: "*",
})
  .then(data => {
    translations = data.items[0].fields
    transCategory = translations.category[defaultLocale.code]
  })
  .catch(console.error)

let siteSettings = {}
ContentfulClient.getEntries({
  content_type: "siteSettings",
  locale: "*",
})
  .then(data => {
    items = data.items[0].fields
    siteSettings = items
    return items.logo[defaultLocale.code].sys.id
  })
  .then(logoID => {
    ContentfulClient.getAsset(logoID)
      .then(asset => {
        const file = fs.createWriteStream("src/images/logo.svg")
        http.get(`http:${asset.fields.file.url}`, response =>
          response.pipe(file)
        )
      })
      .catch(console.error)
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
            contentful_id
            fields {
              slug
            }
            title
            createdAt
            node_locale

            featuredImage {
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
            contentful_id
            fields {
              slug
            }
            node_locale
            createdAt(formatString: "D MMM YYYY, HH:MM")
            title
            author
            excerpt

            featuredImage {
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
              contentful_id
              title
            }
            tags
          }
        }

        categories: allContentfulCategory (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            contentful_id
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
        createPage({
          path: page.fields.slug,
          component: path.resolve("src/templates/Page.js"),
          context: {
            page,
            locale: locale.code,
            defaultLocale: defaultLocale.code,
            translations,
          },
        })
      })

      // BLOGPOST
      let blogposts = res.data.blogposts.nodes
      blogposts.forEach(post => {
        createPage({
          path: post.fields.slug,
          component: path.resolve("src/templates/BlogPost.js"),
          context: {
            locale: locale.code,
            post,
            translations,
          },
        })
      })

      // BLOG
      let bloglist = []
      const postsPerPage = 1
      while (blogposts.length) {
        let slice = blogposts.splice(0, postsPerPage)
        bloglist.push(slice)
      }

      bloglist.forEach((postSlice, i) => {
        const blog = translations.blog[locale.code].toLowerCase()
        const blogSlug =
          locale.code === defaultLocale.code
            ? `/${blog}`
            : `/${locale.code}/${blog}`
        createPage({
          path: i === 0 ? blogSlug : `${blogSlug}/${i + 1}`,
          component: path.resolve("src/templates/Blog.js"),
          context: {
            basaltID: `blog-${i + 1}`,
            defaultLocale: defaultLocale.code,
            locale: locale.code,
            translations,
            numPages: bloglist.length,
            blogposts: postSlice,
            currentPage: i + 1,
            translations,
          },
        })
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

      let categoriesList = []
      const categoriesPerPage = 1
      while (categories.length) {
        let slice = categories.splice(0, categoriesPerPage)
        categoriesList.push(slice)
      }

      categoriesList.forEach((categorySlice, i) => {
        const categories = translations.categories[locale.code].toLowerCase()
        const categoriesSlug =
          locale.code === defaultLocale.code
            ? `/${categories}`
            : `/${locale.code}/${categories}`
        createPage({
          path: i === 0 ? categoriesSlug : `${categoriesSlug}/${i + 1}`,
          component: path.resolve("src/templates/Categories.js"),
          context: {
            basaltID: `categories-${i + 1}`,
            defaultLocale: defaultLocale.code,
            locale: locale.code,
            translations,
            numPages: categoriesList.length,
            categories: categorySlice,
            currentPage: i + 1,
            translations,
          },
        })
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  const addBasaltField = (name, value) => {
    createNodeField({
      node,
      name,
      value,
    })
  }

  if (node.internal.type.includes(`SitePage`)) {
    let basaltID =
      node.context && node.context.basaltID ? node.context.basaltID : null
    addBasaltField(`basaltID`, basaltID)
    node.context &&
      node.context.locale &&
      addBasaltField(`basaltLocale`, node.context.locale)
  }

  if (node.internal.type === `ContentfulPage`) {
    let slug = ""

    if (node.slug === "/") {
      slug = node.node_locale === defaultLocale.code ? "" : node.node_locale
    } else {
      slug =
        node.node_locale === defaultLocale.code
          ? node.slug
          : `${node.node_locale}/${node.slug}`
    }

    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}`,
    })

    let basaltID = node.slug === "/" ? "basaltHome" : node.contentful_id

    addBasaltField(`basaltID`, basaltID)
    addBasaltField(`basaltLocale`, node.node_locale)
  }

  if (node.internal.type === `ContentfulBlogPost`) {
    const blog = translations.blog[node.node_locale]
    const slug =
      node.node_locale === defaultLocale.code
        ? `/${blog}/${node.slug}`
        : `/${node.node_locale}/${blog}/${node.slug}`
    createNodeField({
      node,
      name: `slug`,
      value: slug.toLowerCase(),
    })

    addBasaltField(`basaltID`, node.contentful_id)
    addBasaltField(`basaltLocale`, node.node_locale)
  }

  if (node.internal.type === `ContentfulCategory`) {
    const slug =
      node.node_locale === defaultLocale.code
        ? `/${transCategory}/${node.slug}`
        : `/${node.node_locale}/${transCategory}/${node.slug}`
    createNodeField({
      node,
      name: `slug`,
      value: slug.toLowerCase(),
    })

    addBasaltField(`basaltID`, node.contentful_id)
    addBasaltField(`basaltLocale`, node.node_locale)
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
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
      siteSettings: {
        type: GraphQLJSON,
        args: {},
        resolve: (source, fieldArgs) => {
          return siteSettings
        },
      },
    }
  }
  return {}
}
