const path = require("path")
const contentful = require("contentful")

const ContentfulClient = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
})

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  let defaultLocale = ""
  const locales = await ContentfulClient.getLocales()

  locales.items.forEach(locale => {
    if (locale.default) {
      defaultLocale = locale.code
    }
  })

  locales.items.forEach(locale => {
    return graphql(`
      {
        pages: allContentfulPage(filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
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

        blogposts: allContentfulBlogPost(filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
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
              category
            }
            tags
          }
        }
      }
    `).then(res => {
      if (res.errors) {
        return Promise.reject(res.errors)
      }

      // Create each page.

      const pages = res.data.pages.nodes

      pages.forEach(page => {
        let route = ""
        if (page.node_locale == defaultLocale) {
          if (page.slug == "/") {
            route = ""
          }
          route = page.slug
        } else {
          route = `/${page.node_locale}${page.slug}`
        }

        createPage({
          path: "whatever",
          component: path.resolve("src/templates/Page.js"),
          context: {
            page,
          },
        })
      })

      // Create page for each blog post.
      const blogposts = res.data.blogposts.nodes

      blogposts.forEach(post => {
        createPage({
          path: `/${post.node_locale}/blog/${post.title
            .toLowerCase()
            .replace(/ /g, "-")}`,
          component: path.resolve("src/templates/BlogPost.js"),
          context: {
            post,
          },
        })
      })

      // Create page for list of blog posts.
      createPage({
        path: locale.code === defaultLocale ? `/blog` : `/${locale.code}/blog`,
        component: path.resolve("src/templates/Blog.js"),
        context: {
          blogposts,
        },
      })
    })
  })
}
