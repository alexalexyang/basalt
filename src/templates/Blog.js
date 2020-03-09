import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function Blog({ pageContext: { locale, blogposts } }) {
  const {
    site: { translations },
  } = useStaticQuery(graphql`
    query {
      site {
        translations
      }
    }
  `)

  return (
    <Layout>
      <SEO title={translations.blog[locale]} />
      {blogposts.map(post => (
        <div className="section" key={post.id}>
          <div className="container">
            <div className="container">
              <Img fluid={post.featuredImage.fluid} />
            </div>
            <div className="container">
              <article className="content">
                <Link to={post.slug} className="title">
                  {post.title}
                </Link>
                <p>
                  {translations.writtenByAuthorOnDate[locale]
                    .replace("%AUTHOR%", post.author)
                    .replace("%DATE%", post.createdAt)}
                  .
                </p>
                <p>EXCERPT HERE.</p>
              </article>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default Blog
